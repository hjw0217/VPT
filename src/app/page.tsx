import Link from 'next/link';
import { Music2, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-8 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <Music2 className="w-16 h-16 sm:w-20 sm:h-20 text-primary mx-auto mb-8 sm:mb-10" />
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mb-4 sm:mb-5 tracking-wide">声乐性格测试</h1>
        <p className="font-serif text-xl sm:text-2xl text-primary mb-6 sm:mb-8 tracking-wider">解锁你的专属演唱人格</p>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed sm:leading-loose max-w-lg mx-auto mb-10 sm:mb-12">
          通过20道题目，发现你的声乐性格类型，获取专属演唱建议和歌曲推荐。
        </p>
        <Link
          href="/test"
          className="inline-flex items-center gap-2.5 sm:gap-3 bg-primary text-primary-foreground px-10 sm:px-14 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6" />
          开始测试
        </Link>
        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-muted-foreground">约5分钟 · 20道题目 · 即时获取结果</p>
      </div>
    </main>
  );
}
