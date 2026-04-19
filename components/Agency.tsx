'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';

const POINTS = [
  {
    title: 'Реальные проекты',
    text:
      'не «учебные», а клиентские задачи под NDA, оплата, сроки.',
  },
  {
    title: 'Команда и наставник в одном лице',
    text: 'я рядом на каждом этапе, от брифа до сдачи.',
  },
  {
    title: 'Путь к постоянному доходу',
    text: 'от первого оплаченного проекта до регулярного потока.',
  },
];

const CORNERS = [
  'top-3 left-3',
  'top-3 right-3 rotate-90',
  'bottom-3 right-3 rotate-180',
  'bottom-3 left-3 -rotate-90',
];

export default function Agency() {
  return (
    <Section id="agency">
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 items-start">
        <div>
          <Reveal>
            <Eyebrow>Следующий уровень</Eyebrow>
            <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-3xl leading-[1.05]">
              Лучшие ученики —{' '}
              <span className="italic text-accent-soft">
                попадают ко мне в агентство.
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-12">
              AI Delivery — моё агентство по AI-разработке. После обучения на
              любом тарифе я отбираю сильнейших и беру в реальные проекты на
              стороне клиентов агентства.
            </p>
          </Reveal>

          <ul className="space-y-6 mb-10">
            {POINTS.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-3 text-[17px] md:text-[18px] leading-relaxed text-white/75 max-w-xl"
              >
                <span className="text-accent-soft mt-1 shrink-0 leading-none">
                  ◆
                </span>
                <span>
                  <span className="text-white font-medium">{p.title}</span>
                  {' — '}
                  {p.text}
                </span>
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <a
              href="https://www.ai-delivery.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex gap-2"
            >
              Посмотреть агентство
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden">
            {CORNERS.map((pos) => (
              <span
                key={pos}
                className={`absolute w-5 h-5 border-t border-l border-accent/50 pointer-events-none ${pos}`}
                aria-hidden
              />
            ))}

            <div className="font-mono text-[11px] tracking-[0.2em] text-white/45 mb-4">
              AI DELIVERY · AGENCY
            </div>
            <div className="h-display text-[clamp(32px,4vw,52px)] text-white mb-6">
              ai-delivery.shop
            </div>
            <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-8" />

            <ul className="space-y-4 font-mono text-sm text-white/60">
              <li>· Реальные клиенты</li>
              <li>· AI-разработка под ключ</li>
              <li>· Работа с отобранными учениками</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
