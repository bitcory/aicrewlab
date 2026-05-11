import { Globe } from "lucide-react";
import { YoutubeIcon, GithubIcon, InstagramIcon, TwitterIcon, ThreadsIcon } from "@/components/site/brand-icons";

type SocialKey = "youtube" | "instagram" | "github" | "twitter" | "threads" | "web";

const ICONS: Record<SocialKey, React.ComponentType<{ className?: string }>> = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  threads: ThreadsIcon,
  web: Globe,
};

const LABELS: Record<SocialKey, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  github: "GitHub",
  twitter: "X",
  threads: "Threads",
  web: "웹사이트",
};

export function SocialLinks({
  social,
}: {
  social?: Partial<Record<SocialKey, string>>;
}) {
  if (!social) return null;
  const entries = (Object.entries(social) as Array<[SocialKey, string | undefined]>).filter(
    (entry): entry is [SocialKey, string] => Boolean(entry[1]),
  );
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([key, href]) => {
        const Icon = ICONS[key];
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={LABELS[key]}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/40 transition"
          >
            <Icon className="size-3.5" />
            {LABELS[key]}
          </a>
        );
      })}
    </div>
  );
}
