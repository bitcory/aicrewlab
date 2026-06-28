"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type DropdownItem = {
  label: string;
  href: string;
  desc: string;
};

type DropdownColumn = {
  heading: string;
  items: DropdownItem[];
};

type NavItem = {
  label: string;
  href: string;
  intro: { title: string; desc: string };
  columns: DropdownColumn[];
  featured: {
    label: string;
    title: string;
    desc: string;
    href: string;
    cta: string;
    image: string;
    imageAlt: string;
  };
};

const NAV: NavItem[] = [
  {
    label: "강사진",
    href: "/instructors",
    intro: {
      title: "Crew",
      desc: "현장에서 매일 AI로 작업하고, 작품을 만드는 사람들이 직접 가르칩니다.",
    },
    columns: [
      {
        heading: "분야별",
        items: [
          {
            label: "AI 코딩 강사진",
            href: "/instructors?field=coding",
            desc: "Claude·GPT로 프로덕트를 만드는 사람들",
          },
          {
            label: "AI 영상제작 강사진",
            href: "/instructors?field=video",
            desc: "Runway·Sora로 영상을 만드는 사람들",
          },
          {
            label: "AI 음악제작 강사진",
            href: "/instructors?field=music",
            desc: "Suno·Udio로 음악을 만드는 사람들",
          },
        ],
      },
      {
        heading: "더 보기",
        items: [
          {
            label: "전체 강사진",
            href: "/instructors",
            desc: "한 페이지에서 모두 보기",
          },
        ],
      },
    ],
    featured: {
      label: "Featured",
      title: "2026 Spring Crew",
      desc: "이번 학기를 함께할 강사진을 미리 만나보세요.",
      href: "/instructors",
      cta: "강사진 만나기",
      image: "/nav/field-instructors-principle.png",
      imageAlt: "현장 강사진이 스튜디오 강의실에서 수업하는 모습",
    },
  },
  {
    label: "강의",
    href: "/courses",
    intro: {
      title: "Courses",
      desc: "한 학기에 한 분야씩, 현장 워크플로우 전체를 가르치는 커리큘럼.",
    },
    columns: [
      {
        heading: "트랙",
        items: [
          {
            label: "AI 코딩 트랙",
            href: "/instructors?field=coding",
            desc: "에이전트·워크플로우·자동화",
          },
          {
            label: "AI 영상제작 트랙",
            href: "/instructors?field=video",
            desc: "광고·콘텐츠·아트 풀 워크플로우",
          },
          {
            label: "AI 음악제작 트랙",
            href: "/instructors?field=music",
            desc: "데모부터 마스터링까지",
          },
        ],
      },
      {
        heading: "신청",
        items: [
          {
            label: "사전 신청 안내",
            href: "/courses",
            desc: "정원·일정·얼리버드 혜택",
          },
        ],
      },
    ],
    featured: {
      label: "Spring 2026",
      title: "사전 신청 진행 중",
      desc: "정원 한정 · 사전 신청자에게 1순위로 안내드려요.",
      href: "/courses",
      cta: "수강 신청하기",
      image: "/nav/spring-2026-preregistration.png",
      imageAlt: "봄학기 사전 신청을 준비하는 책상과 노트북",
    },
  },
  {
    label: "갤러리",
    href: "/gallery",
    intro: {
      title: "Gallery",
      desc: "AICREW와 함께 만든 영상·이미지 작품들. 실제 결과물로 확인하세요.",
    },
    columns: [
      {
        heading: "카테고리",
        items: [
          {
            label: "영상 갤러리",
            href: "/gallery",
            desc: "AI로 만든 영상 작품",
          },
          {
            label: "이미지 갤러리",
            href: "/gallery?tab=images",
            desc: "AI로 만든 이미지 작품",
          },
        ],
      },
    ],
    featured: {
      label: "Featured",
      title: "PRO CLASS 3단계",
      desc: "멀티영상 만들기 — 학생들이 만든 대표 결과물 3편",
      href: "/gallery",
      cta: "영상 보기",
      image: "/nav/pro-class-3-stage.png",
      imageAlt: "세 단계 영상 편집 결과물을 보여주는 작업 화면",
    },
  },
  {
    label: "소개",
    href: "/about",
    intro: {
      title: "About AICREW",
      desc: "만드는 사람의 학교. 어떻게 시작했고 무엇을 약속하는지.",
    },
    columns: [
      {
        heading: "AICREW",
        items: [
          {
            label: "아카데미 소개",
            href: "/about",
            desc: "철학과 시작점",
          },
          {
            label: "세 가지 원칙",
            href: "/about#principles",
            desc: "양보 못 하는 운영 원칙",
          },
        ],
      },
      {
        heading: "연결",
        items: [
          {
            label: "강사 지원",
            href: "mailto:aitoolbee79@gmail.com",
            desc: "함께 가르치고 싶다면",
          },
          {
            label: "일반 문의",
            href: "mailto:aitoolbee79@gmail.com",
            desc: "수강·제휴·언론 문의",
          },
        ],
      },
    ],
    featured: {
      label: "Principle",
      title: "현장 강사진만",
      desc: "가르치는 사람이 매일 그 도구로 돈을 버는 사람이어야 합니다.",
      href: "/about",
      cta: "더 알아보기",
      image: "/nav/field-instructors-principle.png",
      imageAlt: "현장 강사진이 스튜디오 강의실에서 수업하는 모습",
    },
  },
];

export function Header() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header
      className="sticky top-0 z-40 bg-muted/80 backdrop-blur supports-[backdrop-filter]:bg-muted/65"
      onMouseLeave={() => setActive(null)}
    >
      <div className="border-b border-border">
        <div className="flex h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 lg:gap-6">
            <Logo />
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {NAV.map((item) => {
                const isActive = active === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={() => setActive(item.label)}
                    onClick={() => setActive(isActive ? null : item.label)}
                    aria-expanded={isActive}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-base lg:text-lg font-semibold tracking-tight transition-colors",
                      isActive
                        ? "bg-background text-foreground ring-1 ring-border"
                        : "text-foreground/85 hover:bg-background/70 hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        isActive ? "rotate-180" : "",
                      )}
                    />
                  </button>
                );
              })}
              <Link
                href="/tools"
                onMouseEnter={() => setActive(null)}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-base lg:text-lg font-semibold tracking-tight text-foreground/85 hover:bg-background/70 hover:text-foreground transition-colors"
              >
                유용한 툴
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              size="default"
              className="h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 text-sm font-semibold"
            >
              <Link href="/courses">수강 신청</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute inset-x-0 top-full bg-background border-b-2 border-border shadow-lg transition-all duration-150 origin-top",
          active
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-1 pointer-events-none",
        )}
      >
        {NAV.map((item) =>
          item.label === active ? (
            <div
              key={item.label}
              className="w-full px-4 sm:px-8 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left: intro */}
              <div className="lg:col-span-3 lg:border-r-2 lg:border-border lg:pr-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {item.label}
                </p>
                <h3 className="text-3xl font-black tracking-tight">
                  {item.intro.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  {item.intro.desc}
                </p>
              </div>

              {/* Middle: columns */}
              <div className="lg:col-span-6 grid sm:grid-cols-2 gap-8 lg:px-4">
                {item.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 px-3">
                      {col.heading}
                    </p>
                    <ul className="space-y-1">
                      {col.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            href={it.href}
                            onClick={() => setActive(null)}
                            className="group block rounded-xl px-3 py-3 hover:bg-primary/10 transition-colors"
                          >
                            <p className="text-lg font-bold tracking-tight text-foreground">
                              {it.label}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground/70 leading-relaxed transition-colors">
                              {it.desc}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right: featured */}
              <div className="lg:col-span-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {item.featured.label}
                </p>
                <Link
                  href={item.featured.href}
                  onClick={() => setActive(null)}
                  className="group block border-2 border-border bg-muted/30 hover:bg-muted/60 transition-colors p-5"
                >
                  <div className="relative aspect-[16/10] w-full mb-4 overflow-hidden bg-muted">
                    <Image
                      src={item.featured.image}
                      alt={item.featured.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-xl font-black tracking-tight">
                    {item.featured.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.featured.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-2.5 transition-[gap]">
                    {item.featured.cta}{" "}
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </div>
            </div>
          ) : null,
        )}
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden border-t border-border/40 px-2 py-2 overflow-x-auto">
        <ul className="flex items-center gap-1 text-base font-semibold">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2.5 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted/60 transition whitespace-nowrap"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/tools"
              className="block px-4 py-2.5 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted/60 transition whitespace-nowrap"
            >
              유용한 툴
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
