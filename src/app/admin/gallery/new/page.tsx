import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { GalleryForm } from "@/components/admin/gallery-form";
import { createGalleryAction } from "../../actions";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewGalleryItemPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <main className="w-full px-4 sm:px-8 lg:px-12 py-12">
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-3.5" />
        Back to Gallery
      </Link>
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">
        새 갤러리 항목
      </h1>
      <GalleryForm action={createGalleryAction} submitLabel="추가하기" />
    </main>
  );
}
