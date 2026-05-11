"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  GALLERY_VIDEOS,
  GALLERY_IMAGES,
  CLASS_LEVELS,
  type GalleryVideo,
  type GalleryImage,
  type ClassLevel,
} from "@/lib/gallery";
import { ImageIcon, Video as VideoIcon } from "lucide-react";

type Tab = "videos" | "images";
type LevelFilter = "all" | ClassLevel;

const TABS: Array<{ value: Tab; label: string; icon: typeof VideoIcon }> = [
  { value: "videos", label: "영상", icon: VideoIcon },
  { value: "images", label: "이미지", icon: ImageIcon },
];

const LEVEL_FILTERS: Array<{ value: LevelFilter; label: string }> = [
  { value: "all", label: "전체" },
  { value: "zero", label: CLASS_LEVELS.zero.label },
  { value: "up", label: CLASS_LEVELS.up.label },
  { value: "pro", label: CLASS_LEVELS.pro.label },
];

export function GalleryClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const rawTab = params.get("tab");
  const activeTab: Tab = rawTab === "images" ? "images" : "videos";

  const rawLevel = params.get("level");
  const activeLevel: LevelFilter =
    rawLevel && rawLevel in CLASS_LEVELS ? (rawLevel as ClassLevel) : "all";

  const setParam = (key: "tab" | "level", value: string | null) => {
    const sp = new URLSearchParams(params);
    if (!value || value === "videos" || value === "all") sp.delete(key);
    else sp.set(key, value);
    const q = sp.toString();
    router.replace(`${pathname}${q ? `?${q}` : ""}`, { scroll: false });
  };

  const counts = useMemo(
    () => ({
      videos: GALLERY_VIDEOS.length,
      images: GALLERY_IMAGES.length,
    }),
    [],
  );

  const levelCounts = useMemo(() => {
    const source = activeTab === "videos" ? GALLERY_VIDEOS : GALLERY_IMAGES;
    return {
      all: source.length,
      zero: source.filter((x) => x.level === "zero").length,
      up: source.filter((x) => x.level === "up").length,
      pro: source.filter((x) => x.level === "pro").length,
    } as Record<LevelFilter, number>;
  }, [activeTab]);

  const filteredVideos = useMemo(() => {
    if (activeLevel === "all") return GALLERY_VIDEOS;
    return GALLERY_VIDEOS.filter((v) => v.level === activeLevel);
  }, [activeLevel]);

  const filteredImages = useMemo(() => {
    if (activeLevel === "all") return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((i) => i.level === activeLevel);
  }, [activeLevel]);

  return (
    <>
      {/* Top tabs: videos / images */}
      <div
        role="tablist"
        className="flex flex-wrap items-center gap-px mb-8 border-2 border-border self-start w-fit"
      >
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.value;
          return (
            <button
              key={t.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setParam("tab", t.value)}
              className={cn(
                "px-5 py-3 text-base font-semibold tracking-tight transition-colors inline-flex items-center gap-2.5",
                isActive
                  ? "bg-foreground text-background"
                  : "bg-background hover:bg-muted/60 text-foreground/70 hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span>{t.label}</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "opacity-80" : "text-muted-foreground",
                )}
              >
                {String(counts[t.value]).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub filter: class levels */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {LEVEL_FILTERS.map((f) => {
          const isActive = activeLevel === f.value;
          const count = levelCounts[f.value];
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setParam("level", f.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold tracking-tight transition-colors",
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "border-border bg-background text-foreground/70 hover:text-foreground hover:bg-muted/60",
              )}
            >
              <span>{f.label}</span>
              <span
                className={cn(
                  "text-xs",
                  isActive ? "opacity-80" : "text-muted-foreground",
                )}
              >
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {activeTab === "videos" ? (
        <VideoGrid videos={filteredVideos} />
      ) : (
        <ImageGrid images={filteredImages} />
      )}
    </>
  );
}

function VideoGrid({ videos }: { videos: GalleryVideo[] }) {
  if (videos.length === 0) {
    return <EmptyState message="이 클래스에서 만든 영상이 아직 없어요." />;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => {
        const level = CLASS_LEVELS[v.level];
        return (
          <article
            key={v.slug}
            className="group border-2 border-border bg-background overflow-hidden"
          >
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`}
                title={v.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 size-full"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em]">
                <span className="inline-flex items-center gap-1.5 border-2 border-border px-2 py-1 text-foreground/80">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {level.short} CLASS
                </span>
                {v.stage && (
                  <span className="text-muted-foreground">{v.stage}</span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-[-0.02em] leading-tight">
                {v.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ImageGrid({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return (
      <EmptyState message="이미지는 곧 추가됩니다. 직접 올린 이미지로 채워질 예정이에요." />
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((im) => {
        const level = im.level ? CLASS_LEVELS[im.level] : null;
        return (
          <article
            key={im.slug}
            className="group border-2 border-border bg-background overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={im.src}
              alt={im.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-6 space-y-2">
              {level && (
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em]">
                  <span className="inline-flex items-center gap-1.5 border-2 border-border px-2 py-1 text-foreground/80">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {level.short} CLASS
                  </span>
                  {im.stage && (
                    <span className="text-muted-foreground">{im.stage}</span>
                  )}
                </div>
              )}
              <h3 className="text-xl font-black tracking-[-0.02em]">{im.title}</h3>
              {im.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {im.description}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-2 border-dashed border-border bg-muted/20 py-24 px-8 text-center">
      <p className="text-base font-semibold text-muted-foreground">{message}</p>
    </div>
  );
}
