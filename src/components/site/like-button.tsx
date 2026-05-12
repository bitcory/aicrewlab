"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function LikeButton({
  id,
  initialLikes,
}: {
  id: number;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (liked || isPending) return;
    startTransition(async () => {
      try {
        const res = await fetch(`/api/gallery/${id}/like`, { method: "POST" });
        if (!res.ok) return;
        const data = (await res.json()) as { likes: number; already: boolean };
        setLikes(data.likes);
        setLiked(true);
      } catch {
        // 무시 — UI 상태 그대로
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={liked || isPending}
      aria-pressed={liked}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-colors",
        liked
          ? "border-red-500/50 bg-red-500/10 text-red-500"
          : "border-border bg-background hover:border-red-500/40 hover:text-red-500",
        isPending && "opacity-60",
      )}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
      <span className="tabular-nums">{likes}</span>
    </button>
  );
}
