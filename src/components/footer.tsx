import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { SectionLabel } from "@/components/site/section-label";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(to_right,transparent,var(--divider-glow),transparent)]"
      />

      {/* Giant brand mark */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pt-20 pb-12 border-b border-border/40">
        <p className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(4rem,16vw,12rem)] uppercase text-foreground/90">
          AICREW
        </p>
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          AI 시대의 크리에이티브를 가르치는 아카데미. 현장 강사진과 함께 만들고, 만들면서 배웁니다.
        </p>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4 md:col-span-1">
          <Logo />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} AICREW Academy
          </p>
        </div>
        <div>
          <SectionLabel className="mb-4">Explore</SectionLabel>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/instructors" className="text-foreground/70 hover:text-foreground transition-colors">
                Crew
              </Link>
            </li>
            <li>
              <Link href="/courses" className="text-foreground/70 hover:text-foreground transition-colors">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <SectionLabel className="mb-4">Contact</SectionLabel>
          <ul className="space-y-2.5 text-sm">
            <li>
              <span className="text-muted-foreground">문의 · </span>
              <a href="mailto:aitoolbee79@gmail.com" className="text-foreground/70 hover:text-foreground transition-colors">
                aitoolbee79@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <SectionLabel className="mb-4">Status</SectionLabel>
          <p className="text-sm text-foreground/70 leading-relaxed">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Spring 2026 모집 준비 중</span>
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-6 text-xs leading-relaxed text-muted-foreground space-y-1">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>상호 : 아이크루</span>
            <span>대표 : 김진욱</span>
            <span>사업자등록번호 : 655-04-03066</span>
            <span>통신판매업신고 : 제 2024-경기하남-0307 호</span>
          </p>
          <p>주소 : 경기도 하남시 미사강변중앙로 226, 1동 13층 1321호(망월동, 우성르보아파크)</p>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>Built with Next.js · 천천히, 단계별로.</p>
          <p className="opacity-70">v0.1 · 2026</p>
        </div>
      </div>
    </footer>
  );
}
