import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/db";

type Props = {
  action: (formData: FormData) => Promise<void>;
  initial?: Partial<GalleryItem>;
  submitLabel: string;
};

export function GalleryForm({ action, initial, submitLabel }: Props) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug (URL용, 영문/숫자/-)" name="slug" defaultValue={initial?.slug} required />
        <Field label="정렬 순서 (낮을수록 앞)" name="sort_order" type="number" defaultValue={String(initial?.sort_order ?? 100)} />
      </div>

      <div>
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            종류
          </span>
          <select
            name="kind"
            defaultValue={initial?.kind ?? "image"}
            className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-2.5 text-base outline-none"
          >
            <option value="image">이미지</option>
            <option value="video">영상 (YouTube)</option>
          </select>
        </label>
      </div>

      <Field label="제목" name="title" defaultValue={initial?.title} required />

      <div>
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            설명
          </span>
          <textarea
            name="description"
            rows={3}
            defaultValue={initial?.description ?? ""}
            className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-2.5 text-base outline-none resize-y"
          />
        </label>
      </div>

      <Field
        label="제작자 닉네임 (예: 툴비, 민스)"
        name="creator"
        defaultValue={initial?.creator}
      />

      <div>
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            영상: YouTube ID (예: dQw4w9WgXcQ) · 이미지: 이미지 URL
          </span>
          <input
            type="text"
            name="src"
            defaultValue={initial?.src ?? ""}
            required
            placeholder="XUPgogriS-8 또는 https://example.com/image.jpg"
            className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-2.5 text-base outline-none font-mono text-sm"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              클래스 (선택)
            </span>
            <select
              name="level"
              defaultValue={initial?.level ?? ""}
              className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-2.5 text-base outline-none"
            >
              <option value="">(없음)</option>
              <option value="zero">ZERO</option>
              <option value="up">UP</option>
              <option value="pro">PRO</option>
            </select>
          </label>
        </div>
        <Field
          label="단계 라벨 (예: 3단계 · 멀티영상 만들기)"
          name="stage"
          defaultValue={initial?.stage ?? ""}
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/admin/gallery">취소</Link>
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full bg-muted/30 border-2 border-border focus:border-foreground px-4 py-2.5 text-base outline-none"
      />
    </label>
  );
}
