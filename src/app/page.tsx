import Image from "next/image";
import Link from "next/link";
import { instructors } from "#content";
import { Button } from "@/components/ui/button";
import { InstructorCard } from "@/components/site/instructor-card";
import { SectionLabel } from "@/components/site/section-label";
import { FIELDS } from "@/lib/fields";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const TOOLS = [
  { name: "Claude", area: "Coding" },
  { name: "GPT-4", area: "Coding" },
  { name: "Cursor", area: "Coding" },
  { name: "Runway", area: "Video" },
  { name: "Sora", area: "Video" },
  { name: "Kling", area: "Video" },
  { name: "Suno", area: "Music" },
  { name: "Udio", area: "Music" },
  { name: "Ableton", area: "Music" },
];

const PROMISES = [
  {
    title: "현장 강사진만.",
    body: "가르치는 사람이 매일 그 도구로 돈을 버는 사람이어야 합니다.",
  },
  {
    title: "매주 업데이트.",
    body: "AI는 매주 바뀝니다. 커리큘럼도 그래야 한다고 믿어요.",
  },
  {
    title: "손에 남는 결과물.",
    body: "강의가 끝나면 한 개 이상의 완성된 작품이 손에 남습니다.",
  },
];

export default function HomePage() {
  const featured = instructors
    .filter((i) => i.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-border lg:min-h-[calc(100vh-5rem)]">
        <div
          aria-hidden
          className="relative w-full aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:pointer-events-none lg:-z-10"
        >
          <Image
            src="/hero.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="relative w-full px-4 sm:px-8 lg:px-12 pt-10 pb-16 lg:pt-24 lg:pb-32">
          <SectionLabel index="00" className="mb-10">
            AICREW Academy · 2026 Spring
          </SectionLabel>

          <h1 className="text-[clamp(2rem,7vw,6rem)] font-black tracking-[-0.04em] leading-[1.1]">
            AI로 만들고,
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              AI로 성장합니다.
            </span>
          </h1>

          <div className="mt-12 max-w-3xl">
            <p className="text-lg sm:text-xl text-foreground/75 leading-relaxed">
              AICREW는 AI를 가르치는 게 아니라, <span className="font-semibold text-foreground">AI로 만들게 하는</span> 아카데미예요.
              현장에서 매일 AI로 코딩하고, 영상을 만들고, 음악을 만드는 사람들이 직접 설계한 커리큘럼.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 sm:h-16 rounded-full px-7 sm:px-9 text-base sm:text-lg font-semibold shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Link href="/courses">
                  수강 신청 <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 sm:h-16 rounded-full border-2 bg-background px-7 sm:px-9 text-base sm:text-lg font-semibold hover:bg-muted/40 hover:-translate-y-0.5 transition-all"
              >
                <Link href="/instructors">
                  강사진 살펴보기 <ArrowUpRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* Why AICREW (split) */}
      <section className="relative w-full border-b-2 border-border">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <SectionLabel index="01" className="mb-8">Why AICREW</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.15]">
              AI는 도구가 아니라
              <br />
              <span className="text-foreground/60">새 언어입니다.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-md">
              새 언어는 설명으로 익히는 게 아니라 만들면서 익혀요.
              AICREW는 정확히 그 방식으로 가르칩니다.
            </p>
          </div>
          <ul className="space-y-px bg-border border-2 border-border self-start w-full">
            {PROMISES.map((p, idx) => (
              <li
                key={p.title}
                className="bg-background p-6 sm:p-8 flex items-start gap-5"
              >
                <span className="flex-none inline-flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-sm">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fields */}
      <section className="relative w-full border-b-2 border-border">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-32">
          <div className="mb-16">
            <SectionLabel index="02" className="mb-8">Fields</SectionLabel>
            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15]">
              세 가지 분야.
              <br />
              <span className="text-foreground/60">하나씩 깊게.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              AI가 새로 만든 직군, 새로 바꾼 작업 방식. AICREW는 셋 다 가르칩니다.
            </p>
          </div>

          <div className="grid gap-px bg-border border-2 border-border sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(FIELDS).map((field, idx) => (
              <Link
                key={field.slug}
                href={`/instructors?field=${field.slug}`}
                className="group relative bg-background hover:bg-muted/30 transition-colors p-6 sm:p-10 flex flex-col gap-5 sm:gap-6"
              >
                <span className="font-mono text-base text-foreground/40 group-hover:text-foreground/70 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl sm:text-4xl font-black tracking-[-0.03em] leading-[1.15]">
                    {field.label}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {field.description}
                  </p>
                </div>
                <div
                  aria-hidden
                  className={`absolute -top-8 right-8 size-32 rounded-full opacity-15 group-hover:opacity-35 transition-opacity ${field.gradient} blur-3xl pointer-events-none`}
                />
                <div className="relative inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors">
                  강사진 보기 <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="relative w-full border-b-2 border-border bg-muted/30">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-32">
          <div className="mb-12">
            <SectionLabel index="03" className="mb-8">Stack</SectionLabel>
            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15]">
              가르치는 도구들.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              현장에서 실제 쓰는 도구만, 실제 쓰는 워크플로우 그대로. 새 도구가 나오면 다음 학기에 들어갑니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border border-2 border-border">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="bg-background hover:bg-muted/40 transition-colors p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center gap-2"
              >
                <span className="text-xl sm:text-2xl font-black tracking-tight">
                  {tool.name}
                </span>
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {tool.area}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured instructors */}
      <section className="relative w-full border-b-2 border-border">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-32">
          <div className="mb-16">
            <SectionLabel index="04" className="mb-8">Crew</SectionLabel>
            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15]">
              만드는 사람이
              <br />
              <span className="text-foreground/60">가르칩니다.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              AICREW 강사진은 모두 현장에서 AI 도구로 돈을 벌고 작품을 만드는 사람들이에요.
            </p>
            <Link
              href="/instructors"
              className="mt-4 inline-flex items-center gap-1.5 text-base font-semibold text-foreground hover:gap-2.5 transition-[gap]"
            >
              전체 강사진 <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((instructor) => (
              <InstructorCard key={instructor.slug} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[1000px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-violet-2)_0%,transparent_60%)]" />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-36 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <SectionLabel index="05" className="mb-8">Apply</SectionLabel>
            <h2 className="text-4xl sm:text-7xl font-black tracking-[-0.04em] leading-[1.15]">
              2026 봄학기
              <br />
              <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
                사전 신청.
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              모집 시작 전에 커리큘럼·일정·수강료를 먼저 받아보세요.
              사전 신청자에게는 1기 한정 얼리버드 혜택을 보내드립니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
                <Link href="/courses">
                  사전 신청하기 <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base font-semibold">
                <Link href="/about">AICREW 더 알아보기</Link>
              </Button>
            </div>
          </div>

          <ul className="space-y-px bg-border border-2 border-border w-full">
            {[
              "얼리버드 수강료 안내 (정원 한정)",
              "분야별 1순위 추천 강사 매칭",
              "사전 워크숍 무료 초대",
              "기수 한정 수료 후 1:1 멘토링",
            ].map((perk) => (
              <li
                key={perk}
                className="bg-background p-5 sm:p-6 flex items-start gap-3"
              >
                <Check className="size-5 flex-none text-primary mt-0.5" />
                <span className="text-base font-medium leading-relaxed">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
