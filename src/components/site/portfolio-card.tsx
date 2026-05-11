import type { Portfolio } from "#content";
import { YoutubeIcon } from "@/components/site/brand-icons";

export function PortfolioCard({ item }: { item: Portfolio }) {
  return (
    <article
      id={item.slug}
      className="group border border-border/60 bg-background overflow-hidden scroll-mt-24"
    >
      {item.youtubeId ? (
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0`}
            title={item.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 size-full"
          />
        </div>
      ) : item.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.cover}
          alt={item.title}
          className="w-full aspect-video object-cover"
        />
      ) : (
        <div className="relative aspect-video bg-[linear-gradient(135deg,var(--portfolio-bg-from)_0%,var(--portfolio-bg-to)_100%)] grid place-items-center">
          {item.tags[0] && (
            <span className="font-mono text-muted-foreground/60 text-xs uppercase tracking-[0.3em]">
              {item.tags[0]}
            </span>
          )}
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <h3 className="flex-1 text-xl sm:text-2xl font-black tracking-[-0.02em] leading-tight">
            {item.title}
          </h3>
          {item.youtubeId && (
            <YoutubeIcon className="size-4 text-muted-foreground shrink-0 mt-2" />
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.summary}
        </p>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-border/60 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
