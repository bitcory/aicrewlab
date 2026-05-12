import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const paperlogy = localFont({
  variable: "--font-paperlogy",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/Paperlogy-1Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-2ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-3Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-4Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-5Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-6SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-7Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-8ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-9Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aicrew.rnpick.com"),
  applicationName: "AICREW 아카데미",
  title: {
    default: "AICREW 아카데미 | AI로 만들고, AI로 성장합니다",
    template: "%s | AICREW 아카데미",
  },
  description:
    "AI 코딩, AI 영상제작, AI 음악제작을 실제 결과물로 배우는 크리에이티브 AI 아카데미. 현장에서 활동하는 강사진이 직접 만든 커리큘럼으로 실무 감각을 익히세요.",
  keywords: [
    "AICREW",
    "AICREW 아카데미",
    "AI 아카데미",
    "AI 코딩",
    "AI 영상제작",
    "AI 음악제작",
    "생성형 AI 강의",
    "크리에이티브 AI",
    "2026 봄학기",
  ],
  authors: [{ name: "AICREW Academy" }],
  creator: "AICREW Academy",
  publisher: "AICREW Academy",
  category: "education",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/aicrew-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "AICREW 아카데미 | AI로 만들고, AI로 성장합니다",
    description:
      "AI 코딩, AI 영상제작, AI 음악제작을 실제 결과물로 배우는 크리에이티브 AI 아카데미.",
    url: "/",
    siteName: "AICREW 아카데미",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AICREW 아카데미 - AI로 만들고, AI로 성장합니다",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICREW 아카데미 | AI로 만들고, AI로 성장합니다",
    description:
      "AI 코딩, AI 영상제작, AI 음악제작을 실제 결과물로 배우는 크리에이티브 AI 아카데미.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f10",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${paperlogy.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
