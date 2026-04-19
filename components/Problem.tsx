'use client';

import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Section, Reveal, Eyebrow } from './Section';

function spotlightMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

const PROBLEMS = [
  {
    title: 'Слабые промпты → слабый результат',
    body: 'Запросы пишутся наугад. ИИ отвечает как умеет. Итог предсказуем: разочарование.',
  },
  {
    title: 'Нет маршрута',
    body: 'Где старт, где финиш, что делать сегодня — непонятно. Каждый день начинается с нуля.',
  },
  {
    title: 'Страх Cursor',
    body: 'Терминал, репозитории, модели — выглядит как код, работает не как код. Привычные инструменты не помогают.',
  },
  {
    title: 'Десятки инструментов',
    body: 'ChatGPT, Claude, v0, Cursor, Make, n8n — и ни одного рабочего стека.',
  },
  {
    title: 'Не знаешь, как брать деньги',
    body: 'Навык вроде есть. Упаковки нет. Клиенты — где-то в параллельной вселенной.',
  },
  {
    title: 'Курсы в закладках',
    body: 'Снова курс, одно открытие — и тишина. Знакомый цикл.',
  },
];

export default function Problem() {
  return (
    <Section id="problem">
      <Reveal>
        <Eyebrow>Что происходит сейчас</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-3xl">
          ИИ у всех. <span className="italic text-white/60">Результата —</span>{' '}
          <span className="text-accent-soft italic">нет.</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-16">
          ChatGPT — на каждом втором компьютере. Cursor знают по названию. Но
          между «что-то получается» и «за это платят» — пропасть. И туда не
          переходят без системы.
        </p>
      </Reveal>

      {/* Grid of pain cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {PROBLEMS.map((problem, i) => (
          <motion.div
            key={problem.title}
            className="glass glass-spotlight p-7 md:p-8 rounded-2xl"
            onMouseMove={spotlightMove}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 0.6,
              delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Number */}
            <div className="font-mono text-[11px] tracking-widest text-accent-soft/70 mb-4">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="text-[19px] font-medium text-white mb-3 leading-snug">
              {problem.title}
            </h3>
            <p className="text-white/55 text-[15px] leading-relaxed">
              {problem.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Knockout statement */}
      <Reveal delay={0.3} className="mt-20">
        <p className="h-display text-[clamp(26px,3.5vw,44px)] text-center max-w-3xl mx-auto leading-[1.15]">
          Проблема не в ИИ.<br />
          <span className="italic text-accent-soft">
            Проблема в том, что тебе никто не дал систему.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
