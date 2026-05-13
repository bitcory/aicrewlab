"use client";

import { useRef, useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "uploading" }
  | { kind: "error"; message: string };

export function ImageUploadField({
  name,
  defaultValue,
  hint,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  hint: string;
  placeholder: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setStatus({ kind: "uploading" });
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { url: string };
      setValue(data.url);
      setStatus({ kind: "idle" });
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "업로드 실패",
      });
    }
  }

  return (
    <div className="space-y-2">
      <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {hint}
      </span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        placeholder={placeholder}
        className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-2.5 text-base outline-none font-mono text-sm"
      />
      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={status.kind === "uploading"}
          className="font-mono text-xs uppercase tracking-[0.2em] border-2 border-border hover:border-foreground px-3 py-1.5 disabled:opacity-50"
        >
          {status.kind === "uploading" ? "업로드 중…" : "이미지 파일 업로드"}
        </button>
        {status.kind === "error" && (
          <span className="text-xs text-red-500">에러: {status.message}</span>
        )}
        {value.startsWith("/img/") && status.kind === "idle" && (
          <span className="text-xs text-emerald-500">업로드 완료</span>
        )}
      </div>
    </div>
  );
}
