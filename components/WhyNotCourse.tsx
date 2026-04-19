'use client';

import { motion } from 'framer-motion';
import { Section, Reveal, Eyebrow } from './Section';

const LEFT = [
  '100–150 уроков',
  'Много теории',
  'Мало практики',
  'После оплаты — один',
  'Сложно довести',
  '«Удачи!»',
];

const RIGHT = [
  'Личное сопровождение',
  'Понятный маршрут',
  'Реальные задачи',
  'Со мной до результата',
  'База + разборы + помощь',
  'Навык → проекты → деньги',
];

/**
 * WHY NOT COURSE
 * — две колонки: приглушённая (курс) vs акцентная (наставничество)
 * — правая имеет subtle glow — ощущение "выдвинута вперёд"
 */
export default function WhyNotCourse() {
  return (
    <Section id="why">
      <Reveal>
        <Eyebrow>Отличие</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-16 max-w-3xl">
          Это <span className="italic text-white/55">не курс.</span>
          <br />
          И поэтому <span className="text-accent-soft italic">работает.</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Left — обычный курс, приглушённый */}
        <motion.div
          className="glass rounded-2xl p-8 md:p-10 opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-mono mb-6">Обычный курс</div>
          <ul className="space-y-3">
            {LEFT.map((x) => (
              <li
                key={x}
                className="text-white/60 text-lg line-through decoration-white/20 decoration-1"
              >
                {x}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — наставничество, акцентное */}
        <motion.div
          className="glass rounded-2xl p-8 md:p-10 relative ring-1 ring-accent/30"
          style={{ boxShadow: '0 0 100px -30px rgba(123,75,255,0.4)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-mono text-accent-soft mb-6">Наставничество</div>
          <ul className="space-y-3">
            {RIGHT.map((x) => (
              <li key={x} className="text-white text-lg flex items-center gap-3">
                <span className="text-accent-soft">◆</span>
                {x}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
