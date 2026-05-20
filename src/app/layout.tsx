import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import Link from 'next/link';
import { Music } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: '声乐性格测试 | 解锁你的专属演唱人格',
  description:
    '参考MBTI四维度划分逻辑，结合中老年人声乐学习场景精心设计20道测试题，最终将你的声乐性格划分为8种独特类型。',
  keywords: ['MBTI', '声乐性格测试', '演唱人格', '性格测试', '音乐推荐'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground font-sans antialiased">
        {isDev && <Inspector />}
        <header className="bg-card sticky top-0 z-40 h-14 sm:h-[72px] flex items-center justify-between border-b border-outline-variant/20">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Music className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              <span className="font-serif font-bold text-base sm:text-xl text-foreground">声乐性格测试</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link href="/" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                首页
              </Link>
              <Link href="/test" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                开始测试
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
