'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowUpRight,
  Banknote,
  Infinity,
  Network,
  TrendingUp,
} from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';

const EASE = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  {
    icon: TrendingUp,
    insight: 'INSIGHT · 02',
    title: 'ИИ растёт по экспоненте',
    body:
      'Инструменты меняются каждый месяц. Но база одна — научились думать через один, переход на следующий займёт вечер. Те, кто войдёт сейчас, будут ехать на этой волне годами. Те, кто зайдёт через два года, будут догонять.',
  },
  {
    icon: Banknote,
    insight: 'INSIGHT · 03',
    title: 'Экономика давит на бизнес',
    body:
      'Компании режут косты и ищут, где ускориться. Автоматизация рутины, сайты за часы, MVP за выходные — это не вишенка, это необходимость. Специалист с ИИ-навыком сейчас — ключ к сундукам, которые бизнес готов открывать.',
  },
  {
    icon: Infinity,
    insight: 'INSIGHT · 04',
    title: 'Навык не сгорает',
    body:
      'Работа с ИИ — это не тренд на один сезон. Это новый способ делать всё: от текстов до продуктов. Инструменты сменятся — навык работать с ними останется. Как когда-то остались «умение гуглить» и «работать в Excel».',
  },
  {
    icon: Network,
    insight: 'INSIGHT · 05',
    title: 'ИИ встраивается в любую среду',
    body:
      'Дизайн, маркетинг, продажи, продукт, админка, аналитика, HR, код — ИИ уже внутри каждого процесса. Неважно, чем ты занимаешься сейчас: этот навык усиливает любую профессию и открывает соседние.',
  },
];

function KnockoutEquation() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: '-10% 0px' });
  const [strike, setStrike] = useState(false);
  const [gtFlash, setGtFlash] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStrike(true);
      return;
    }
    setGtFlash(true);
    const t = window.setTimeout(() => setStrike(true), 780);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  const t = (delay: number) => ({
    duration: reduce ? 0.01 : 0.55,
    delay: reduce ? 0 : delay,
    ease: EASE,
  });

  return (
    <div
      ref={wrapRef}
      className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 gap-y-1 max-w-full"
    >
      <motion.span
        className="h-display text-[clamp(1.5rem,4vw,3.75rem)] text-white leading-none tracking-tight"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={t(0)}
      >
        junior
      </motion.span>
      <motion.span
        className="h-display text-[clamp(1.5rem,4vw,3.75rem)] text-white leading-none"
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        whileInView={
          reduce
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: [0.92, 1.1, 1] }
        }
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          ...t(0.12),
          scale: reduce
            ? { duration: 0.01 }
            : { duration: 0.5, times: [0, 0.45, 1], ease: EASE },
        }}
      >
        {' + '}
      </motion.span>
      <motion.span
        className="h-display text-[clamp(1.5rem,4vw,3.75rem)] text-white leading-none tracking-tight"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={t(0.2)}
      >
        AI
      </motion.span>
      <span className="knockout-gt-wrap h-display text-[clamp(1.75rem,5vw,4.5rem)] text-accent-soft leading-none translate-y-0.5 md:translate-y-1 inline-flex items-center justify-center">
        <span
          className={`knockout-gt-flash ${gtFlash && !reduce ? 'is-on' : ''}`}
          aria-hidden
        />
        <motion.span
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          whileInView={
            reduce
              ? { scale: 1, opacity: 1 }
              : { scale: [0, 1.2, 1], opacity: 1 }
          }
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={
            reduce
              ? { duration: 0.01, delay: 0 }
              : {
                  delay: 0.38,
                  duration: 0.55,
                  times: [0, 0.55, 1],
                  ease: EASE,
                }
          }
        >
          &gt;
        </motion.span>
      </span>
      <motion.span
        className={`h-display text-[clamp(1.5rem,4vw,3.75rem)] text-white/50 leading-none tracking-tight middle-strike ${
          strike ? 'is-struck' : ''
        }`}
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={t(0.48)}
      >
        middle
      </motion.span>
      <motion.span
        className="h-mono text-[11px] md:text-xs text-white/40 tracking-widest ml-0 md:ml-1"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={t(0.72)}
      >
        без AI
      </motion.span>
    </div>
  );
}

export default function WhyNow() {
  const reduceMotion = useReducedMotion();

  const knockoutTransition = {
    duration: reduceMotion ? 0.01 : 0.8,
    ease: EASE,
  };

  return (
    <Section id="why-now">
      <Reveal>
        <Eyebrow>Timing</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-4xl leading-[1.05]">
          Лучшее время войти в ИИ —{' '}
          <span className="italic text-accent-soft">прямо сейчас.</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-16 md:mb-20">
          Не через год. Не «когда разберусь». Окно открыто сейчас — и у
          каждого аргумента есть дата истечения.
        </p>
      </Reveal>

      <motion.div
        className="glass rounded-3xl p-8 md:p-14 ring-1 ring-accent/30 mb-16 md:mb-24 animate-pulse-glow overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={knockoutTransition}
      >
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-center">
          <div className="flex flex-col items-start">
            <div className="h-mono mb-4">INSIGHT · 01</div>
            <KnockoutEquation />
          </div>

          <div>
            <h3 className="h-display text-2xl md:text-3xl text-white mb-4 leading-snug">
              Младший специалист с ИИ — сильнее среднего без него.
            </h3>
            <p className="text-white/70 text-[17px] leading-relaxed">
              Год назад это было спорно. Сейчас — факт рынка.
              Junior-разработчик с Cursor закрывает задачи быстрее middle без
              ИИ. Маркетолог с ChatGPT производит больше материала, чем
              команда без него. Рынок уже перестраивается под эту разницу —
              вопрос только в том, на какой стороне будешь ты.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.insight}
              className="glass rounded-2xl p-8 md:p-9 min-h-[280px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.65,
                delay: reduceMotion ? 0 : i * 0.1,
                ease: EASE,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-accent-soft"
                  />
                </div>
                <span className="h-mono">{c.insight}</span>
              </div>
              <div className="mt-auto pt-8">
                <h3 className="text-xl md:text-2xl font-medium text-white mb-3 leading-tight">
                  {c.title}
                </h3>
                <p className="text-white/60 text-[15px] leading-relaxed">
                  {c.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Reveal delay={0.15} className="mt-20 text-center">
        <p className="h-display text-[clamp(24px,3vw,36px)] leading-snug max-w-3xl mx-auto mb-6">
          Через год это будет минимальный порог входа на рынок.
          <br />
          Сейчас это —{' '}
          <span className="italic text-accent-soft">твоё преимущество.</span>
        </p>
        <a
          href="#pricing"
          className="btn-ghost inline-flex justify-center gap-2"
        >
          Посмотреть тарифы
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </a>
      </Reveal>
    </Section>
  );
}
