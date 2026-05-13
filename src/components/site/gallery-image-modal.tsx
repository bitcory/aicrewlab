"use client";

import { Dialog } from "radix-ui";
import { Copy, Check, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/db";

type CopyState = "idle" | "ok" | "err";

async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

async function copyImageAsPng(url: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");
  ctx.drawImage(bitmap, 0, 0);
  const pngBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/png",
    );
  });
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": pngBlob }),
  ]);
}

export function GalleryImageModal({
  item,
  children,
}: {
  item: GalleryItem;
  children: React.ReactNode;
}) {
  const [textCopy, setTextCopy] = useState<CopyState>("idle");
  const [imgCopy, setImgCopy] = useState<CopyState>("idle");

  async function onCopyText() {
    try {
      await copyText(item.description);
      setTextCopy("ok");
      setTimeout(() => setTextCopy("idle"), 1500);
    } catch {
      setTextCopy("err");
      setTimeout(() => setTextCopy("idle"), 2000);
    }
  }

  async function onCopyImage() {
    try {
      await copyImageAsPng(item.src);
      setImgCopy("ok");
      setTimeout(() => setImgCopy("idle"), 1500);
    } catch {
      setImgCopy("err");
      setTimeout(() => setImgCopy("idle"), 2000);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid w-[96vw] max-w-7xl max-h-[95vh] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] overflow-hidden border-2 border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b-2 border-border px-6 py-4">
            <Dialog.Title className="text-lg sm:text-xl font-black tracking-[-0.02em] leading-tight pr-4">
              {item.title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="닫기"
              className="shrink-0 p-2 hover:bg-muted/60"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <div className="grid gap-0 overflow-auto md:grid-cols-[2fr_1fr]">
            <div className="bg-black p-4 flex items-center justify-center min-h-[55vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                className="max-h-[82vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-4 p-6 border-t-2 md:border-t-0 md:border-l-2 border-border">
              <Dialog.Description asChild>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      프롬프트
                    </span>
                    <CopyButton state={textCopy} onClick={onCopyText} label="복사" />
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 border-2 border-border p-4 max-h-[40vh] overflow-auto font-sans">
                    {item.description || "(프롬프트 없음)"}
                  </pre>
                </div>
              </Dialog.Description>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  이미지
                </span>
                <CopyButton
                  state={imgCopy}
                  onClick={onCopyImage}
                  label="이미지 복사 (PNG)"
                  fullWidth
                />
              </div>

              {item.creator && (
                <div className="pt-2 text-sm font-semibold text-foreground/80">
                  by {item.creator}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CopyButton({
  state,
  onClick,
  label,
  fullWidth,
}: {
  state: CopyState;
  onClick: () => void;
  label: string;
  fullWidth?: boolean;
}) {
  const Icon = state === "ok" ? Check : Copy;
  const text =
    state === "ok" ? "복사됨" : state === "err" ? "복사 실패" : label;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 border-2 border-border hover:border-foreground px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
        fullWidth && "w-full",
        state === "ok" && "border-emerald-500 text-emerald-500",
        state === "err" && "border-red-500 text-red-500",
      )}
    >
      <Icon className="size-3.5" />
      {text}
    </button>
  );
}
