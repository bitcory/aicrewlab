import { cn } from "@/lib/utils";
import { FIELDS, type Specialty } from "@/lib/fields";

export function FieldBadge({
  specialty,
  className,
}: {
  specialty: Specialty;
  className?: string;
}) {
  const field = FIELDS[specialty];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-tight border-2 px-3 py-1.5 rounded-md",
        field.badgeClass,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {field.label}
    </span>
  );
}
