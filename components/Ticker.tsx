'use client';

import { useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * TICKER — marquee с social proof.
 * Повторяем контент × 4 для бесшовного loop (translateX -50%).
 */
const ITEMS = [
  'AI Delivery · моё агентство',
  'Альберт — проект на 240 000 ₽',
  'Никита, 16 лет — лендинги на 150 000 ₽',
  '3800$ за 40 дней с нуля',
  'ChatGPT',
  'Claude',
  'Cursor',
  'Next.js',
  'Framer',
];

export default function Ticker() {
  const [slow, setSlow] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className="relative border-y border-white/5 py-4 overflow-hidden"
      aria-hidden
      onMouseEnter={() => {
        if (!reduce) setSlow(true);
      }}
      onMouseLeave={() => setSlow(false)}
      style={
        {
          '--marquee-duration': slow && !reduce ? '200s' : '40s',
        } as CSSProperties
      }
    >
      <div className="group flex gap-10 ticker-track whitespace-nowrap will-change-transform">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-mono text-[13px] text-white/40 tracking-wider transition-colors duration-500 group-hover:text-white/70">
              {item}
            </span>
            <span className="text-accent-soft/50">◆</span>
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
    </div>
  );
}
