import Link from 'next/link';
import { Music2, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <Music2 className="w-20 h-20 text-primary mx-auto mb-10" />
        <h1 className="font-serif text-5xl font-bold text-foreground mb-5 tracking-wide">声乐性格测试</h1>
        <p className="font-serif text-2xl text-primary mb-8 tracking-wider">解锁你的专属演唱人格</p>
        <p className="text-lg text-muted-foreground leading-loose max-w-lg mx-auto mb-12">
          通过20道题目，发现你的声乐性格类型，获取专属演唱建议和歌曲推荐。
        </p>
        <Link
          href="/test"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-14 py-5 rounded-xl text-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float"
        >
          <Play className="w-6 h-6" />
          开始测试
        </Link>
        <p className="mt-6 text-base text-muted-foreground">约5分钟 · 20道题目 · 即时获取结果</p>
      </div>
    </main>
  );
}
