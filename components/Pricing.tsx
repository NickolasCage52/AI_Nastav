'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';
import { useApplicationForm } from './FormContext';
import { PLAN_INDIVIDUAL_PROJECT } from '@/lib/planLabels';

const EASE = [0.22, 1, 0.36, 1] as const;

const PLANS = [
  {
    name: 'Базовый старт',
    price: 30000,
    extra: null,
    sessions: '8 сессий',
    description:
      'Фундамент AI-разработки. Система работы с ИИ. Рабочая связка ChatGPT + Claude + Cursor.',
    suitable: 'Нужно войти в тему правильно и без хаоса.',
    features: [
      'Личные сессии — 8 встреч',
      'Доступ к базе знаний — навсегда',
      'Рабочая связка инструментов',
      'Разбор промптов и логики',
      'Основа для первых проектов',
    ],
    cta: 'Выбрать старт',
    featured: false,
  },
  {
    name: 'Результативные проекты',
    price: 60000,
    extra: '+ 20% с закрытых проектов',
    sessions: '16 сессий',
    description: 'Доводим до реальных проектов. Я сопровождаю проект от и до.',
    suitable: 'Важно не зависнуть на этапе «понял, но сам не довожу».',
    features: [
      'Всё из первого тарифа',
      'Доступ к базе знаний — навсегда',
      'Личные сессии — 16 встреч',
      'Помощь в реализации проектов',
      'Сопровождение до рабочего уровня',
      'Практика на твоих клиентах',
    ],
    cta: 'Выбрать проекты',
    featured: true,
  },
  {
    name: 'Рост через партнёрство',
    price: 80000,
    extra: '+ 30% с закрытых проектов',
    sessions: '24 сессии',
    description:
      'Я подключаюсь глубже: созвоны с клиентами, переговоры, закрытие.',
    suitable:
      'Нужна максимальная вовлечённость и рост через реальных клиентов.',
    features: [
      'Всё из предыдущих тарифов',
      'Доступ к базе знаний — навсегда',
      'Личные сессии — 24 встречи',
      'Помощь в закрытии клиентов',
      'Совместные созвоны',
      'Усиление переговоров',
    ],
    cta: 'Выбрать партнёрство',
    featured: false,
  },
];

function MagneticPricingCTA({
  featured,
  onClick,
  children,
}: {
  featured: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 150, damping: 15 });
  const sy = useSpring(rawY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(hover: hover)');
    if (!mq.matches) return;

    function onMove(ev: MouseEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ev.clientX - cx;
      const dy = ev.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d > 40) {
        rawX.set(0);
        rawY.set(0);
      } else {
        rawX.set(Math.max(-4, Math.min(4, dx * 0.2)));
        rawY.set(Math.max(-4, Math.min(4, dy * 0.2)));
      }
      node.style.setProperty('--spot-x', `${ev.clientX - rect.left}px`);
      node.style.setProperty('--spot-y', `${ev.clientY - rect.top}px`);
    }
    function onLeave() {
      rawX.set(0);
      rawY.set(0);
    }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [reduce, rawX, rawY]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`${
        featured ? 'btn-primary' : 'btn-ghost'
      } justify-center w-full hero-magnetic-cta relative overflow-hidden`}
      style={reduce ? undefined : { x: sx, y: sy }}
    >
      {children}
    </motion.button>
  );
}

type Plan = (typeof PLANS)[number];

function PricingPlanCard({
  plan,
  index,
  hovered,
  setHovered,
  openForm,
  reduce,
}: {
  plan: Plan;
  index: number;
  hovered: number | null;
  setHovered: (v: number | null) => void;
  openForm: (name: string) => void;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, margin: '-10% 0px' });
  const i = index;
  const dim = hovered !== null && hovered !== i;
  const lift = hovered === i;

  const baseFeaturedY = plan.featured ? -12 : 0;
  const targetY =
    !entered ? 32 : lift ? baseFeaturedY - 8 : dim ? baseFeaturedY + 6 : baseFeaturedY;

  const targetScale = !entered
    ? 1
    : plan.featured
      ? dim
        ? 0.985
        : lift
          ? 1.06
          : 1.02
      : dim
        ? 0.97
        : lift
          ? 1.03
          : 1;

  const targetOpacity = !entered ? 0 : dim ? 0.85 : 1;

  const shadowLift =
    lift && !reduce
      ? '0 0 150px -18px rgba(123,75,255,0.65)'
      : plan.featured
        ? '0 0 120px -20px rgba(123,75,255,0.5)'
        : '0 0 0 rgba(0,0,0,0)';

  return (
    <motion.div
      ref={ref}
      className={`relative glass rounded-3xl p-8 md:p-9 flex flex-col ${
        plan.featured ? 'ring-1 ring-accent' : ''
      }`}
      initial={false}
      animate={
        reduce
          ? { opacity: entered ? 1 : 0, y: entered ? 0 : 24 }
          : {
              opacity: targetOpacity,
              y: targetY,
              scale: targetScale,
              boxShadow: shadowLift,
            }
      }
      transition={{
        duration: reduce ? 0.35 : 0.45,
        ease: EASE,
      }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 chip !py-1.5 whitespace-nowrap">
          Самый выбираемый
        </div>
      )}

      <div className="h-mono mb-5">
        {String(i + 1).padStart(2, '0')} · Тариф
      </div>
      <h3 className="h-display text-[28px] md:text-[32px] text-white leading-tight mb-6 min-h-[80px]">
        {plan.name}
      </h3>

      <div className="mb-1 flex items-baseline gap-2">
        <span className="h-display text-[clamp(44px,5vw,64px)] leading-none">
          {plan.price.toLocaleString('ru-RU')}
        </span>
        <span className="text-accent-soft text-2xl">₽</span>
      </div>
      {plan.extra && (
        <div className="font-mono text-[12px] tracking-wider text-white/50 mb-2">
          {plan.extra}
        </div>
      )}
      <div className="text-white/50 text-sm mb-6">{plan.sessions}</div>

      <p className="text-white/70 text-[15px] leading-relaxed mb-6">
        {plan.description}
      </p>

      <div className="font-mono text-[11px] tracking-widest text-white/40 mb-3">
        ПОДХОДИТ, ЕСЛИ
      </div>
      <p className="text-white/80 text-[14px] leading-relaxed mb-8">
        {plan.suitable}
      </p>

      <ul className="space-y-2.5 mb-10 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-white/75 text-[14px]"
          >
            <span className="text-accent-soft mt-1 leading-none">◆</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <MagneticPricingCTA
        featured={plan.featured}
        onClick={() => openForm(plan.name)}
      >
        {plan.cta}
        <ArrowUpRight size={18} strokeWidth={1.8} />
      </MagneticPricingCTA>
    </motion.div>
  );
}

/**
 * PRICING
 * — 3 карточки + wide-блок «индивидуальные условия» под сеткой
 * — средняя featured: фиолетовый ring, поднята на 12px, breathing glow
 * — цена display-typography
 * — каждый CTA открывает форму заявки с названием тарифа
 */
export default function Pricing() {
  const { openForm } = useApplicationForm();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="pricing">
      <Reveal>
        <Eyebrow>Тарифы</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-4xl">
          Три формата.{' '}
          <span className="italic text-accent-soft">Один результат —</span>{' '}
          навык, который приносит деньги.
        </h2>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">
          Выбери глубину вовлечения. Я подключаюсь на уровне, который тебе
          нужен.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {PLANS.map((plan, i) => (
          <PricingPlanCard
            key={plan.name}
            plan={plan}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            openForm={openForm}
            reduce={reduce}
          />
        ))}
      </div>

      <motion.div
        className="glass rounded-3xl p-8 md:p-12 mt-8 md:mt-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: EASE,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="w-12 h-px bg-accent/40 shrink-0"
                aria-hidden
              />
              <span className="chip">ИНДИВИДУАЛЬНО</span>
              <span className="font-mono text-[11px] tracking-widest text-white/40">
                04 · ДЛЯ ТЕХ, У КОГО УЖЕ ЕСТЬ ПРОЕКТ
              </span>
            </div>

            <h3 className="h-display text-[clamp(26px,3.4vw,42px)] leading-tight mb-5 max-w-2xl">
              Есть конкретный проект?
              <br />
              <span className="italic text-accent-soft">
                Работаем по личным условиям.
              </span>
            </h3>

            <p className="text-white/70 text-[16px] md:text-[17px] leading-relaxed max-w-xl mb-6">
              Если приходишь с готовой задачей — сайтом, автоматизацией,
              MVP или внутренним инструментом — я подключаюсь на отдельных
              условиях. Обучение встраивается прямо в твой проект, сопровождение
              идёт до результата. Формат, длительность и стоимость обсуждаем
              лично.
            </p>

            <ul className="space-y-2.5 text-white/75 text-[15px]">
              <li className="flex items-start gap-2.5">
                <span className="text-accent-soft mt-0.5 leading-none">◆</span>
                <span>Доступ к базе знаний — навсегда</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent-soft mt-0.5 leading-none">◆</span>
                <span>
                  Обучение встроено в твой реальный проект — без учебных задач
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent-soft mt-0.5 leading-none">◆</span>
                <span>Формат и глубина сопровождения — под конкретную цель</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-accent-soft mt-0.5 leading-none">◆</span>
                <span>Стоимость и сроки — обсуждаем индивидуально</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 items-stretch w-full md:min-w-[240px] md:w-auto">
            <button
              type="button"
              onClick={() => openForm(PLAN_INDIVIDUAL_PROJECT)}
              className="btn-primary justify-center w-full"
            >
              Обсудить мой проект
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </button>
            <p className="text-white/40 text-[13px] text-center">
              Ответ в течение дня
            </p>
          </div>
        </div>
      </motion.div>

      <Reveal delay={0.2} className="mt-16 text-center">
        <p className="text-white/50 text-[15px]">
          Мест немного. Это не поток — это работа с сопровождением.
        </p>
      </Reveal>
    </Section>
  );
}
