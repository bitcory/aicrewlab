-- orientation: 가로(landscape, 16:9) / 세로(portrait, 9:16 쇼츠)
ALTER TABLE gallery_items ADD COLUMN orientation TEXT NOT NULL DEFAULT 'landscape' CHECK (orientation IN ('landscape', 'portrait'));

-- UP 클래스 여행일기 쇼츠 시드
INSERT OR IGNORE INTO gallery_items (slug, kind, title, description, creator, src, level, stage, sort_order, orientation) VALUES
  ('sujin-cheongdam', 'video', '수진이의 "청담동 동네 마실가기"', '수진이의 여행일기 — UP 클래스에서 만든 AI 쇼츠입니다.', '', 'P1L1_uhURoE', 'up', NULL, 70, 'portrait'),
  ('hyorin-seongsu', 'video', '한국의 명소 "성수동" 여행기', '효린의 여행일기 — UP 클래스에서 만든 AI 쇼츠입니다.', '', 'fRaEqWC5uhA', 'up', NULL, 72, 'portrait'),
  ('jia-myeongdong', 'video', '큐티 지아의 "명동탐험기"', '자이의 여행일기 — UP 클래스에서 만든 AI 쇼츠입니다.', '', 'hB1znNGCMpE', 'up', NULL, 74, 'portrait'),
  ('jia-bali', 'video', '힐링하고 싶은 지아의 발리여행기', '자이의 여행일기 — UP 클래스에서 만든 AI 쇼츠입니다.', '', '5Q7w1lwqu0E', 'up', NULL, 76, 'portrait');
