"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  type GalleryItemInput,
} from "@/lib/db";
import {
  verifyPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/admin-auth";

async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  if (!(await verifyPassword(password))) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin/gallery");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

function extractYouTubeId(input: string): string {
  const s = input.trim();
  if (YT_ID.test(s)) return s;
  try {
    const url = new URL(s);
    if (url.hostname.endsWith("youtu.be")) {
      const id = url.pathname.slice(1).split("/")[0];
      if (YT_ID.test(id)) return id;
    }
    const v = url.searchParams.get("v");
    if (v && YT_ID.test(v)) return v;
    const m = url.pathname.match(/\/(?:embed|shorts|v)\/([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
  } catch {
    // not a URL — fall through
  }
  const m = s.match(/[A-Za-z0-9_-]{11}/);
  return m ? m[0] : s;
}

function normalizeImageUrl(input: string): string {
  const s = input.trim();
  try {
    const url = new URL(s);
    if (url.hostname.endsWith("dropbox.com")) {
      url.searchParams.set("raw", "1");
      url.searchParams.delete("dl");
      return url.toString();
    }
  } catch {
    // not a URL — return as-is
  }
  return s;
}

function generateSlug(): string {
  return `item-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function parseInput(formData: FormData): GalleryItemInput {
  const kind = String(formData.get("kind") ?? "image") as "video" | "image";
  const levelRaw = String(formData.get("level") ?? "");
  const level =
    levelRaw === "zero" || levelRaw === "up" || levelRaw === "pro"
      ? levelRaw
      : null;
  const stage = String(formData.get("stage") ?? "").trim() || null;
  const orientation =
    String(formData.get("orientation") ?? "") === "portrait"
      ? ("portrait" as const)
      : ("landscape" as const);
  const rawSrc = String(formData.get("src") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  return {
    slug: rawSlug || generateSlug(),
    kind,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    creator: String(formData.get("creator") ?? "").trim(),
    src: kind === "video" ? extractYouTubeId(rawSrc) : normalizeImageUrl(rawSrc),
    level,
    stage,
    orientation,
    sort_order: Number(formData.get("sort_order") ?? 100),
  };
}

export async function createGalleryAction(formData: FormData): Promise<void> {
  await requireAuth();
  const input = parseInput(formData);
  if (!input.title || !input.src) {
    redirect("/admin/gallery?error=missing");
  }
  await createGalleryItem(input);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?ok=created");
}

export async function updateGalleryAction(
  id: number,
  formData: FormData,
): Promise<void> {
  await requireAuth();
  const input = parseInput(formData);
  await updateGalleryItem(id, input);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?ok=updated");
}

export async function deleteGalleryAction(id: number): Promise<void> {
  await requireAuth();
  await deleteGalleryItem(id);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?ok=deleted");
}
