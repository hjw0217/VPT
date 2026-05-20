import Link from 'next/link';
import { Music2, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <Music2 className="w-14 h-14 text-primary mx-auto mb-8" />
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-wide">声乐性格测试</h1>
        <p className="font-serif text-xl text-primary mb-6 tracking-wider">解锁你的专属演唱人格</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
          参考MBTI四维度划分逻辑，结合中老年人声乐学习场景，通过20道题目发现你的声乐性格类型。
        </p>
        <Link
          href="/test"
          className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-10 py-3.5 rounded-lg text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float"
        >
          <Play className="w-4 h-4" />
          开始测试
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">约5分钟 · 20道题目 · 即时获取结果</p>
      </div>
    </main>
  );
}
