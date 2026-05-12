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

function parseInput(formData: FormData): GalleryItemInput {
  const kind = String(formData.get("kind") ?? "image") as "video" | "image";
  const levelRaw = String(formData.get("level") ?? "");
  const level =
    levelRaw === "zero" || levelRaw === "up" || levelRaw === "pro"
      ? levelRaw
      : null;
  const stage = String(formData.get("stage") ?? "").trim() || null;
  return {
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-"),
    kind,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    creator: String(formData.get("creator") ?? "").trim(),
    src: String(formData.get("src") ?? "").trim(),
    level,
    stage,
    sort_order: Number(formData.get("sort_order") ?? 100),
  };
}

export async function createGalleryAction(formData: FormData): Promise<void> {
  await requireAuth();
  const input = parseInput(formData);
  if (!input.slug || !input.title || !input.src) {
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
