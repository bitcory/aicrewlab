export type ClassLevel = "zero" | "up" | "pro";

export const CLASS_LEVELS: Record<
  ClassLevel,
  { label: string; short: string; order: number }
> = {
  zero: { label: "제로 클래스", short: "ZERO", order: 1 },
  up: { label: "업 클래스", short: "UP", order: 2 },
  pro: { label: "프로 클래스", short: "PRO", order: 3 },
};

export type GalleryVideo = {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  level: ClassLevel;
  stage?: string;
};

export type GalleryImage = {
  slug: string;
  title: string;
  description?: string;
  src: string;
  level?: ClassLevel;
  stage?: string;
  width?: number;
  height?: number;
};

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    slug: "fitness-promo",
    title: "헬쓰장 홍보영상",
    description: "PRO 클래스 3단계 \"멀티영상 만들기\"에서 만든 영상입니다.",
    youtubeId: "XUPgogriS-8",
    level: "pro",
    stage: "3단계 · 멀티영상 만들기",
  },
  {
    slug: "couple",
    title: "연인사이",
    description: "PRO 클래스 3단계 \"멀티영상 만들기\"에서 만든 영상입니다.",
    youtubeId: "l5_1EEX750w",
    level: "pro",
    stage: "3단계 · 멀티영상 만들기",
  },
  {
    slug: "samurai-yoshiko",
    title: "사무라이 요시꼬",
    description: "PRO 클래스 3단계 \"멀티영상 만들기\"에서 만든 영상입니다.",
    youtubeId: "eNPjHBk4rEo",
    level: "pro",
    stage: "3단계 · 멀티영상 만들기",
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // 이미지는 비어 있음 — public/gallery/ 에 추가 후 여기에 등록
];
