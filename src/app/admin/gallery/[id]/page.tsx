import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { getGalleryItem } from "@/lib/db";
import { GalleryForm } from "@/components/admin/gallery-form";
import { updateGalleryAction } from "../../actions";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();
  const item = await getGalleryItem(id);
  if (!item) notFound();

  const action = updateGalleryAction.bind(null, id);

  return (
    <main className="w-full px-4 sm:px-8 lg:px-12 py-12">
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-3.5" />
        Back to Gallery
      </Link>
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
        항목 편집
      </h1>
      <p className="font-mono text-xs text-muted-foreground mb-8">ID #{item.id} · {item.likes} likes</p>
      <GalleryForm action={action} initial={item} submitLabel="저장하기" />
    </main>
  );
}
