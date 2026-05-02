'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/lib/use-media-query';

function HeroMagneticPrimary({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
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
      if (d > 120) {
        rawX.set(0);
        rawY.set(0);
      } else {
        rawX.set(Math.max(-8, Math.min(8, dx * 0.2)));
        rawY.set(Math.max(-8, Math.min(8, dy * 0.2)));
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
    <motion.a
      ref={ref}
      href={href}
      className={`${className ?? ''} hero-magnetic-cta relative overflow-hidden`}
      style={reduce ? undefined : { x: sx, y: sy }}
    >
      {children}
    </motion.a>
  );
}

function HeroVisual({
  scrollYProgress,
  deskRecompose,
}: {
  scrollYProgress: MotionValue<number>;
  deskRecompose: boolean;
}) {
  const merged = useMotionValue(0);
  useEffect(() => {
    if (!deskRecompose) {
      merged.set(0);
      return;
    }
    merged.set(scrollYProgress.get());
    const unsub = scrollYProgress.on('change', (v) => merged.set(v));
    return unsub;
  }, [deskRecompose, scrollYProgress, merged]);

  const y1 = useTransform(merged, [0, 1], ['0%', '-30%']);
  const o1 = useTransform(merged, [0, 1], [1, 0.3]);
  const s1 = useTransform(merged, [0, 1], [1, 1.1]);

  const y2 = useTransform(merged, [0, 1], ['0%', '-50%']);
  const x2 = useTransform(merged, [0, 1], [0, -30]);
  const r2 = useTransform(merged, [0, 1], [-2, -8]);

  const y3 = useTransform(merged, [0, 1], ['0%', '-70%']);
  const x3 = useTransform(merged, [0, 1], [0, 40]);
  const r3 = useTransform(merged, [0, 1], [-1.5, 6]);

  return (
    <div className="relative aspect-[4/5] w-full max-w-[480px] ml-auto">
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        style={{ y: y1, opacity: o1, scale: s1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(123,75,255,0.35), transparent 60%), linear-gradient(135deg, #1a1530 0%, #0a0a15 100%)',
            filter: 'blur(2px)',
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
          viewBox="0 0 400 500"
          aria-hidden
        >
          <defs>
            <radialGradient id="rim" cx="30%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#F5F5F7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5F5F7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="180" rx="70" ry="90" fill="url(#rim)" />
          <path
            d="M100 500 C 100 350, 160 280, 200 280 C 240 280, 300 350, 300 500 Z"
            fill="url(#rim)"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-8 left-4 right-4 glass p-5 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          perspective: 1000,
          rotateY: -4,
          y: y2,
          x: x2,
          rotateZ: r2,
        }}
      >
        <div className="flex items-center gap-1.5 mb-3 opacity-60">
          <span className="w-2 h-2 rounded-full bg-white/30" />
          <span className="w-2 h-2 rounded-full bg-white/30" />
          <span className="w-2 h-2 rounded-full bg-white/30" />
          <span className="ml-2 font-mono text-[10px] text-white/40 tracking-wider">
            cursor · landing.tsx
          </span>
        </div>
        <div className="font-mono text-[11px] space-y-1.5 leading-relaxed">
          <div>
            <span className="text-accent-soft">export default</span>{' '}
            <span className="text-white/90">function</span>{' '}
            <span className="text-white">Landing</span>() {'{'}
          </div>
          <div className="pl-4">
            <span className="text-white/50">// AI-crafted in minutes</span>
          </div>
          <div className="pl-4">
            <span className="text-accent-soft">return</span>{' '}
            <span className="text-white/80">&lt;Hero /&gt;;</span>
          </div>
          <div>{'}'}</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 -left-6 right-10 glass p-4 rounded-2xl"
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ y: y3, x: x3, rotate: r3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center">
            <span className="text-accent-soft text-xs">C</span>
          </div>
          <span className="font-mono text-[10px] text-white/50 tracking-wider">
            claude · prompt
          </span>
          <span className="chip ml-auto text-[10px] py-0 px-2">live</span>
        </div>
        <p className="text-[13px] text-white/85 leading-relaxed">
          Собери landing-секцию с тарифами. Dark theme, glass cards, фиолетовый
          accent. Next.js + Tailwind.
        </p>
      </motion.div>
    </div>
  );
}

/**
 * HERO
 * — Левая колонка: текст и CTA
 * — Правая колонка: визуальная композиция (glass card + blurred portrait заглушка)
 * — Фоновое фиолетовое ambient glow снизу-слева + grid overlay
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const [deskRecompose, setDeskRecompose] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (hover: hover)');
    const sync = () => setDeskRecompose(mq.matches && !reduce);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [reduce]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[100svh] flex items-center pt-20 pb-14 md:pt-24 md:pb-16 overflow-hidden"
    >
      <div
        className="glow-orb animate-breathe"
        style={{
          width: 700,
          height: 700,
          left: '-280px',
          bottom: '-280px',
        }}
        aria-hidden
      />
      <div
        className="glow-orb animate-breathe"
        style={{
          width: 500,
          height: 500,
          right: '-200px',
          top: '10%',
          opacity: 0.5,
          animationDelay: '2s',
        }}
        aria-hidden
      />

      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16 items-center w-full">
        <div className="lg:col-span-7">
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles size={14} className="text-accent-soft" strokeWidth={1.5} />
            <span className="h-mono">AI-разработка · Наставничество</span>
          </motion.div>

          <h1 className="h-display text-white text-[clamp(38px,7.5vw,92px)] mb-8 break-words">
            <span className="mask-line">
              <span style={{ animationDelay: '0ms' }}>От промпта —</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: '140ms' }}>до первого</span>
            </span>
            <span className="mask-line">
              <span
                style={{ animationDelay: '280ms' }}
                className="italic text-accent-soft [overflow-wrap:anywhere]"
              >
                оплачиваемого проекта.
              </span>
            </span>
          </h1>

          <motion.p
            className="text-white/65 text-lg md:text-xl max-w-xl leading-relaxed mb-10 line-clamp-5 md:line-clamp-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Наставничество по AI-разработке для тех, кто хочет собирать сайты,
            автоматизации и цифровые продукты — без классического кода и без
            бесконечной теории.
          </motion.p>

          <motion.ul
            className="space-y-2.5 mb-12"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: isMobile ? 0.04 : 0.08,
                  delayChildren: 0.95,
                },
              },
            }}
          >
            {[
              'Без опыта в программировании на старте',
              'От сильных промптов — до реальных проектов',
              'Первые деньги или усиление текущей работы',
              '4 / 8 / 12 сессий — под твою задачу',
            ].map((text) => (
              <motion.li
                key={text}
                className="flex items-start gap-3 text-white/80"
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
              >
                <span className="text-accent-soft mt-1.5 text-sm leading-none">
                  ◆
                </span>
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <HeroMagneticPrimary
              href="#pricing"
              className="btn-primary w-full min-h-[48px] justify-center sm:w-auto sm:justify-start sm:min-h-0"
            >
              Выбрать тариф
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </HeroMagneticPrimary>
            <a
              href="#program"
              className="btn-ghost w-full min-h-[48px] justify-center sm:w-auto sm:justify-start sm:min-h-0"
            >
              Посмотреть программу
            </a>
          </motion.div>

          <motion.p
            className="text-white/40 text-sm mt-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Для новичков, специалистов, фрилансеров, предпринимателей — и тех,
            кому надоело учиться «впустую».
          </motion.p>
        </div>

        <motion.div
          className="lg:col-span-5 relative hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <HeroVisual scrollYProgress={scrollYProgress} deskRecompose={deskRecompose} />
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex md:flex-col md:items-center md:gap-2 text-white/30 text-xs font-mono tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>SCROLL</span>
        <motion.span
          animate={
            reduce ? { y: 0 } : { y: [0, 6, 0] }
          }
          transition={reduce ? {} : { duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
