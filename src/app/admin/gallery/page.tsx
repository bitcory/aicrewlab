import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/admin-auth";
import { listGalleryItems } from "@/lib/db";
import { deleteGalleryAction, logoutAction } from "../actions";
import { ArrowUpRight, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const items = await listGalleryItems();
  const { ok, error } = await searchParams;

  return (
    <main className="w-full px-4 sm:px-8 lg:px-12 py-12">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-border pb-6 mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Admin · Gallery
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">
            갤러리 관리
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/gallery/new">
              <Plus className="size-4 mr-1" /> 새 항목
            </Link>
          </Button>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              로그아웃
            </Button>
          </form>
        </div>
      </header>

      {ok && (
        <p className="mb-4 text-sm text-emerald-500">
          {ok === "created" && "추가되었습니다."}
          {ok === "updated" && "저장되었습니다."}
          {ok === "deleted" && "삭제되었습니다."}
        </p>
      )}
      {error === "missing" && (
        <p className="mb-4 text-sm text-red-500">
          slug · title · src는 필수입니다.
        </p>
      )}

      {items.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center">
          아직 항목이 없습니다. 우측 상단 &ldquo;새 항목&rdquo;으로 추가하세요.
        </p>
      ) : (
        <div className="overflow-x-auto border-2 border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b-2 border-border">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider">#</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider">Kind</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider">Creator</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider">Level</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-right">Likes</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-right">Sort</th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        item.kind === "video"
                          ? "inline-block px-2 py-0.5 text-xs font-bold rounded bg-red-500/10 text-red-500 border border-red-500/30"
                          : "inline-block px-2 py-0.5 text-xs font-bold rounded bg-sky-500/10 text-sky-500 border border-sky-500/30"
                      }
                    >
                      {item.kind}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {item.title}
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">{item.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.creator || "—"}</td>
                  <td className="px-4 py-3 uppercase font-mono text-xs">{item.level ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-mono">{item.likes}</td>
                  <td className="px-4 py-3 text-right font-mono">{item.sort_order}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/gallery/${item.id}`}
                      className="inline-flex items-center text-sm font-semibold hover:underline mr-3"
                    >
                      편집 <ArrowUpRight className="size-3.5 ml-0.5" />
                    </Link>
                    <form
                      action={deleteGalleryAction.bind(null, item.id)}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-sm font-semibold text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
