import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AICREW 소개",
  description: "AICREW는 AI 시대의 크리에이티브를 가르치는 아카데미입니다.",
};

const PRINCIPLES = [
  {
    idx: "01",
    title: "현장 강사진만.",
    body: "가르치는 사람이 매일 그 도구로 돈을 버는 사람이어야 합니다. 책으로 정리된 사람이 아니라, 지금 그 일을 하고 있는 사람.",
  },
  {
    idx: "02",
    title: "매주 업데이트.",
    body: "AI는 매주 바뀝니다. 커리큘럼도 그래야 한다고 믿어요. 작년 자료, 작년 강의는 작년에 묻습니다.",
  },
  {
    idx: "03",
    title: "손에 남는 결과물.",
    body: "강의가 끝나면 한 개 이상의 완성된 작품이 손에 남습니다. 들은 시간이 아니라 만든 결과로 평가합니다.",
  },
];

const FIELDS_TEXT = [
  {
    idx: "01",
    title: "AI 코딩",
    body: "Claude·GPT를 도구로 다뤄 진짜로 동작하는 프로덕트를 만드는 법.",
  },
  {
    idx: "02",
    title: "AI 영상제작",
    body: "Runway·Sora·Kling으로 광고·콘텐츠·아트를 만드는 풀 워크플로우.",
  },
  {
    idx: "03",
    title: "AI 음악제작",
    body: "Suno·Udio를 DAW에 자연스럽게 녹여 작품으로 완성하는 법.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-[-20%] right-[-10%] size-[800px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-violet-3)_0%,transparent_65%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_70%)]" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-24 pb-28 sm:pt-32 sm:pb-40">
          <SectionLabel index="00" className="mb-10">About AICREW</SectionLabel>
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.9] uppercase">
            School for
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              makers.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            AI는 도구입니다. 도구는 잘 쓰는 사람에게 의미가 있고요.
            그래서 AICREW는 <span className="text-foreground">&ldquo;AI를 잘 쓰는 사람&rdquo;</span>을 만드는 데 집중합니다.
            유튜브에 떠도는 단편 정보가 아니라, 현장에서 검증된 워크플로우와 시행착오를 같이 나눕니다.
          </p>
        </div>
      </section>

      {/* Three fields */}
      <section className="w-full border-b border-border/60">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
          <SectionLabel index="01" className="mb-10">What we teach</SectionLabel>
          <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15] max-w-3xl">
            세 가지를 깊게.
            <br />
            <span className="text-muted-foreground/60">하나씩 끝까지.</span>
          </h2>

          <div className="mt-16 grid gap-px bg-border/60 border border-border/60">
            {FIELDS_TEXT.map((f) => (
              <div
                key={f.idx}
                className="bg-background p-8 sm:p-12 grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-12 items-baseline"
              >
                <span className="font-mono text-sm text-foreground/40">{f.idx}</span>
                <div className="space-y-3 max-w-3xl">
                  <h3 className="text-2xl sm:text-4xl font-black tracking-[-0.03em]">
                    {f.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="w-full border-b border-border/60">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
          <SectionLabel index="02" className="mb-10">Principles</SectionLabel>
          <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15] max-w-3xl mb-16">
            우리가 양보 못하는
            <br />
            <span className="text-muted-foreground/60">세 가지 원칙.</span>
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.idx} className="relative border border-border/60 bg-background/40 p-8 hover:bg-muted/20 transition-colors">
                <span className="font-mono text-sm text-foreground/40">{p.idx}</span>
                <h3 className="mt-6 text-2xl sm:text-3xl font-black tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-28 sm:py-40">
          <SectionLabel index="03" className="mb-10">Join us</SectionLabel>
          <h2 className="text-5xl sm:text-7xl font-black tracking-[-0.04em] leading-[1.15] uppercase max-w-4xl">
            함께
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              만듭시다.
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            1기 사전 신청을 받고 있어요. 일정과 수강료를 먼저 받아보고 결정하시면 됩니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/courses">
                사전 신청 안내 <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base">
              <Link href="/instructors">강사진 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
