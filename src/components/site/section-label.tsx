import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground",
        className,
      )}
    >
      {index && <span className="text-foreground/40">{index}</span>}
      <span className="text-foreground/60">[</span>
      <span>{children}</span>
      <span className="text-foreground/60">]</span>
    </div>
  );
}
