import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { incrementLikes, getGalleryItem } from "@/lib/db";

const LIKE_COOKIE = "liked_gallery";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1년

function parseLiked(value: string | undefined): Set<number> {
  if (!value) return new Set();
  return new Set(
    value
      .split(",")
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n)),
  );
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  const jar = await cookies();
  const liked = parseLiked(jar.get(LIKE_COOKIE)?.value);
  if (liked.has(id)) {
    const item = await getGalleryItem(id);
    return NextResponse.json({ likes: item?.likes ?? 0, already: true });
  }

  const item = await getGalleryItem(id);
  if (!item) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const newLikes = await incrementLikes(id);

  liked.add(id);
  jar.set(LIKE_COOKIE, Array.from(liked).join(","), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ likes: newLikes, already: false });
}
