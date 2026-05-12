-- gallery_items: 영상/이미지 통합 테이블
CREATE TABLE IF NOT EXISTS gallery_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL CHECK (kind IN ('video', 'image')),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  creator TEXT NOT NULL DEFAULT '',
  -- video: youtubeId 또는 영상 URL / image: 이미지 URL
  src TEXT NOT NULL,
  level TEXT CHECK (level IN ('zero', 'up', 'pro')) DEFAULT NULL,
  stage TEXT DEFAULT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_gallery_kind ON gallery_items(kind);
CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery_items(sort_order);
