'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';

const EASE = [0.22, 1, 0.36, 1] as const;

const ROWS = [
  ['Пишешь запросы наугад',                  'ИИ работает как полноценный разработчик под твою задачу'],
  ['ChatGPT, Claude, Cursor — в разных вкладках', 'Рабочая связка: каждый инструмент на своём месте'],
  ['«Хочу сайт» → открыл Tilda → закрыл',    'Собираешь лендинг за день, автоматизацию — за неделю'],
  ['Листаешь ролики про нейросети',          'Ведёшь реальные проекты и получаешь за них деньги'],
  ['Учишься в одиночку',                     'Личное сопровождение до результата'],
];

export default function Transformation() {
  const reduce = useReducedMotion();

  return (
    <Section id="transformation">
      <Reveal>
        <Eyebrow>До / после</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-20 max-w-3xl">
          От хаоса — к{' '}
          <span className="italic text-accent-soft">системе.</span>
          <br />
          За недели, а не годы.
        </h2>
      </Reveal>

      <div className="relative grid md:grid-cols-2 gap-0 md:gap-16 items-start">
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px origin-top"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(123,75,255,0.4) 20%, rgba(123,75,255,0.4) 80%, transparent 100%)',
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.4, ease: EASE }}
        />

        <div className="space-y-1 pb-10 md:pb-0">
          <div className="h-mono mb-6 text-white/40">КАК СЕЙЧАС</div>
          <ul className="space-y-5">
            {ROWS.map((row, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-white/45 py-2"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <X size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-white/30" />
                <span className="text-[17px] leading-snug line-through decoration-white/20 decoration-1">
                  {row[0]}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="space-y-1"
          initial={reduce ? false : { x: 60, opacity: 0 }}
          whileInView={reduce ? undefined : { x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.65, delay: reduce ? 0 : 0.5, ease: EASE }}
        >
          <div className="h-mono mb-6 text-accent-soft">
            ПОСЛЕ НАСТАВНИЧЕСТВА
          </div>
          <ul className="space-y-5">
            {ROWS.map((row, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-white py-2"
                initial={
                  reduce
                    ? { opacity: 0, x: 16 }
                    : { opacity: 0, x: -40, scale: 0.95 }
                }
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: reduce ? 0.5 : 0.55,
                  delay: reduce ? 0.4 + i * 0.08 : 0.65 + i * 0.1,
                  ease: EASE,
                }}
              >
                <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
                  <Check size={12} strokeWidth={2.5} className="text-accent-soft" />
                </span>
                <span className="text-[17px] leading-snug">{row[1]}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
