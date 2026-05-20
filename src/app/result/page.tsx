'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Music, RefreshCw, Share2, ArrowLeft } from 'lucide-react';
import { mbtiTypes, type MBTIType } from '@/lib/mbti-data';

interface TestResult {
  type: string;
  scores: { EI: number; SN: number; TF: number; JP: number };
}

const defaultResult: TestResult = {
  type: 'ESFJ',
  scores: { EI: 3, SN: 3, TF: 2, JP: 4 },
};

function RadarChart({ scores }: { scores: { EI: number; SN: number; TF: number; JP: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const size = 320;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = 120;
    const levels = 5;

    // 4 axes: E, S, T, J (each 0-5)
    const labels = ['外倾 E', '实感 S', '理性 T', '判断 J'];
    const values = [scores.EI / 5, scores.SN / 5, scores.TF / 5, scores.JP / 5];
    const numAxes = 4;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw grid
    for (let l = 1; l <= levels; l++) {
      const r = (maxR * l) / levels;
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = l === levels ? '#C8BFA8' : '#DDD6C4';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
      ctx.strokeStyle = '#DDD6C4';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw data
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const r = maxR * values[i];
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(185, 151, 91, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#B9975B';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw data points
    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const r = maxR * values[i];
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#B9975B';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    }

    // Draw labels
    ctx.font = '13px "Georgia", serif';
    ctx.fillStyle = '#1B1712';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const labelR = maxR + 30;
      const x = cx + labelR * Math.cos(angle);
      const y = cy + labelR * Math.sin(angle);
      ctx.fillText(labels[i], x, y);
    }
  }, [scores]);

  return <canvas ref={canvasRef} className="mx-auto" />;
}

function ScoreBar({ leftLabel, rightLabel, leftScore, rightScore }: {
  leftLabel: string; rightLabel: string; leftScore: number; rightScore: number;
}) {
  const total = leftScore + rightScore;
  const leftPercent = total > 0 ? (leftScore / 5) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-primary w-6 text-right">{leftLabel}</span>
      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden relative">
        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${leftPercent}%` }} />
      </div>
      <span className="text-xs font-semibold text-muted-foreground w-6">{rightLabel}</span>
    </div>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<TestResult>(defaultResult);
  const [mbtiType, setMbtiType] = useState<MBTIType>(mbtiTypes['ESFJ']);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </main>
    );
  }

  const handleShare = async () => {
    const text = `我的声乐人格类型是 ${mbtiType.code} ${mbtiType.name}！快来测测你的专属演唱人格吧～`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert('分享文案已复制到剪贴板！');
      } catch {
        // fallback
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Result Header */}
      <section className="text-center py-10">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">你的声乐人格类型</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-primary tracking-[0.12em] mb-4">{mbtiType.code}</h1>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">{mbtiType.name}</h2>
        <p className="text-base text-muted-foreground">{mbtiType.subtitle}</p>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-10">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50 mx-3" />
        <div className="w-16 h-px bg-primary/30" />
      </div>

      {/* Radar Chart */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl font-bold text-foreground mb-1">性格维度分析</h3>
          <p className="text-sm text-muted-foreground">你的四维度得分分布</p>
        </div>
        <div className="bg-card rounded-xl shadow-card p-6 sm:p-8">
          <RadarChart scores={result.scores} />
          <div className="mt-8 max-w-sm mx-auto space-y-3">
            <ScoreBar leftLabel="E" rightLabel="I" leftScore={result.scores.EI} rightScore={5 - result.scores.EI} />
            <ScoreBar leftLabel="S" rightLabel="N" leftScore={result.scores.SN} rightScore={5 - result.scores.SN} />
            <ScoreBar leftLabel="T" rightLabel="F" leftScore={result.scores.TF} rightScore={5 - result.scores.TF} />
            <ScoreBar leftLabel="J" rightLabel="P" leftScore={result.scores.JP} rightScore={5 - result.scores.JP} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-10">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50 mx-3" />
        <div className="w-16 h-px bg-primary/30" />
      </div>

      {/* Type Analysis */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl font-bold text-foreground mb-1">类型解析</h3>
          <p className="text-sm text-muted-foreground">了解你的声乐性格优势与成长空间</p>
        </div>
        <div className="bg-card rounded-xl shadow-card p-6 sm:p-8">
          <p className="text-foreground text-sm leading-relaxed mb-6">{mbtiType.coreTrait}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                优势
              </h4>
              <ul className="space-y-2">
                {mbtiType.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                成长空间
              </h4>
              <ul className="space-y-2">
                {mbtiType.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-10">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50 mx-3" />
        <div className="w-16 h-px bg-primary/30" />
      </div>

      {/* Music Recommendations */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl font-bold text-foreground mb-1">适配歌曲推荐</h3>
          <p className="text-sm text-muted-foreground">根据你的声乐性格，为你精选以下曲目</p>
        </div>
        <div className="space-y-4">
          {mbtiType.songs.map((song, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-5 flex items-start gap-4 border border-outline-variant/15 hover:shadow-float transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif font-semibold text-foreground text-sm">{song.name}</span>
                  <span className="text-xs text-muted-foreground">— {song.artist}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{song.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center mb-10">
        <div className="w-16 h-px bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50 mx-3" />
        <div className="w-16 h-px bg-primary/30" />
      </div>

      {/* Suggestions */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl font-bold text-foreground mb-1">延伸建议</h3>
        </div>
        <div className="bg-card rounded-xl shadow-card p-6 sm:p-8 space-y-4">
          {[
            '本测试仅为声乐性格参考，不代表演唱能力的高低。每种性格都有其独特的演唱优势，无需刻意模仿他人风格。',
            '可根据自己的声乐性格针对性提升：外倾型可加强情感细腻度，内倾型可尝试参与小型合唱，理性型可多注重情感表达，感性型可学习基础演唱技巧。',
            '建议结合自身喜好，多演唱经典老歌，既能丰富晚年生活，也能通过唱歌锻炼身体、结交志同道合的歌友。',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <section className="text-center py-8 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float"
          >
            <RefreshCw className="w-4 h-4" />
            重新测试
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            分享结果
          </button>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          返回首页
        </Link>
      </section>
    </main>
  );
}
