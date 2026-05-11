import { cn } from "@/lib/utils";
import { SectionLabel } from "./section-label";

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-6",
        align === "center" && "text-center mx-auto",
        className,
      )}
    >
      {label && (
        <SectionLabel
          index={index}
          className={align === "center" ? "justify-center flex" : ""}
        >
          {label}
        </SectionLabel>
      )}
      <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[0.95]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
