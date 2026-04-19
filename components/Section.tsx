'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import clsx from 'clsx';

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
        'relative py-24 md:py-40 px-6 md:px-12',
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
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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
