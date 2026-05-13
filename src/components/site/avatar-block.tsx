import { cn } from "@/lib/utils";
import { FIELDS, getInitials, type Specialty } from "@/lib/fields";

export function AvatarBlock({
  name,
  specialty,
  avatar,
  size = "md",
  variant = "circle",
  className,
}: {
  name: string;
  specialty: Specialty;
  avatar?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "circle" | "portrait";
  className?: string;
}) {
  const isPortrait = variant === "portrait";

  const dims = isPortrait
    ? {
        sm: "w-16 h-24 text-sm",
        md: "w-24 h-32 text-base",
        lg: "w-40 h-56 text-xl",
        xl: "w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem] text-3xl",
      }[size]
    : {
        sm: "size-10 text-sm",
        md: "size-14 text-base",
        lg: "size-20 text-xl",
        xl: "size-28 text-3xl",
      }[size];

  const shape = isPortrait
    ? "border-2 border-border"
    : "rounded-full border border-border/40";

  const gradient = FIELDS[specialty].gradient;

  if (avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={avatar}
        alt={name}
        className={cn(
          "object-cover shadow-sm shrink-0",
          shape,
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
        "grid place-items-center text-primary-foreground font-bold shadow-sm shrink-0",
        isPortrait ? shape : "rounded-full border border-border/30",
        gradient,
        dims,
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}
