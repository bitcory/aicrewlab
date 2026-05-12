import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/admin-auth";
import { loginAction } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin/gallery");
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        action={loginAction}
        className="w-full max-w-sm space-y-6 border-2 border-border p-8 bg-background"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight">관리자 로그인</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            갤러리 항목을 추가·수정합니다.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Password
          </span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-3 text-base outline-none"
          />
        </label>

        {error && (
          <p className="text-sm text-red-500">비밀번호가 올바르지 않습니다.</p>
        )}

        <Button type="submit" size="lg" className="w-full h-12">
          로그인
        </Button>
      </form>
    </main>
  );
}
