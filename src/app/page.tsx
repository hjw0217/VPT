import Link from 'next/link';
import { Music2, ListOrdered, Layers, Sparkles, Zap, Eye, Heart, Compass, Play } from 'lucide-react';

const dimensions = [
  { icon: Zap, name: '演唱动力源', tag: 'E 外倾 / I 内倾', desc: '你的演唱能量来自何处？是在群体合唱中汲取力量，还是于独处吟唱时找回自我？' },
  { icon: Eye, name: '演唱表达偏好', tag: 'S 实感 / N 直觉', desc: '你更注重乐谱的精准呈现，还是追求意境的自由表达？实感型重细节，直觉型重感受。' },
  { icon: Heart, name: '演唱决策方式', tag: 'T 理性 / F 感性', desc: '面对演唱技巧的选择时，你倾向于理性分析发声方法，还是感性跟随内心情感？' },
  { icon: Compass, name: '演唱习惯', tag: 'J 判断 / P 感知', desc: '你喜欢提前规划练习曲目和进度，还是随兴所至、顺其自然地享受每一次演唱？' },
];

const types = [
  { code: 'E-S-T-J', name: '合唱领唱者', desc: '天生的舞台焦点，以理性与热情引领群体共鸣' },
  { code: 'E-S-F-J', name: '温情传唱者', desc: '以温暖嗓音连接每一位听众的心灵' },
  { code: 'E-N-T-J', name: '经典创新者', desc: '以远见与魄力突破传统，赋予经典全新生命力' },
  { code: 'E-N-F-J', name: '韵味歌者', desc: '以直觉感受旋律，用情感感染每一位听众' },
  { code: 'I-S-T-J', name: '精益演唱者', desc: '沉静专注，以匠心打磨每一个音符与气息' },
  { code: 'I-S-F-J', name: '治愈传唱者', desc: '内敛温柔，以真挚演唱抚慰人心' },
  { code: 'I-N-T-P', name: '小众怀旧者', desc: '独到的审美眼光，在旧曲中发现被忽略的美' },
  { code: 'I-N-F-P', name: '情怀吟唱者', desc: '以诗意与深情吟唱，用歌声书写内心独白' },
];

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="mb-6">
          <Music2 className="w-12 h-12 text-primary mx-auto mb-6" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-wide">声乐性格测试</h1>
        <p className="font-serif text-xl text-primary mb-8 tracking-wider">解锁你的专属演唱人格</p>
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            参考MBTI四维度划分逻辑，结合中老年人声乐学习场景精心设计20道测试题，最终将你的声乐性格划分为8种独特类型。发现你在演唱中的内在驱动力与表达方式，开启一段专属于你的声乐之旅。
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><ListOrdered className="w-3.5 h-3.5" />20道精选题目</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" />4大维度测评</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />8种人格类型</span>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-12">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50 mx-3" />
        <div className="w-16 h-px bg-primary/30" />
      </div>

      {/* Dimensions Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">测评维度</h2>
          <p className="text-sm text-muted-foreground">从四个核心维度解读你的声乐性格</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            return (
              <div key={dim.name} className="bg-card rounded-lg shadow-card p-6 border-t-2 border-primary/40">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-foreground mb-1">{dim.name}</h3>
                    <p className="text-xs text-primary font-medium mb-2">{dim.tag}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{dim.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-12">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50 mx-3" />
        <div className="w-16 h-px bg-primary/30" />
      </div>

      {/* 8 Types Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">八种声乐人格</h2>
          <p className="text-sm text-muted-foreground">四维度组合，形成你独一无二的演唱人格</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map((t) => (
            <div key={t.code} className="bg-card rounded-lg shadow-card p-5 border border-outline-variant/15">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif text-sm font-bold text-primary tracking-wider">{t.code}</span>
                <span className="w-px h-3.5 bg-outline-variant/30" />
                <span className="font-serif text-sm font-semibold text-foreground">{t.name}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <div className="max-w-md mx-auto">
          <p className="font-serif text-lg text-foreground mb-6">准备好了吗？</p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-10 py-3.5 rounded-lg text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float"
          >
            <Play className="w-4 h-4" />
            开始测试
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">约5分钟 · 20道题目 · 即时获取结果</p>
        </div>
      </section>
    </main>
  );
}
