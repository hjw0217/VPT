'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { CheckCircle, AlertTriangle, Music, RefreshCw, Share2, Download, ArrowLeft, Mic2, Music2, Ear, Heart } from 'lucide-react';
import { mbtiTypes, type MBTIType } from '@/lib/mbti-data';

interface TestResult {
  type: string;
  scores: { EI: number; SN: number; TF: number; JP: number };
}

const defaultResult: TestResult = {
  type: 'ESFJ',
  scores: { EI: 3, SN: 3, TF: 2, JP: 4 },
};

// 维度标签映射
const dimensionLabels: Record<string, { label: string; icon: string; letterA: string; letterB: string; nameA: string; nameB: string }> = {
  EI: { label: '演唱动力源', icon: 'mic', letterA: 'E', letterB: 'I', nameA: '外倾', nameB: '内倾' },
  SN: { label: '演唱表达', icon: 'ear', letterA: 'S', letterB: 'N', nameA: '实感', nameB: '直觉' },
  TF: { label: '演唱决策', icon: 'heart', letterA: 'T', letterB: 'F', nameA: '理性', nameB: '感性' },
  JP: { label: '演唱习惯', icon: 'music', letterA: 'J', letterB: 'P', nameA: '判断', nameB: '感知' },
};

function DimensionIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case 'mic': return <Mic2 className={className} />;
    case 'ear': return <Ear className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'music': return <Music2 className={className} />;
    default: return <Mic2 className={className} />;
  }
}

function TypeBadge({ mbtiType, scores }: { mbtiType: MBTIType; scores: { EI: number; SN: number; TF: number; JP: number } }) {
  const dims = ['EI', 'SN', 'TF', 'JP'] as const;
  const dominantLetters = mbtiType.code.replace(/-/g, '');

  return (
    <div className="relative flex flex-col items-center">
      {/* 外圈装饰环 */}
      <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* 最外层 - 虚线圆环 */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20" />
        {/* 主圆环 */}
        <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-primary/40" />
        {/* 内圆背景 */}
        <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-b from-primary/[0.08] to-primary/[0.03]" />
        {/* 顶部小装饰 */}
        <div className="absolute -top-1 sm:top-0 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/60" />
        </div>
        {/* 底部小装饰 */}
        <div className="absolute -bottom-1 sm:bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/60" />
        </div>

        {/* 中心内容 */}
        <div className="relative z-10 text-center">
          <div className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-[0.15em] mb-1">
            {mbtiType.code}
          </div>
          <div className="w-10 sm:w-12 h-px bg-primary/40 mx-auto mb-1.5 sm:mb-2" />
          <div className="font-serif text-lg sm:text-xl font-bold text-foreground mb-0.5">
            {mbtiType.name}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground max-w-[120px] sm:max-w-[150px] leading-snug">
            {mbtiType.subtitle}
          </div>
        </div>

        {/* 四个维度标签 - 分布在圆环四周 */}
        {dims.map((dim, i) => {
          const dimInfo = dimensionLabels[dim];
          const score = scores[dim];
          const isA = score >= 3;
          const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
          const radius = 100; // sm 下会通过 scale 调整
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const activeLetter = isA ? dimInfo.letterA : dimInfo.letterB;
          const activeName = isA ? dimInfo.nameA : dimInfo.nameB;

          return (
            <div
              key={dim}
              className="absolute flex flex-col items-center gap-0.5"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-card shadow-card border border-primary/20 flex items-center justify-center">
                <DimensionIcon icon={dimInfo.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-primary">{activeLetter}</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-none">{activeName}</span>
            </div>
          );
        })}
      </div>

      {/* 四维度得分条 */}
      <div className="mt-6 sm:mt-8 w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4">
        {dims.map((dim) => {
          const dimInfo = dimensionLabels[dim];
          const score = scores[dim];
          const isA = score >= 3;
          const leftPercent = (score / 5) * 100;

          return (
            <div key={dim} className="flex items-center gap-2.5 sm:gap-3">
              <span className={`text-sm sm:text-base font-bold w-5 sm:w-6 text-right ${isA ? 'text-primary' : 'text-muted-foreground'}`}>{dimInfo.letterA}</span>
              <div className="flex-1 h-2.5 sm:h-3 bg-muted rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${leftPercent}%`,
                    background: isA ? 'linear-gradient(90deg, rgba(185,151,91,0.5), rgba(185,151,91,0.9))' : 'linear-gradient(90deg, rgba(123,113,100,0.3), rgba(123,113,100,0.6))',
                  }}
                />
              </div>
              <span className={`text-sm sm:text-base font-bold w-5 sm:w-6 ${!isA ? 'text-primary' : 'text-muted-foreground'}`}>{dimInfo.letterB}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<TestResult>(defaultResult);
  const [mbtiType, setMbtiType] = useState<MBTIType>(mbtiTypes['ESFJ']);
  const [mounted, setMounted] = useState(false);
  const [sharing, setSharing] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vpt_result');
      if (stored) {
        const parsed = JSON.parse(stored) as TestResult;
        setResult(parsed);
        const typeData = mbtiTypes[parsed.type];
        if (typeData) setMbtiType(typeData);
      }
    } catch {
      // use default
    }
    setMounted(true);
  }, []);

  const handleShareImage = async () => {
    if (!shareCardRef.current || sharing) return;
    setSharing(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: '#F8F4EC',
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `声乐性格测试_${mbtiType.code}_${mbtiType.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      const text = `我的声乐人格类型是 ${mbtiType.code} ${mbtiType.name}！快来测测你的专属演唱人格吧～`;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(text);
          alert('分享文案已复制到剪贴板！');
        } catch {
          // silent
        }
      }
    } finally {
      setSharing(false);
    }
  };

  const handleCopyImage = async () => {
    if (!shareCardRef.current || sharing) return;
    setSharing(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: '#F8F4EC',
        useCORS: true,
        logging: false,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          alert('结果图片已复制到剪贴板，可直接粘贴分享！');
        } catch {
          const link = document.createElement('a');
          link.download = `声乐性格测试_${mbtiType.code}_${mbtiType.name}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      }, 'image/png');
    } catch {
      // silent
    } finally {
      setSharing(false);
    }
  };

  if (!mounted) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center py-20">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </main>
    );
  }

  const dims = ['EI', 'SN', 'TF', 'JP'] as const;
  const dimLabels = {
    EI: { letterA: 'E', letterB: 'I', nameA: '外倾', nameB: '内倾' },
    SN: { letterA: 'S', letterB: 'N', nameA: '实感', nameB: '直觉' },
    TF: { letterA: 'T', letterB: 'F', nameA: '理性', nameB: '感性' },
    JP: { letterA: 'J', letterB: 'P', nameA: '判断', nameB: '感知' },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Share Card - hidden visual, used for image capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={shareCardRef} style={{ width: 420, padding: 40, background: '#F8F4EC', fontFamily: 'Georgia, serif' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 14, color: '#7B7164', letterSpacing: 6, marginBottom: 12, textTransform: 'uppercase' }}>声乐性格测试</div>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#B9975B', letterSpacing: 8, marginBottom: 8 }}>{mbtiType.code}</div>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1B1712', marginBottom: 6 }}>{mbtiType.name}</div>
            <div style={{ fontSize: 15, color: '#7B7164' }}>{mbtiType.subtitle}</div>
          </div>
          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(185,151,91,0.3)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(185,151,91,0.5)', margin: '0 10px' }} />
            <div style={{ width: 40, height: 1, background: 'rgba(185,151,91,0.3)' }} />
          </div>
          {/* Core trait */}
          <div style={{ textAlign: 'center', fontSize: 15, color: '#1B1712', lineHeight: 1.8, marginBottom: 24, padding: '0 16px' }}>{mbtiType.coreTrait}</div>
          {/* Dimension bars */}
          <div style={{ marginBottom: 24 }}>
            {dims.map((dim) => {
              const info = dimLabels[dim];
              const score = result.scores[dim];
              const isA = score >= 3;
              const leftPercent = (score / 5) * 100;
              return (
                <div key={dim} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 'bold', width: 18, textAlign: 'right', color: isA ? '#B9975B' : '#7B7164' }}>{info.letterA}</span>
                  <div style={{ flex: 1, height: 8, background: '#E8E2D6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${leftPercent}%`, background: isA ? 'linear-gradient(90deg, rgba(185,151,91,0.5), rgba(185,151,91,0.9))' : 'linear-gradient(90deg, rgba(123,113,100,0.3), rgba(123,113,100,0.6))', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 'bold', width: 18, color: !isA ? '#B9975B' : '#7B7164' }}>{info.letterB}</span>
                </div>
              );
            })}
          </div>
          {/* Strengths & Weaknesses */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 'bold', color: '#1B1712', marginBottom: 8 }}>优势</div>
              {mbtiType.strengths.map((s: string, i: number) => (
                <div key={i} style={{ fontSize: 13, color: '#7B7164', lineHeight: 1.7, marginBottom: 4, paddingLeft: 10, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 4, height: 4, borderRadius: '50%', background: '#B9975B' }} />
                  {s}
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 'bold', color: '#1B1712', marginBottom: 8 }}>成长空间</div>
              {mbtiType.weaknesses.map((w: string, i: number) => (
                <div key={i} style={{ fontSize: 13, color: '#7B7164', lineHeight: 1.7, marginBottom: 4, paddingLeft: 10, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 4, height: 4, borderRadius: '50%', background: '#7B7164' }} />
                  {w}
                </div>
              ))}
            </div>
          </div>
          {/* Songs */}
          <div style={{ borderTop: '1px solid rgba(185,151,91,0.2)', paddingTop: 20 }}>
            <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#1B1712', marginBottom: 12 }}>适配歌曲</div>
            {mbtiType.songs.map((song: { name: string; artist: string }, i: number) => (
              <div key={i} style={{ fontSize: 14, color: '#1B1712', textAlign: 'center', marginBottom: 4 }}>
                {song.name} — {song.artist}
              </div>
            ))}
          </div>
          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(185,151,91,0.2)' }}>
            <div style={{ fontSize: 11, color: '#7B7164' }}>扫码或搜索「声乐性格测试」开始你的专属测评</div>
          </div>
        </div>
      </div>

      {/* Result Header */}
      <section className="text-center py-8 sm:py-12">
        <p className="text-sm sm:text-base font-medium text-muted-foreground tracking-widest uppercase mb-3 sm:mb-4">你的声乐人格类型</p>
        <h1 className="font-serif text-4xl sm:text-6xl sm:text-7xl font-bold text-primary tracking-[0.08em] sm:tracking-[0.12em] mb-4 sm:mb-5">{mbtiType.code}</h1>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">{mbtiType.name}</h2>
        <p className="text-base sm:text-lg text-muted-foreground">{mbtiType.subtitle}</p>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary/50 mx-2 sm:mx-3" />
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
      </div>

      {/* Type Badge / Emblem */}
      <section className="mb-8 sm:mb-12">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">性格徽标</h3>
          <p className="text-sm sm:text-base text-muted-foreground">你的声乐性格四维度标识</p>
        </div>
        <div className="bg-card rounded-2xl shadow-card p-5 sm:p-8 flex flex-col items-center">
          <TypeBadge mbtiType={mbtiType} scores={result.scores} />
        </div>
      </section>

      {/* Share Actions */}
      <section className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <button
            onClick={handleCopyImage}
            disabled={sharing}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-primary text-primary-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float disabled:opacity-60 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            {sharing ? '生成中...' : '分享结果图片'}
          </button>
          <button
            onClick={handleShareImage}
            disabled={sharing}
            className="inline-flex items-center gap-2 sm:gap-2.5 border-2 border-primary text-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-60 w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            保存图片
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-foreground text-background px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            重新测试
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            返回首页
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary/50 mx-2 sm:mx-3" />
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
      </div>

      {/* Type Analysis */}
      <section className="mb-8 sm:mb-12">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">类型解析</h3>
          <p className="text-sm sm:text-base text-muted-foreground">了解你的声乐性格优势与成长空间</p>
        </div>
        <div className="bg-card rounded-2xl shadow-card p-5 sm:p-8 sm:p-10">
          <p className="text-foreground text-base sm:text-lg leading-relaxed sm:leading-loose mb-6 sm:mb-8">{mbtiType.coreTrait}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                优势
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {mbtiType.strengths.map((s, i) => (
                  <li key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose flex items-start gap-2.5 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 sm:mt-2.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                成长空间
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {mbtiType.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose flex items-start gap-2.5 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 sm:mt-2.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary/50 mx-2 sm:mx-3" />
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
      </div>

      {/* Music Recommendations */}
      <section className="mb-8 sm:mb-12">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">适配歌曲推荐</h3>
          <p className="text-sm sm:text-base text-muted-foreground">根据你的声乐性格，为你精选以下曲目</p>
        </div>
        <div className="space-y-4 sm:space-y-5">
          {mbtiType.songs.map((song, i) => (
            <div key={i} className="bg-card rounded-2xl shadow-card p-4 sm:p-6 flex items-start gap-3 sm:gap-5 border border-outline-variant/15 hover:shadow-float transition-shadow">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <span className="font-serif font-bold text-foreground text-base sm:text-lg">{song.name}</span>
                  <span className="text-sm sm:text-base text-muted-foreground">— {song.artist}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose">{song.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary/50 mx-2 sm:mx-3" />
        <div className="w-12 sm:w-16 h-px bg-primary/30" />
      </div>

      {/* Suggestions */}
      <section className="mb-8 sm:mb-12">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">延伸建议</h3>
        </div>
        <div className="bg-card rounded-2xl shadow-card p-5 sm:p-8 sm:p-10 space-y-4 sm:space-y-6">
          {[
            '本测试仅为声乐性格参考，不代表演唱能力的高低。每种性格都有其独特的演唱优势，无需刻意模仿他人风格。',
            '可根据自己的声乐性格针对性提升：外倾型可加强情感细腻度，内倾型可尝试参与小型合唱，理性型可多注重情感表达，感性型可学习基础演唱技巧。',
            '建议结合自身喜好，多演唱经典老歌，既能丰富晚年生活，也能通过唱歌锻炼身体、结交志同道合的歌友。',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3 sm:gap-4">
              <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
