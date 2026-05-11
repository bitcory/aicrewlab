import { cn } from "@/lib/utils";
import { FIELDS, getInitials, type Specialty } from "@/lib/fields";

export function AvatarBlock({
  name,
  specialty,
  avatar,
  size = "md",
  className,
}: {
  name: string;
  specialty: Specialty;
  avatar?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const dims = {
    sm: "size-10 text-sm",
    md: "size-14 text-base",
    lg: "size-20 text-xl",
    xl: "size-28 text-3xl",
  }[size];

  const gradient = FIELDS[specialty].gradient;

  if (avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={avatar}
        alt={name}
        className={cn(
          "rounded-full object-cover border border-border/40 shadow-sm",
          dims,
          className,
        )}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={cn(
        "rounded-full grid place-items-center text-primary-foreground font-bold shadow-sm border border-border/30",
        gradient,
        dims,
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}
