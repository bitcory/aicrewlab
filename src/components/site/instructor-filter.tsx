"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Instructor } from "#content";
import { FIELDS, type Specialty } from "@/lib/fields";
import { InstructorCard } from "@/components/site/instructor-card";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ value: "all" | Specialty; label: string }> = [
  { value: "all", label: "전체" },
  { value: "coding", label: FIELDS.coding.label },
  { value: "video", label: FIELDS.video.label },
  { value: "music", label: FIELDS.music.label },
];

export function InstructorFilter({ all }: { all: Instructor[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const raw = params.get("field");
  const active = (FILTERS.find((f) => f.value === raw)?.value ?? "all") as
    | "all"
    | Specialty;

  const list = useMemo(() => {
    const filtered =
      active === "all" ? all : all.filter((i) => i.specialty === active);
    return filtered.sort((a, b) => a.order - b.order);
  }, [active, all]);

  const setActive = (value: "all" | Specialty) => {
    const sp = new URLSearchParams(params);
    if (value === "all") sp.delete("field");
    else sp.set("field", value);
    const q = sp.toString();
    router.replace(`${pathname}${q ? `?${q}` : ""}`, { scroll: false });
  };

  return (
    <>
      <div
        role="tablist"
        className="flex flex-wrap items-center gap-px mb-10 border-2 border-border self-start w-fit"
      >
        {FILTERS.map((f) => {
          const count =
            f.value === "all"
              ? all.length
              : all.filter((i) => i.specialty === f.value).length;
          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={active === f.value}
              onClick={() => setActive(f.value)}
              className={cn(
                "px-5 py-3 text-base font-semibold tracking-tight transition-colors inline-flex items-center gap-2.5",
                active === f.value
                  ? "bg-foreground text-background"
                  : "bg-background hover:bg-muted/60 text-foreground/70 hover:text-foreground",
              )}
            >
              <span>{f.label}</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  active === f.value ? "opacity-80" : "text-muted-foreground",
                )}
              >
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center text-base">
          해당 분야의 강사 정보를 곧 추가합니다.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((instructor) => (
            <InstructorCard key={instructor.slug} instructor={instructor} />
          ))}
        </div>
      )}
    </>
  );
}
