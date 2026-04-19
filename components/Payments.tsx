'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section, Reveal, Eyebrow } from './Section';

type PaymentItem = {
  src: string;
  amount: string;
  alt: string;
};

const PAYMENTS: PaymentItem[] = [
  {
    src: '/payments/payment-6.png',
    amount: '160 000 ₽',
    alt: 'Поступление 160 000 ₽',
  },
  {
    src: '/payments/payment-1.png',
    amount: '72 000 ₽',
    alt: 'Поступление 72 000 ₽',
  },
  {
    src: '/payments/payment-2.png',
    amount: '86 000 ₽',
    alt: 'Поступление 86 000 ₽',
  },
  {
    src: '/payments/payment-3.png',
    amount: '48 000 ₽',
    alt: 'Поступление 48 000 ₽',
  },
  {
    src: '/payments/payment-4.png',
    amount: '80 000 ₽',
    alt: 'Наличные: 80 000 ₽',
  },
  {
    src: '/payments/payment-5.png',
    amount: '37 500 ₽',
    alt: 'Поступление 37 500 ₽',
  },
];

function PaymentCard({ item }: { item: PaymentItem }) {
  const [showImg, setShowImg] = useState(true);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden glass border border-white/[0.06] [&:hover]:!translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Единый кадр 9:16 — скрин целиком, без кривой обрезки */}
      <div
        className="relative w-full aspect-[9/16] max-h-[min(78vh,560px)] mx-auto bg-gradient-to-br from-[#141018] via-ink to-[#0a0812]"
      >
        {showImg ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-contain object-center p-1 sm:p-1.5 transition-opacity duration-300"
            onError={() => setShowImg(false)}
          />
        ) : null}

        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-4 z-10">
          <div className="h-display text-xl sm:text-2xl text-white leading-none">
            {item.amount}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Payments() {
  return (
    <Section id="payments">
      <Reveal>
        <Eyebrow>Доказательства</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-6 max-w-4xl leading-[1.05]">
          Крупнейшие оплаты.{' '}
          <span className="italic text-accent-soft">Без монтажа.</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-14 md:mb-20">
          Скрины поступлений на счёт и кадр с частью выданных наличных. Без
          ретуши и «до/после». Просто факты.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 items-start justify-items-stretch max-w-[1200px] mx-auto">
        {PAYMENTS.map((item) => (
          <PaymentCard key={item.src} item={item} />
        ))}
      </div>

      <Reveal delay={0.15} className="mt-12 md:mt-16 text-center">
        <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
          Это не «успешный успех». Это то, что стало возможно после выхода из
          хаоса.
        </p>
      </Reveal>
    </Section>
  );
}
