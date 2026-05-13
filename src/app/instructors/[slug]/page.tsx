import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { instructors, portfolios } from "#content";
import { Button } from "@/components/ui/button";
import { AvatarBlock } from "@/components/site/avatar-block";
import { FieldBadge } from "@/components/site/field-badge";
import { ClassBadges } from "@/components/site/class-badges";
import { SocialLinks } from "@/components/site/social-links";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { SectionLabel } from "@/components/site/section-label";
import { Prose } from "@/lib/mdx";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return instructors.map((i) => ({ slug: i.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const instructor = instructors.find((i) => i.slug === slug);
  if (!instructor) return {};
  return {
    title: `${instructor.name} — ${instructor.role}`,
    description: instructor.headline,
  };
}

export default async function InstructorPage({ params }: PageProps) {
  const { slug } = await params;
  const instructor = instructors.find((i) => i.slug === slug);
  if (!instructor) notFound();

  const works = portfolios
    .filter((p) => p.instructorSlug === instructor.slug)
    .sort((a, b) => a.order - b.order);

  const specialtyOrb =
    instructor.specialty === "coding"
      ? "bg-[var(--orb-coding)]"
      : instructor.specialty === "video"
      ? "bg-[var(--orb-video)]"
      : instructor.specialty === "music"
      ? "bg-[var(--orb-music)]"
      : "bg-[radial-gradient(circle,oklch(0.8_0.16_85)_0%,transparent_70%)]";

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className={`absolute -top-32 -right-20 size-[700px] rounded-full blur-3xl ${specialtyOrb}`} />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_70%)]" />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Link
            href="/instructors"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition mb-16"
          >
            <ArrowLeft className="size-3.5" />
            Back to Crew
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
            <AvatarBlock
              name={instructor.name}
              specialty={instructor.specialty}
              avatar={instructor.avatar}
              size="xl"
              variant="portrait"
            />
            <div className="flex-1 space-y-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <FieldBadge specialty={instructor.specialty} />
                <ClassBadges classes={instructor.classes} />
              </div>
              <div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9]">
                  {instructor.name}
                </h1>
                <p className="mt-3 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {instructor.role}
                </p>
              </div>
              <p className="text-xl sm:text-2xl leading-snug font-medium tracking-tight max-w-2xl">
                {instructor.headline}
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {instructor.bio}
              </p>
              <SocialLinks social={instructor.social} />
            </div>
          </div>
        </div>
      </header>

      {/* Bio */}
      <section className="w-full border-b border-border/60">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-28 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          <div>
            <SectionLabel index="01">About</SectionLabel>
          </div>
          <div className="max-w-3xl">
            <Prose html={instructor.body} />
          </div>
        </div>
      </section>

      {works.length > 0 && (
        <section className="w-full border-b border-border/60">
          <div className="w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <SectionLabel index="02" className="mb-6">Portfolio</SectionLabel>
                <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[0.95]">
                  대표 작업
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {String(works.length).padStart(2, "0")} works
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {works.map((work) => (
                <PortfolioCard key={work.slug} item={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32 text-center">
          <SectionLabel index="03" className="mb-10 justify-center flex">
            Apply
          </SectionLabel>
          <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.15] max-w-3xl mx-auto">
            {instructor.name} 강사의
            <br />
            <span className="text-muted-foreground/60">강의 일정이 곧 공개됩니다.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            사전 신청자에게 1순위로 안내드려요.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/courses">
                사전 신청하기 <ArrowUpRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
