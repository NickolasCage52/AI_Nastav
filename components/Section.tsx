'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useIsMobile } from '@/lib/use-media-query';

/** После первого paint на клиенте — чтобы анимации по viewport не ломали гидратацию */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* Обёртка-секция с единым ритмом паддингов и max-width */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        'relative py-28 md:py-40 px-6 md:px-12',
        className,
      )}
    >
      <div className="max-w-[1280px] mx-auto">{children}</div>
    </section>
  );
}

/* Reveal: общий fade-up при появлении в viewport */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const revealMargin = isMobile ? '-5% 0px' : '-15% 0px';
  const inView = useInView(ref, { once: true, margin: revealMargin });
  const mounted = useClientMounted();
  const visible = mounted && inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Eyebrow — небольшой caption над заголовком */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="w-8 h-px bg-accent" />
      <span className="h-mono text-accent-soft">{children}</span>
    </div>
  );
}
