import { getCloudflareContext } from "@opennextjs/cloudflare";

export type ClassLevel = "zero" | "up" | "pro";

export type GalleryItem = {
  id: number;
  slug: string;
  kind: "video" | "image";
  title: string;
  description: string;
  creator: string;
  src: string;
  level: ClassLevel | null;
  stage: string | null;
  likes: number;
  sort_order: number;
  created_at: number;
};

export type GalleryItemInput = {
  slug: string;
  kind: "video" | "image";
  title: string;
  description: string;
  creator: string;
  src: string;
  level: ClassLevel | null;
  stage: string | null;
  sort_order: number;
};

export async function getDB(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  return env.DB;
}

export async function listGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDB();
  const { results } = await db
    .prepare(
      "SELECT * FROM gallery_items ORDER BY sort_order ASC, id ASC",
    )
    .all<GalleryItem>();
  return results ?? [];
}

export async function getGalleryItem(id: number): Promise<GalleryItem | null> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT * FROM gallery_items WHERE id = ?")
    .bind(id)
    .first<GalleryItem>();
  return row ?? null;
}

export async function createGalleryItem(input: GalleryItemInput): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      `INSERT INTO gallery_items (slug, kind, title, description, creator, src, level, stage, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      input.slug,
      input.kind,
      input.title,
      input.description,
      input.creator,
      input.src,
      input.level,
      input.stage,
      input.sort_order,
    )
    .run();
}

export async function updateGalleryItem(
  id: number,
  input: GalleryItemInput,
): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      `UPDATE gallery_items
       SET slug = ?, kind = ?, title = ?, description = ?, creator = ?, src = ?, level = ?, stage = ?, sort_order = ?
       WHERE id = ?`,
    )
    .bind(
      input.slug,
      input.kind,
      input.title,
      input.description,
      input.creator,
      input.src,
      input.level,
      input.stage,
      input.sort_order,
      id,
    )
    .run();
}

export async function deleteGalleryItem(id: number): Promise<void> {
  const db = await getDB();
  await db.prepare("DELETE FROM gallery_items WHERE id = ?").bind(id).run();
}

export async function incrementLikes(id: number): Promise<number> {
  const db = await getDB();
  const row = await db
    .prepare(
      "UPDATE gallery_items SET likes = likes + 1 WHERE id = ? RETURNING likes",
    )
    .bind(id)
    .first<{ likes: number }>();
  return row?.likes ?? 0;
}
