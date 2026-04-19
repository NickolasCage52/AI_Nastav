'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';

const ITEMS = [
  'Личные сессии — живой разбор, не запись',
  'Доступ к базе знаний с промптами и шаблонами',
  'Система работы с ИИ — маршрут, а не лайфхаки',
  'Практика на реальных задачах — не «учебных»',
  'Разбор промптов, логики, структуры проекта',
  'Переход от «понимаю» к «делаю руками»',
  'Поддержка — по уровню тарифа',
];

export default function WhatsInside() {
  return (
    <Section id="inside">
      <Reveal>
        <Eyebrow>Что внутри</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-16 max-w-3xl">
          Что входит в{' '}
          <span className="italic text-accent-soft">наставничество.</span>
        </h2>
      </Reveal>

      <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5">
        {ITEMS.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-4 py-5 border-b border-white/5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
              <Check size={13} strokeWidth={2.5} className="text-accent-soft" />
            </span>
            <span className="text-white/85 text-[17px]">{item}</span>
          </motion.li>
        ))}
      </ul>

      <Reveal delay={0.3} className="mt-14">
        <p className="text-[clamp(20px,2.4vw,28px)] text-white/70 max-w-3xl leading-snug">
          Это не записанный курс.{' '}
          <span className="text-white">
            Это работа с сопровождением до результата.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
