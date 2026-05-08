import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "단색배경 제너레이터 - 쉽고 빠른 배경색 및 텍스트 짤 만들기",
  description: "원하는 색상과 비율, 텍스트를 입력하여 고화질 단색 배경 이미지를 즉시 생성하고 다운로드하세요. 인스타그램, 유튜브 썸네일, 카카오톡 프사 배경 등에 최적화되어 있습니다.",
  keywords: ["단색배경", "배경 제너레이터", "텍스트 짤", "썸네일 만들기", "인스타그램 배경", "배경화면 만들기", "컬러 배경"],
  openGraph: {
    title: "단색배경 제너레이터",
    description: "원하는 색상과 텍스트로 고화질 배경 이미지를 1초 만에 완성하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "단색배경 제너레이터",
    description: "원하는 색상과 텍스트로 고화질 배경 이미지를 1초 만에 완성하세요.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
