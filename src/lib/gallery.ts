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
  {
    slug: "ai-creative-companion",
    title: "AI 크리에이티브 컴패니언",
    description: "ZERO 클래스에서 만든 AI 협업 콘셉트 이미지 예시입니다.",
    src: "/gallery/ai-creative-companion.png",
    level: "zero",
    stage: "1단계 · AI 이미지 만들기",
    width: 1672,
    height: 941,
  },
  {
    slug: "ai-study-planner",
    title: "AI 학습 플래너 UI",
    description: "UP 클래스에서 만든 AI 서비스 UI 목업 예시입니다.",
    src: "/gallery/ai-study-planner.png",
    level: "up",
    stage: "2단계 · 서비스 화면 만들기",
    width: 1672,
    height: 941,
  },
  {
    slug: "fitness-studio-promo",
    title: "피트니스 스튜디오 프로모션",
    description: "PRO 클래스에서 만든 AI 영상 콘셉트 프레임 예시입니다.",
    src: "/gallery/fitness-studio-promo.png",
    level: "pro",
    stage: "3단계 · 캠페인 비주얼 만들기",
    width: 1672,
    height: 941,
  },
];
