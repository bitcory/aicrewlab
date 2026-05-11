import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/section-label";
import { GalleryClient } from "@/components/site/gallery-client";
import { GALLERY_VIDEOS, GALLERY_IMAGES } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "갤러리",
  description:
    "AICREW 강사진과 학생들이 만든 영상·이미지 작품 갤러리. PRO 클래스 결과물을 만나보세요.",
};

export default function GalleryPage() {
  const total = GALLERY_VIDEOS.length + GALLERY_IMAGES.length;

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b-2 border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-[-30%] right-[-10%] size-[800px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-violet-3)_0%,transparent_65%)]" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <SectionLabel index="00" className="mb-10">Gallery</SectionLabel>
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[1.05]">
            만든 작품으로
            <br />
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--headline-from)_0%,var(--headline-to)_100%)]">
              증명합니다.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            AICREW 강사진과 학생들이 직접 만든 영상·이미지 작품. PRO 클래스 결과물을 그대로 공개합니다.
          </p>

          <div className="mt-12 flex items-baseline gap-4 border-t border-border/60 pt-8 max-w-md">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total works
            </span>
            <span className="text-5xl font-black tracking-tight">
              {String(total).padStart(2, "0")}
              <span className="text-foreground/30">+</span>
            </span>
          </div>
        </div>
      </section>

      {/* Gallery list */}
      <section className="w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Suspense>
            <GalleryClient />
          </Suspense>
        </div>
      </section>
    </>
  );
}
