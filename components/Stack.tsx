'use client';

import { motion } from 'framer-motion';
import { Section, Reveal, Eyebrow } from './Section';

const AI_CORE = ['ChatGPT', 'Claude', 'Cursor'];

const AROUND = ['v0', 'Next.js', 'Framer', 'Make', 'n8n'];

export default function Stack() {
  return (
    <Section id="stack" className="!py-20 md:!py-28">
      <Reveal>
        <Eyebrow>Связка</Eyebrow>
        <h2 className="h-display text-[clamp(30px,4vw,56px)] mb-5 max-w-3xl leading-[1.08]">
          ИИ — ядро.{' '}
          <span className="italic text-white/55">Остальное — под задачу.</span>
        </h2>
        <p className="text-white/55 text-base md:text-lg max-w-2xl leading-relaxed mb-12 md:mb-14">
          Жёсткого «единственно верного» стека нет: к концу месяца в тренде уже
          другая связка. Фокус — на моделях и агентах; сборку, автоматизацию и
          фреймворки подбираешь под проект и то, что сейчас реально используют в
          индустрии.
        </p>
      </Reveal>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="px-5 py-3 md:px-6 md:py-3.5 border-b border-white/10 flex items-center gap-2">
          <span className="chip !py-1 !text-[10px]">ИИ</span>
          <span className="font-mono text-[11px] tracking-widest text-white/35">
            то, без чего не стартуешь
          </span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {AI_CORE.map((tool, i) => (
            <motion.li
              key={tool}
              className="bg-ink/80 backdrop-blur-sm px-6 py-8 md:py-10 text-center hover:bg-accent/5 transition-colors"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span className="font-display text-2xl md:text-3xl text-accent-soft">
                {tool}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="px-5 py-3 md:px-6 md:py-3.5 border-t border-white/10 flex items-center gap-2">
          <span className="chip !py-1 !text-[10px]">+</span>
          <span className="font-mono text-[11px] tracking-widest text-white/35">
            примеры того, что часто лежит рядом
          </span>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
          {AROUND.map((tool, i) => (
            <motion.li
              key={tool}
              className="bg-ink/80 backdrop-blur-sm px-4 py-6 md:py-8 text-center hover:bg-white/[0.03] transition-colors"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.05 }}
            >
              <span className="font-display text-xl md:text-2xl text-white/75">
                {tool}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
