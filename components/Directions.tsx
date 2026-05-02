'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Banknote,
  Workflow,
  TrendingUp,
  Globe2,
  Package,
} from 'lucide-react';
import { Section, Reveal, Eyebrow, useClientMounted } from './Section';

const DIRECTIONS = [
  {
    icon: Banknote,
    index: '01',
    title: 'Заработок на проектах',
    body: 'Сайты, лендинги, автоматизации и MVP под заказ — один стек навыков закрывает разные форматы работы. От первых 50 000 ₽ за конкретный результат до постоянных клиентов и повторных заказов.',
    detail:
      'Типичный цикл простой: бриф → быстрый прототип на ИИ → правки по обратной связи → запуск. Ты не «продаёшь магию», а понятный процесс: сроки, этапы, что входит в объём.',
    image: '/directions/01.png',
    featured: true,
  },
  {
    icon: Workflow,
    index: '02',
    title: 'Автоматизация жизни',
    body: 'Личные трекеры, напоминания, сбор информации из переписок и документов, базы знаний под свои задачи. То, что раньше висело «в голове» и таблицах, можно оформить в живую систему.',
    detail:
      'Главное — не «робот ради робота», а освобождение внимания: меньше ручного копирования, меньше забытых дедлайнов, больше ясности по финансам, здоровью или учёбе.',
    image: '/directions/02.png',
  },
  {
    icon: TrendingUp,
    index: '03',
    title: 'Усиление профессии',
    body: 'Маркетологи, менеджеры, дизайнеры и даже опытные разработчики получают другой темп: черновики отчётов, гипотезы, разбор данных и презентации собираются заметно быстрее.',
    detail:
      'ИИ не заменяет вкус и ответственность — он убирает рутину вокруг них: тексты первого прохода, таблицы, сводки, структура документов. Остаётся больше времени на людей, стратегию и смысл.',
    image: '/directions/03.png',
  },
  {
    icon: Globe2,
    index: '04',
    title: 'Зарубежный рынок',
    body: 'Навык универсален по языку задачи: клиенты в RU, US, EU, UAE и других регионах — процесс сборки одинаковый. Оплата и коммуникация давно без привязки к одному город.',
    detail:
      'Документы и интерфейсы можно собирать и вылизывать с ИИ под нужный стиль; заказчикам часто важнее скорость итераций и предсказуемый результат, чем «идеальный» не родной акцент.',
    image: '/directions/04.png',
  },
  {
    icon: Package,
    index: '05',
    title: 'Свои продукты',
    body: 'Не только работа под заказ: можно упаковать экспертизу в простой платный доступ, мини-сервис или подписку на автоматизацию под узкую аудиторию.',
    detail:
      'Когда сборка занимает дни, а не месяцы, проще проверять гипотезы: один формат не зашёл — меняешь оффер или канал. Так навык превращается не только в доход от часов, а в актив, который живёт своей жизнью.',
    image: '/directions/05.png',
  },
];

function DirectionVisual({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-white/[0.015] p-2 ring-1 ring-white/[0.06] sm:p-3 ${className ?? ''}`}
    >
      <img
        src={src}
        alt={title}
        loading="lazy"
        decoding="async"
        className="max-h-[min(62svh,480px)] w-auto max-w-full rounded-lg object-contain sm:max-h-[min(65svh,500px)]"
      />
    </div>
  );
}

function DirectionRow({
  d,
  reverse,
}: {
  d: (typeof DIRECTIONS)[number];
  reverse: boolean;
}) {
  const Icon = d.icon;
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-12% 0px' });
  const mounted = useClientMounted();
  const visible = mounted && inView;

  return (
    <motion.div
      ref={rowRef}
      className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.65,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <DirectionVisual
        src={d.image}
        title={d.title}
        className={reverse ? 'lg:order-2' : 'lg:order-1'}
      />
      <div
        className={`glass rounded-2xl p-7 md:p-9 flex flex-col relative overflow-hidden ${
          reverse ? 'lg:order-1' : 'lg:order-2'
        } ${
          d.featured
            ? 'ring-1 ring-accent/20 lg:min-h-[min(100%,420px)] lg:justify-center'
            : 'lg:min-h-[min(100%,380px)] lg:justify-center'
        }`}
      >
        {d.featured && (
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse at top right, rgba(123,75,255,0.25), transparent 60%)',
            }}
          />
        )}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
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
        <div className="relative z-10 mt-8 space-y-4">
          <h3
            className={`font-medium leading-tight text-white ${
              d.featured ? 'text-2xl md:text-[28px]' : 'text-xl'
            }`}
          >
            {d.title}
          </h3>
          <p className="text-base md:text-[15px] leading-relaxed text-white/58">
            {d.body}
          </p>
          <p className="text-base md:text-[15px] leading-relaxed text-white/48">
            {d.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

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

      <div className="flex flex-col gap-16 md:gap-24 lg:gap-28">
        {DIRECTIONS.map((d, i) => (
          <DirectionRow key={d.index} d={d} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
