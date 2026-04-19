'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Section, Reveal, Eyebrow } from './Section';

type CountPhase = 'idle' | 'counting' | 'glitch' | 'done';

/**
 * CountUp — счётчик + blur при росте, микро-глитч и краткое свечение в финале.
 */
function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const [blurPx, setBlurPx] = useState(20);
  const [phase, setPhase] = useState<CountPhase>('idle');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      setBlurPx(0);
      setPhase('done');
      return;
    }
    setPhase('counting');
    const start = performance.now();
    let raf = 0;
    let glitchTimer: number | undefined;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(to * eased));
      setBlurPx(20 * (1 - eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setBlurPx(0);
        setPhase('glitch');
        glitchTimer = window.setTimeout(() => setPhase('done'), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (glitchTimer !== undefined) window.clearTimeout(glitchTimer);
    };
  }, [inView, to, duration, reduceMotion]);

  return (
    <span
      className={
        phase === 'done' && !reduceMotion
          ? 'case-amount-glow inline-block'
          : 'inline-block'
      }
    >
      <motion.span
        ref={ref}
        className={
          phase === 'glitch'
            ? 'case-amount-glitch inline-block origin-left'
            : 'inline-block'
        }
        style={{
          filter: reduceMotion || blurPx < 0.5 ? 'none' : `blur(${blurPx}px)`,
        }}
      >
        {value.toLocaleString('ru-RU')}
      </motion.span>
    </span>
  );
}

const CASE_IMAGES = ['/cases/albert.png', '/cases/nikita-student.png'];

const CASES = [
  {
    name: 'Альберт',
    amount: 240000,
    currency: '₽',
    label: 'продал сайт за',
    story:
      'Прошёл обучение полностью. Мы вместе реализуем проект. Научился собирать сайты за 1 день и уже ведёт клиентов.',
    age: null,
  },
  {
    name: 'Никита',
    amount: 150000,
    currency: '₽',
    label: 'продал два лендинга на',
    story:
      'Сделал для себя трекер, поднял продуктивность — и сразу начал переводить навык в деньги.',
    age: 16,
  },
];

function CasePortrait({
  src,
  index,
  name,
}: {
  src: string;
  index: number;
  name: string;
}) {
  const [err, setErr] = useState(false);

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      {!err ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
          onError={() => setErr(true)}
        />
      ) : (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 400"
          aria-hidden
        >
          <defs>
            <radialGradient id={`avatar-${index}`} cx="50%" cy="35%" r="40%">
              <stop offset="0%" stopColor="#F5F5F7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F5F5F7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="150"
            cy="140"
            rx="60"
            ry="75"
            fill={`url(#avatar-${index})`}
          />
          <path
            d="M60 400 C 60 270, 120 220, 150 220 C 180 220, 240 270, 240 400 Z"
            fill={`url(#avatar-${index})`}
          />
        </svg>
      )}
    </div>
  );
}

export default function Cases() {
  return (
    <Section id="cases">
      <Reveal>
        <Eyebrow>Кейсы учеников</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-3xl">
          Первые результаты{' '}
          <span className="italic text-accent-soft">учеников.</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">
          Не скриншоты отзывов. Реальные суммы от реальных людей.
        </p>
      </Reveal>

      <div className="space-y-8 md:space-y-12">
        {CASES.map((c, i) => (
          <motion.div
            key={c.name}
            className={`grid md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16 items-center ${
              i % 2 === 1 ? 'md:flex-row-reverse md:[&>*:first-child]:order-2' : ''
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Avatar placeholder — ЗАМЕНИТЬ на <Image src={`/cases/${name}.jpg`} /> */}
            <div className="relative aspect-[4/5] max-w-[360px] mx-auto md:mx-0 w-full">
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse at 40% 30%, rgba(123,75,255,0.2), transparent 60%), linear-gradient(135deg, #15151f 0%, #0a0a12 100%)',
                }}
              />
              <CasePortrait
                src={CASE_IMAGES[i]!}
                index={i}
                name={c.name}
              />
              {/* Тонкий фиолетовый rim-light */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: 'inset -40px 0 60px -20px rgba(123,75,255,0.15)',
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[11px] tracking-widest text-white/50">
                    УЧЕНИК · {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-white text-xl font-medium mt-1">
                    {c.name}
                    {c.age && <span className="text-white/50 text-base">, {c.age} лет</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="text-white/50 text-[15px] mb-3">{c.label}</div>
              <div className="h-display text-white mb-6 flex items-baseline gap-2">
                <span className="text-[clamp(56px,8vw,120px)] leading-none tracking-tight">
                  <CountUp to={c.amount} />
                </span>
                <span className="text-[clamp(28px,4vw,56px)] text-accent-soft">
                  {c.currency}
                </span>
              </div>
              <p className="text-white/70 text-lg leading-relaxed max-w-lg">
                {c.story}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-24 md:mt-28">
        <p className="text-[clamp(28px,5vw,52px)] text-white/70 max-w-4xl leading-[1.12] font-display tracking-tight">
          Смысл — не «разобраться в инструментах».{' '}
          <span className="text-white">
            Смысл — начать применять это в жизни, проектах и заработке.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
