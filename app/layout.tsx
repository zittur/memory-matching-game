import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '记忆翻卡游戏 - 双人对战记忆力挑战',
  description: '一款精美的双人记忆翻卡游戏，挑战你的记忆力！两位玩家轮流翻开卡片寻找匹配对，看谁能找到更多配对。支持自定义玩家名称，实时计分，精美动画效果。',
  keywords: '记忆游戏,翻卡游戏,双人游戏,记忆力训练,卡片匹配,益智游戏,在线游戏,免费游戏',
  authors: [{ name: '记忆翻卡游戏开发团队' }],
  creator: '记忆翻卡游戏',
  publisher: '记忆翻卡游戏',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://memory-matching-game.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '记忆翻卡游戏 - 双人对战记忆力挑战',
    description: '一款精美的双人记忆翻卡游戏，挑战你的记忆力！两位玩家轮流翻开卡片寻找匹配对，看谁能找到更多配对。',
    url: 'https://memory-matching-game.vercel.app',
    siteName: '记忆翻卡游戏',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '记忆翻卡游戏截图',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '记忆翻卡游戏 - 双人对战记忆力挑战',
    description: '一款精美的双人记忆翻卡游戏，挑战你的记忆力！',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
