import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/section-label";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "유용한 툴",
  description:
    "AICREW가 직접 만들고 쓰는 AI 작업용 웹 도구 모음. 카드를 누르면 해당 툴로 바로 이동합니다.",
};

type Tool = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  tag: string;
};

const TOOLS: Tool[] = [
  {
    name: "이미지 분할기",
    tagline: "Image Splitter",
    description:
      "큰 이미지를 격자로 잘라 여러 장으로 나눠줍니다. 썸네일·스프라이트·업로드 분할에 바로 쓰세요.",
    href: "https://split.toolb.kr",
    tag: "Image",
  },
  {
    name: "멀티영상다운",
    tagline: "Video Downloader",
    description:
      "영상 링크만 넣으면 원본 영상을 바로 내려받습니다. 레퍼런스 수집·소스 확보에 빠르게 쓰세요.",
    href: "https://down.toolb.kr/",
    tag: "Video",
  },
  {
    name: "음성생성기",
    tagline: "Text to Speech",
    description:
      "텍스트를 입력하면 자연스러운 음성으로 변환합니다. 내레이션·더빙·미리듣기 음원을 바로 만드세요.",
    href: "https://tts.toolb.kr/",
    tag: "Audio",
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-border/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 size-[1000px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-cyan-2)_0%,transparent_65%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-24 pb-24 sm:pt-32 sm:pb-32">
          <SectionLabel index="00" className="mb-10">
            Tools
          </SectionLabel>
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.9] uppercase">
            유용한
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              툴 모음.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            AICREW가 작업하면서 직접 만들고 쓰는 웹 도구들입니다.
            카드를 누르면 해당 툴로 바로 이동합니다.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32">
          <SectionLabel index="01" className="mb-10">
            Collection
          </SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col border-2 border-border bg-background hover:bg-muted/30 transition-colors p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {tool.tag}
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-[transform,color] group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.02em]">
                  {tool.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {tool.tagline}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-2.5 transition-[gap]">
                  툴 열기 <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
