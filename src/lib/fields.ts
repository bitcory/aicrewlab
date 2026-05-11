export type Specialty = "coding" | "video" | "music";

export const FIELDS: Record<
  Specialty,
  {
    slug: Specialty;
    label: string;
    short: string;
    description: string;
    gradient: string;
    textColor: string;
    badgeClass: string;
  }
> = {
  coding: {
    slug: "coding",
    label: "AI 코딩",
    short: "Coding",
    description:
      "Claude·GPT를 도구로 다뤄 실제 동작하는 프로덕트를 만드는 법. 에이전트, 워크플로우, 자동화까지.",
    gradient:
      "bg-[linear-gradient(135deg,oklch(0.7_0.18_145)_0%,oklch(0.6_0.2_180)_100%)]",
    textColor: "text-[oklch(0.7_0.18_145)]",
    badgeClass:
      "bg-[color-mix(in_oklch,oklch(0.7_0.18_145)_18%,transparent)] text-[oklch(0.7_0.18_145)] border-[color-mix(in_oklch,oklch(0.7_0.18_145)_30%,transparent)]",
  },
  video: {
    slug: "video",
    label: "AI 영상제작",
    short: "Video",
    description:
      "Runway·Sora·Kling으로 풀 영상 만드는 워크플로우. 광고·콘텐츠·아트 어디든.",
    gradient:
      "bg-[linear-gradient(135deg,oklch(0.65_0.24_25)_0%,oklch(0.55_0.22_330)_100%)]",
    textColor: "text-[oklch(0.7_0.22_25)]",
    badgeClass:
      "bg-[color-mix(in_oklch,oklch(0.7_0.22_25)_18%,transparent)] text-[oklch(0.7_0.22_25)] border-[color-mix(in_oklch,oklch(0.7_0.22_25)_30%,transparent)]",
  },
  music: {
    slug: "music",
    label: "AI 음악제작",
    short: "Music",
    description:
      "Suno·Udio·MusicGen을 DAW에 자연스럽게 녹이는 법. 데모 부스트부터 마스터링까지.",
    gradient:
      "bg-[linear-gradient(135deg,oklch(0.65_0.2_280)_0%,oklch(0.6_0.22_320)_100%)]",
    textColor: "text-[oklch(0.72_0.22_280)]",
    badgeClass:
      "bg-[color-mix(in_oklch,oklch(0.72_0.22_280)_18%,transparent)] text-[oklch(0.72_0.22_280)] border-[color-mix(in_oklch,oklch(0.72_0.22_280)_30%,transparent)]",
  },
};

export function getInitials(name: string) {
  return name.replace(/\s+/g, "").slice(0, 2);
}
