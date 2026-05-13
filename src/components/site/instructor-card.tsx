import Link from "next/link";
import type { Instructor } from "#content";
import { AvatarBlock } from "@/components/site/avatar-block";
import { FieldBadge } from "@/components/site/field-badge";
import { ClassBadges } from "@/components/site/class-badges";
import { ArrowUpRight } from "lucide-react";
import { FIELDS } from "@/lib/fields";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const field = FIELDS[instructor.specialty];
  return (
    <Link
      href={instructor.permalink}
      className="group relative block border-2 border-border hover:border-foreground/40 bg-background hover:bg-muted/20 transition-colors p-6 sm:p-8 overflow-hidden"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-12 -right-12 size-32 rounded-full opacity-15 group-hover:opacity-40 transition-opacity ${field.gradient} blur-3xl`}
      />

      <div className="relative flex gap-5 sm:gap-6">
        <AvatarBlock
          name={instructor.name}
          specialty={instructor.specialty}
          avatar={instructor.avatar}
          size="lg"
          variant="portrait"
        />

        <div className="flex-1 flex flex-col min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <FieldBadge specialty={instructor.specialty} />
              <ClassBadges classes={instructor.classes} />
            </div>
            <ArrowUpRight className="shrink-0 size-5 text-muted-foreground transition group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] leading-[0.95]">
            {instructor.name}
          </h3>
          <p className="text-sm font-semibold text-foreground/70">
            {instructor.role}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 pt-1">
            {instructor.headline}
          </p>
        </div>
      </div>
    </Link>
  );
}
