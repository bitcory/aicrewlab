import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { FIELDS } from "@/lib/fields";
import { Clock, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "강의",
  description:
    "AICREW 아카데미의 강의 라인업. 2026 봄학기 모집을 준비 중입니다.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 size-[1000px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-cyan-2)_0%,transparent_65%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-24 pb-24 sm:pt-32 sm:pb-32">
          <SectionLabel index="00" className="mb-10">Courses</SectionLabel>
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.9] uppercase">
            2026
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              Spring Cohort.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            2026 봄학기 (3~5월) 모집을 준비 중입니다.
            사전 신청자에게 일정·수강료·얼리버드 혜택을 가장 먼저 안내드려요.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href="mailto:hello@aicrew.academy?subject=AICREW%20%EC%82%AC%EC%A0%84%20%EC%8B%A0%EC%B2%AD">
                사전 신청 메일 보내기 <ArrowUpRight className="size-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="w-full border-b border-border/60 bg-muted/20">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Cohort</p>
            <p className="mt-2 text-2xl font-black tracking-tight">Spring &lsquo;26</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Duration</p>
            <p className="mt-2 text-2xl font-black tracking-tight">3 months</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Mode</p>
            <p className="mt-2 text-2xl font-black tracking-tight">Hybrid</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</p>
            <p className="mt-2 inline-flex items-center gap-2 text-2xl font-black tracking-tight">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Pre-registering
            </p>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="w-full border-b border-border/60">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
          <SectionLabel index="01" className="mb-10">Tracks</SectionLabel>
          <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15] max-w-3xl mb-16">
            세 가지 트랙.
            <br />
            <span className="text-muted-foreground/60">하나만 골라도 충분합니다.</span>
          </h2>

          <div className="grid gap-px bg-border/60 border border-border/60">
            {Object.values(FIELDS).map((field, idx) => (
              <div
                key={field.slug}
                className="relative group bg-background hover:bg-muted/30 transition-colors p-8 sm:p-12 grid sm:grid-cols-[auto_1.5fr_1fr_auto] gap-6 sm:gap-12 items-start"
              >
                <span className="font-mono text-sm text-foreground/40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {field.short}
                  </p>
                  <h3 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[0.95]">
                    {field.label}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{field.description}</p>
                <div
                  aria-hidden
                  className={`absolute top-4 right-6 size-24 rounded-full opacity-15 group-hover:opacity-40 transition-opacity ${field.gradient} blur-3xl pointer-events-none`}
                />
                <div className="relative flex flex-col gap-3 sm:items-end">
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Clock className="size-3.5" />
                    2026 Q1
                  </div>
                  <Link
                    href={`/instructors?field=${field.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-[gap]"
                  >
                    강사진 먼저 보기 <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-28 sm:py-40">
          <SectionLabel index="02" className="mb-10">Apply</SectionLabel>
          <h2 className="text-5xl sm:text-7xl font-black tracking-[-0.04em] leading-[1.15] uppercase max-w-4xl">
            먼저 신청한 사람이
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              먼저 만듭니다.
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            얼리버드 혜택 · 1순위 안내 · 사전 워크숍 초대 — 사전 신청자에게만 드립니다.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href="mailto:hello@aicrew.academy?subject=AICREW%20%EC%82%AC%EC%A0%84%20%EC%8B%A0%EC%B2%AD">
                메일로 신청하기 <ArrowUpRight className="size-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
