import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="AICREW 아카데미 홈"
      className={cn(
        "group inline-flex items-center gap-3 tracking-tight",
        className,
      )}
    >
      <Image
        src="/aicrew-logo.png"
        alt=""
        width={48}
        height={48}
        priority
        className="size-12 shrink-0 object-contain dark:invert transition-transform group-hover:scale-105"
      />
      <span className="inline-flex items-baseline gap-2 leading-none">
        <span className="text-2xl font-black">AICREW</span>
        <span className="text-base font-semibold text-muted-foreground">아카데미</span>
      </span>
    </Link>
  );
}
