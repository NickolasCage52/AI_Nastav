'use client';

import { motion } from 'framer-motion';
import { Section, Reveal, Eyebrow } from './Section';

const PERSONAS = [
  { n: '01', title: 'Новичок без кода', sub: 'но с головой и желанием разобраться по-взрослому' },
  { n: '02', title: 'Хочет зарабатывать с ИИ', sub: 'реально, а не «теоретически возможно»' },
  { n: '03', title: 'Специалист', sub: 'которому нужно делать больше, быстрее и качественнее' },
  { n: '04', title: 'Фрилансер', sub: 'уставший от тех же ставок за то же время' },
  { n: '05', title: 'Программист', sub: 'который хочет снять с себя рутину и масштабироваться' },
  { n: '06', title: 'Предприниматель', sub: 'которому нужен навык создавать и автоматизировать под себя' },
];

export default function WhoItIsFor() {
  return (
    <Section id="who">
      <Reveal>
        <Eyebrow>Для кого это</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-16 max-w-3xl">
          Подойдёт, если ты{' '}
          <span className="italic text-accent-soft">—</span>
        </h2>
      </Reveal>

      <ul>
        {PERSONAS.map((p, i) => (
          <motion.li
            key={p.n}
            className="group grid grid-cols-[56px_1fr] md:grid-cols-[96px_1fr_auto] gap-6 items-baseline py-7 border-t border-white/5 last:border-b"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 0.55,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="font-mono text-[12px] tracking-widest text-accent-soft/70 md:text-[13px]">
              {p.n}
            </span>
            <div>
              <div className="h-display text-[clamp(26px,3.2vw,44px)] text-white group-hover:text-accent-soft transition-colors duration-300">
                {p.title}
              </div>
              <div className="text-white/50 text-[15px] md:text-[17px] mt-2 max-w-xl">
                {p.sub}
              </div>
            </div>
            <span className="hidden md:block text-accent-soft/30 group-hover:text-accent-soft group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </motion.li>
        ))}
      </ul>

      <Reveal delay={0.2} className="mt-16">
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
          Если хочется не «потыкать», а встроить ИИ в деньги, результат и
          практику —{' '}
          <span className="text-white">ты по адресу</span>.
        </p>
      </Reveal>
    </Section>
  );
}
