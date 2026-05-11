import { Suspense } from "react";
import type { Metadata } from "next";
import { instructors } from "#content";
import { InstructorFilter } from "@/components/site/instructor-filter";
import { SectionLabel } from "@/components/site/section-label";

export const metadata: Metadata = {
  title: "강사진",
  description:
    "AI 코딩, AI 영상제작, AI 음악제작 — 현장에서 매일 AI를 다루는 AICREW 강사진을 소개합니다.",
};

export default function InstructorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-[-30%] left-[-10%] size-[900px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-violet-3)_0%,transparent_65%)]" />
          <div className="absolute top-[5%] right-[-5%] size-[700px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-cyan-2)_0%,transparent_65%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <SectionLabel index="00" className="mb-10">Crew</SectionLabel>
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.9] uppercase">
            People who
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              actually ship.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            가르치는 사람이 가장 중요합니다.
            AICREW 강사진은 모두 <span className="text-foreground">현장에서 AI 도구로 돈을 벌고 작품을 만드는 사람들</span>이에요.
          </p>

          {/* counter */}
          <div className="mt-16 flex items-baseline gap-4 border-t border-border/40 pt-8 max-w-md">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total Crew
            </span>
            <span className="text-5xl font-black tracking-tight">
              {String(instructors.length).padStart(2, "0")}
              <span className="text-foreground/30">+</span>
            </span>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Suspense>
            <InstructorFilter all={instructors} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
