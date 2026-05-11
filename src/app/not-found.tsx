import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-32 sm:py-44 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Error · 404
      </p>
      <h1 className="mt-8 text-[clamp(4rem,12vw,10rem)] font-black tracking-[-0.04em] leading-[0.9]">
        404
      </h1>
      <p className="mt-6 text-2xl sm:text-3xl font-black tracking-tight">
        페이지를 찾지 못했어요.
      </p>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        주소가 잘못됐거나 콘텐츠가 옮겨졌을 수 있습니다.
      </p>
      <div className="mt-10 flex justify-center gap-3">
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <Link href="/">홈으로</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base">
          <Link href="/instructors">강사진 보기</Link>
        </Button>
      </div>
    </div>
  );
}
