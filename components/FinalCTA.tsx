'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { Reveal } from './Section';
import { useApplicationForm } from './FormContext';

const TG = 'https://t.me/nikmorus';

type Ripple = { id: number; x: number; y: number };

/**
 * FINAL CTA
 * — самый сильный подсвеченный экран
 * — массивный ambient breathing glow
 * — центр, много воздуха
 * — 2 CTA: тариф (primary) / telegram (ghost)
 */
export default function FinalCTA() {
  const { openForm } = useApplicationForm();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const onPrimaryClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduce) return;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((x) => x.id !== id));
      }, 620);
    },
    [reduce],
  );

  return (
    <section
      id="final"
      className="relative py-24 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div
        className="glow-orb animate-breathe"
        style={{
          width: 'min(900px, 90vw)',
          height: 'min(900px, 90vw)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.7,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />

      {!reduce && (
        <>
          <div
            className="pointer-events-none absolute left-[38%] top-[42%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          >
            <motion.div
              className="rounded-full bg-accent w-[min(520px,55vw)] h-[min(340px,38vw)] blur-[100px] opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div
            className="pointer-events-none absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          >
            <motion.div
              className="rounded-full bg-accent-deep w-[min(480px,50vw)] h-[min(300px,35vw)] blur-[100px] opacity-25"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </>
      )}

      <div className="relative z-10 max-w-[1000px] mx-auto text-center">
        <Reveal>
          <div className="h-mono mb-6 text-accent-soft">Финальный шаг</div>
          <h2 className="h-display text-[clamp(44px,7vw,92px)] leading-[1.02] mb-8">
            Войди в{' '}
            <span className="italic text-accent-soft">AI-разработку</span>{' '}
            по-взрослому.
          </h2>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Без программирования. Без хаоса. С личным сопровождением — до
            первого результата.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto mb-12 md:mb-14 max-w-[min(1040px,100%)] rounded-2xl bg-white/[0.02] p-2 ring-1 ring-white/[0.07] sm:p-2.5">
            <img
              src="/final-cta/hero.png"
              alt="Иллюстрация: сборка продуктов и данных с помощью ИИ"
              loading="lazy"
              decoding="async"
              className="w-full rounded-[14px] object-contain max-h-[min(48svh,460px)] md:max-h-[min(54svh,520px)] mx-auto"
            />
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div
            ref={wrapRef}
            className="relative flex w-full max-w-[min(1040px,100%)] mx-auto flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
          >
            {ripples.map((r) => (
              <motion.span
                key={r.id}
                className="pointer-events-none absolute rounded-full border border-white/25 bg-white/10"
                style={{ left: r.x, top: r.y, width: 12, height: 12, marginLeft: -6, marginTop: -6 }}
                initial={{ scale: 0.2, opacity: 0.55 }}
                animate={{ scale: 14, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
            ))}
            <a
              href="#pricing"
              className="btn-primary relative z-[1] w-full min-h-[48px] max-w-[320px] justify-center sm:w-auto sm:max-w-none"
              onClick={onPrimaryClick}
            >
              Выбрать тариф
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
            <div className="flex w-full flex-col items-center gap-1.5 relative z-[1]">
              <a
                href={TG}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full max-w-[320px] min-h-[48px] justify-center sm:w-auto sm:max-w-none"
              >
                <Send size={17} strokeWidth={1.8} />
                Написать в Telegram
              </a>
              <span className="text-white/40 text-sm">
                Вопросы — напрямую в ЛС
              </span>
            </div>
          </div>
          <p className="text-white/55 text-[15px] md:text-base mt-8 max-w-lg mx-auto leading-relaxed">
            Или{' '}
            <button
              type="button"
              onClick={() => openForm()}
              className="text-accent-soft underline underline-offset-[5px] decoration-accent-soft/40 hover:text-white hover:decoration-white/50 transition-colors"
            >
              оставь заявку напрямую
            </button>
            {' '}
            — я отвечу в Telegram
          </p>
          <p className="text-white/40 text-sm mt-10 max-w-md mx-auto">
            Мест немного. Это не поток — это работа с сопровождением.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
