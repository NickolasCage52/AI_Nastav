'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Section, Reveal, Eyebrow } from './Section';

const STEPS = [
  {
    n: '01',
    title: 'Основа',
    body: 'Как реально работает AI-разработка. Как ставить задачи ИИ, чтобы он отвечал как специалист. Система вместо хаоса.',
  },
  {
    n: '02',
    title: 'Инструменты',
    body: 'ChatGPT + Claude + Cursor как рабочая связка. Не «10 сервисов», а один workflow.',
  },
  {
    n: '03',
    title: 'Практика',
    body: 'Реальные проекты: сайты, лендинги, автоматизации, внутренние инструменты, MVP. Руками, с нуля.',
  },
  {
    n: '04',
    title: 'Монетизация',
    body: 'Как из навыка сделать доход. Упаковка, чеки, первые клиенты, стоимость.',
  },
  {
    n: '05',
    title: 'Сопровождение',
    body: 'По уровню тарифа — от разборов до совместного закрытия клиента.',
  },
];

/**
 * PROGRAM
 * — вертикальная линия, которая "заливается" фиолетом по мере скролла
 * — узлы-круги с номерами, каждый сопровождает свой шаг
 */
export default function Program() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 40%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="program">
      <Reveal>
        <Eyebrow>Как мы идём</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-3xl">
          Как мы идём{' '}
          <span className="italic text-accent-soft">к результату.</span>
        </h2>
        <p className="text-white/60 text-lg mb-20">Маршрут, а не квест.</p>
      </Reveal>

      <div ref={ref} className="relative pl-12 sm:pl-14 md:pl-24">
        {/* Static baseline */}
        <div
          className="absolute left-[17px] sm:left-5 md:left-10 top-2 bottom-2 w-px bg-white/10"
          aria-hidden
        />
        {/* Progress line — заливается по мере скролла */}
        <motion.div
          className="absolute left-[17px] sm:left-5 md:left-10 top-2 w-px origin-top"
          style={{
            height: lineHeight,
            background:
              'linear-gradient(to bottom, rgba(123,75,255,0.8), rgba(123,75,255,0.3))',
            boxShadow: '0 0 20px rgba(123,75,255,0.4)',
          }}
          aria-hidden
        />

        <ul className="space-y-16 md:space-y-20">
          {STEPS.map((step) => (
            <motion.li
              key={step.n}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Node */}
              <div className="absolute -left-[46px] sm:-left-[53px] md:-left-[96px] top-1 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-accent/40 bg-ink flex items-center justify-center font-mono text-[10px] sm:text-[11px] tracking-wider text-accent-soft shadow-glow-sm">
                {step.n}
              </div>

              <h3 className="h-display text-[clamp(28px,3.6vw,48px)] text-white mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
