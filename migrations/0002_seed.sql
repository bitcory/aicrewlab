-- 기존 정적 갤러리 항목 시드
INSERT OR IGNORE INTO gallery_items (slug, kind, title, description, creator, src, level, stage, sort_order) VALUES
  ('fitness-promo', 'video', '헬쓰장 홍보영상', 'PRO 클래스 3단계 "멀티영상 만들기"에서 만든 영상입니다.', '', 'XUPgogriS-8', 'pro', '3단계 · 멀티영상 만들기', 10),
  ('couple', 'video', '연인사이', 'PRO 클래스 3단계 "멀티영상 만들기"에서 만든 영상입니다.', '', 'l5_1EEX750w', 'pro', '3단계 · 멀티영상 만들기', 20),
  ('samurai-yoshiko', 'video', '사무라이 요시꼬', 'PRO 클래스 3단계 "멀티영상 만들기"에서 만든 영상입니다.', '', 'eNPjHBk4rEo', 'pro', '3단계 · 멀티영상 만들기', 30),
  ('ai-creative-companion', 'image', 'AI 크리에이티브 컴패니언', 'ZERO 클래스에서 만든 AI 협업 콘셉트 이미지 예시입니다.', '', '/gallery/ai-creative-companion.png', 'zero', '1단계 · AI 이미지 만들기', 40),
  ('ai-study-planner', 'image', 'AI 학습 플래너 UI', 'UP 클래스에서 만든 AI 서비스 UI 목업 예시입니다.', '', '/gallery/ai-study-planner.png', 'up', '2단계 · 서비스 화면 만들기', 50),
  ('fitness-studio-promo', 'image', '피트니스 스튜디오 프로모션', 'PRO 클래스에서 만든 AI 영상 콘셉트 프레임 예시입니다.', '', '/gallery/fitness-studio-promo.png', 'pro', '3단계 · 캠페인 비주얼 만들기', 60);
