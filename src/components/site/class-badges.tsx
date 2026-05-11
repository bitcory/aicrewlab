import { cn } from "@/lib/utils";

type ClassLevel = "ZERO" | "UP" | "PRO";

const CLASS_STYLES: Record<ClassLevel, string> = {
  ZERO: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  UP: "border-sky-500/40 bg-sky-500/10 text-sky-500",
  PRO: "border-orange-500/40 bg-orange-500/10 text-orange-500",
};

export function ClassBadges({
  classes,
  className,
}: {
  classes: readonly ClassLevel[];
  className?: string;
}) {
  if (!classes.length) return null;
  return (
    <div className={cn("inline-flex flex-wrap items-center gap-1.5", className)}>
      {classes.map((c) => (
        <span
          key={c}
          className={cn(
            "inline-flex items-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold border px-2 py-0.5 rounded",
            CLASS_STYLES[c],
          )}
        >
          {c} Class
        </span>
      ))}
    </div>
  );
}
