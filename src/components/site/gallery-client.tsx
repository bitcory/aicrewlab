"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/db";
import { LikeButton } from "@/components/site/like-button";
import { GalleryImageModal } from "@/components/site/gallery-image-modal";
import { ImageIcon, Video as VideoIcon } from "lucide-react";

const CLASS_LEVELS = {
  zero: { label: "제로 클래스", short: "ZERO" },
  up: { label: "업 클래스", short: "UP" },
  pro: { label: "프로 클래스", short: "PRO" },
} as const;

type ClassLevel = keyof typeof CLASS_LEVELS;
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

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const videos = useMemo(() => items.filter((i) => i.kind === "video"), [items]);
  const images = useMemo(() => items.filter((i) => i.kind === "image"), [items]);

  const rawTab = params.get("tab");
  const activeTab: Tab = rawTab === "images" ? "images" : "videos";
  const rawLevel = params.get("level");
  const activeLevel: LevelFilter =
    rawLevel === "zero" || rawLevel === "up" || rawLevel === "pro"
      ? rawLevel
      : "all";

  const setParam = (key: "tab" | "level", value: string | null) => {
    const sp = new URLSearchParams(params);
    if (!value || value === "videos" || value === "all") sp.delete(key);
    else sp.set(key, value);
    const q = sp.toString();
    router.replace(`${pathname}${q ? `?${q}` : ""}`, { scroll: false });
  };

  const counts = { videos: videos.length, images: images.length };

  const source = activeTab === "videos" ? videos : images;
  const levelCounts: Record<LevelFilter, number> = {
    all: source.length,
    zero: source.filter((x) => x.level === "zero").length,
    up: source.filter((x) => x.level === "up").length,
    pro: source.filter((x) => x.level === "pro").length,
  };

  const filtered =
    activeLevel === "all" ? source : source.filter((x) => x.level === activeLevel);

  return (
    <>
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

      <div className="flex flex-wrap items-center gap-2 mb-12">
        {LEVEL_FILTERS.map((f) => {
          const isActive = activeLevel === f.value;
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
                {String(levelCounts[f.value]).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={
            activeTab === "videos"
              ? "이 클래스에서 만든 영상이 아직 없어요."
              : "이미지는 곧 추가됩니다."
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const level = item.level ? CLASS_LEVELS[item.level] : null;
  return (
    <article className="group border-2 border-border bg-background overflow-hidden">
      {item.kind === "video" ? (
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.src}?rel=0`}
            title={item.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 size-full"
          />
        </div>
      ) : (
        <GalleryImageModal item={item}>
          <button
            type="button"
            className="block w-full overflow-hidden cursor-zoom-in"
            aria-label={`${item.title} 자세히 보기`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title}
              className="w-full aspect-video object-cover transition-transform group-hover:scale-[1.02]"
            />
          </button>
        </GalleryImageModal>
      )}

      <div className="p-6 space-y-3">
        {(level || item.stage) && (
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em]">
            {level && (
              <span className="inline-flex items-center gap-1.5 border-2 border-border px-2 py-1 text-foreground/80">
                <span className="size-1.5 rounded-full bg-primary" />
                {level.short} CLASS
              </span>
            )}
            {item.stage && (
              <span className="text-muted-foreground">{item.stage}</span>
            )}
          </div>
        )}
        <h3 className="text-xl sm:text-2xl font-black tracking-[-0.02em] leading-tight">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-2">
          {item.creator ? (
            <span className="text-sm font-semibold text-foreground/80">
              by {item.creator}
            </span>
          ) : (
            <span />
          )}
          <LikeButton id={item.id} initialLikes={item.likes} />
        </div>
      </div>
    </article>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-2 border-dashed border-border bg-muted/20 py-24 px-8 text-center">
      <p className="text-base font-semibold text-muted-foreground">{message}</p>
    </div>
  );
}
