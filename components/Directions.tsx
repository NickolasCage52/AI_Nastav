'use client';

import { motion } from 'framer-motion';
import {
  Banknote, Workflow, TrendingUp, Globe2, Package, ArrowUpRight,
} from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';

const DIRECTIONS = [
  {
    icon: Banknote,
    index: '01',
    title: 'Заработок на проектах',
    body: 'Сайты, лендинги, автоматизации, MVP под заказ. От первых 50 000 ₽ — и дальше можешь брать заказы и выходить на постоянный поток клиентов.',
    span: 'md:col-span-4 md:row-span-2', // большая карточка
    featured: true,
  },
  {
    icon: Workflow,
    index: '02',
    title: 'Автоматизация жизни',
    body: 'Личные трекеры, помощники, системы. Рутина — убирается.',
    span: 'md:col-span-2',
  },
  {
    icon: TrendingUp,
    index: '03',
    title: 'Усиление профессии',
    body: 'Маркетологи, менеджеры, дизайнеры, программисты — делают в 3 раза больше за то же время.',
    span: 'md:col-span-2',
  },
  {
    icon: Globe2,
    index: '04',
    title: 'Зарубежный рынок',
    body: 'Навык универсален. Клиенты в RU, US, EU, UAE. Оплата без границ.',
    span: 'md:col-span-3',
  },
  {
    icon: Package,
    index: '05',
    title: 'Свои продукты',
    body: 'Не только под заказ. Собираешь своё — продаёшь по подписке.',
    span: 'md:col-span-3',
  },
];

export default function Directions() {
  return (
    <Section id="directions">
      <Reveal>
        <Eyebrow>Что даёт этот навык</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-3xl">
          Один навык —{' '}
          <span className="italic text-accent-soft">пять направлений</span>{' '}
          роста.
        </h2>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-16">
          AI-разработка — это не узкая ниша. Это способ думать, строить и
          зарабатывать.
        </p>
      </Reveal>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-5 auto-rows-[260px]">
        {DIRECTIONS.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.index}
              className={`glass rounded-2xl p-7 md:p-8 flex flex-col ${d.span} ${
                d.featured
                  ? 'relative overflow-hidden ring-1 ring-accent/20'
                  : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {d.featured && (
                <>
                  {/* Conic gradient rotation — лёгкий premium touch */}
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at top right, rgba(123,75,255,0.25), transparent 60%)',
                    }}
                  />
                </>
              )}

              <div className="flex items-start justify-between mb-auto relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-accent-soft"
                  />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-white/40">
                  {d.index}
                </span>
              </div>

              <div className="mt-8 relative z-10">
                <h3
                  className={`font-medium text-white mb-3 leading-tight ${
                    d.featured ? 'text-2xl md:text-[28px]' : 'text-xl'
                  }`}
                >
                  {d.title}
                </h3>
                <p className="text-white/55 text-[15px] leading-relaxed">
                  {d.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
