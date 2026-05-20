'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, Eye, Scale, Clock, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { questions, calculateMBTI } from '@/lib/mbti-data';

const dimensionIcons: Record<string, React.ElementType> = {
  EI: Compass,
  SN: Eye,
  TF: Scale,
  JP: Clock,
};

export default function TestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const DimensionIcon = dimensionIcons[q.dimension] || Compass;
  const isAnswered = answers[q.id] !== undefined;
  const isLast = currentQuestion === questions.length - 1;
  const allAnswered = Object.keys(answers).length === questions.length;

  const handleAnswer = useCallback((option: 'A' | 'B') => {
    if (isAnimating) return;
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    if (!isLast) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 400);
    }
  }, [answers, q.id, isLast, isAnimating]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(index);
        setIsAnimating(false);
      }, 200);
    }
  }, []);

  const handleFinish = useCallback(() => {
    const result = calculateMBTI(answers);
    localStorage.setItem('vpt_result', JSON.stringify(result));
    router.push('/result');
  }, [answers, router]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">声乐性格测试</h1>
        <p className="text-muted-foreground text-sm">探索你的演唱性格类型，发现属于你的声乐之路</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">题目 {currentQuestion + 1} / {questions.length}</span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Dimension Badge */}
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          <DimensionIcon className="w-3.5 h-3.5 mr-1.5" />
          {q.dimensionLabel}
        </span>
      </div>

      {/* Question Card */}
      <div className={`relative min-h-[320px] transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-card rounded-xl shadow-card p-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              {currentQuestion + 1}
            </span>
            <h2 className="font-serif text-xl font-semibold text-foreground leading-relaxed">{q.text}</h2>
          </div>
          <div className="space-y-4 max-w-lg mx-auto">
            {/* Option A */}
            <button
              onClick={() => handleAnswer('A')}
              className={`w-full text-left border-2 rounded-xl p-5 flex items-start gap-4 transition-all duration-200 cursor-pointer
                ${answers[q.id] === 'A'
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant/30 bg-card hover:border-primary hover:shadow-md'
                }`}
            >
              <span className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200
                ${answers[q.id] === 'A'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-outline text-muted-foreground'
                }`}
              >
                A
              </span>
              <span className="text-foreground text-sm leading-relaxed pt-1">{q.optionA}</span>
            </button>
            {/* Option B */}
            <button
              onClick={() => handleAnswer('B')}
              className={`w-full text-left border-2 rounded-xl p-5 flex items-start gap-4 transition-all duration-200 cursor-pointer
                ${answers[q.id] === 'B'
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant/30 bg-card hover:border-primary hover:shadow-md'
                }`}
            >
              <span className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200
                ${answers[q.id] === 'B'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-outline text-muted-foreground'
                }`}
              >
                B
              </span>
              <span className="text-foreground text-sm leading-relaxed pt-1">{q.optionB}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 max-w-lg mx-auto">
        <button
          onClick={() => goToQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          上一题
        </button>

        {isLast && allAnswered ? (
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-float cursor-pointer"
          >
            <Play className="w-4 h-4" />
            查看结果
          </button>
        ) : (
          <button
            onClick={() => goToQuestion(currentQuestion + 1)}
            disabled={currentQuestion === questions.length - 1 || !isAnswered}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            下一题
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToQuestion(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer
              ${idx === currentQuestion ? 'bg-primary scale-125' : answers[questions[idx].id] ? 'bg-primary/40' : 'bg-outline-variant/40'}
            `}
          />
        ))}
      </div>
    </main>
  );
}
