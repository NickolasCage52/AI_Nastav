'use client';

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Section, Reveal, Eyebrow } from './Section';

const CORNERS = [
  'top-3 left-3',
  'top-3 right-3 rotate-90',
  'bottom-3 right-3 rotate-180',
  'bottom-3 left-3 -rotate-90',
];

const PARAS: ReactNode[] = [
  <>
    Меня зовут <span className="text-white">Никита Морус</span>. Я не учу
    «нейросетям для школьников». Я учу тому, через что прошёл сам.
  </>,
  <>
    Были ночи в хостелах Екатеринбурга и в Москва-Сити. Смены в общепите в
    Санкт-Петербурге — те самые, когда уходишь домой, когда другие уже встают.
    Я таскал гробы за 1000 ₽. Был должен{' '}
    <span className="chip mx-1">200 000 ₽</span> и не видел, как выбираться.
  </>,
  <>
    Весь <span className="text-white">2025 год</span> я изучал маркетинг.
    Курсы, теория, попытки. Результат —{' '}
    <span className="chip mx-1">40 000 ₽</span> за весь год. Я чувствовал себя
    слабым и тупым. Казалось, что ничего не получается и уже не получится.
  </>,
  <>
    Потом я ушёл из общепита. Собрал всё, что знал — маркетинг, ИИ, продажи —
    и начал делать. Не учиться. <span className="text-white">Делать.</span>{' '}
    <span className="chip mx-1">3800$</span> за{' '}
    <span className="chip mx-1">40 дней</span>. Это был не заголовок ролика —
    это был мой выход.
  </>,
  <>
    Сейчас я живу в <span className="text-white">Санкт-Петербурге</span> и
    строю своё AI-агентство (ai-delivery.shop). В него потенциально может
    попасть ученик после обучения на любом тарифе — об этом дальше.
  </>,
  <span className="text-white text-[19px] md:text-[22px]">
    Я не передаю теорию. Я передаю маршрут, по которому прошёл сам.
  </span>,
];

function StoryParagraph({
  index,
  active,
  setActive,
  reduceMotion,
  children,
}: {
  index: number;
  active: number;
  setActive: (i: number) => void;
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { amount: 0.42, margin: '-10% 0px -10% 0px' });

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  const isLit = active === index;

  return (
    <motion.p
      ref={ref}
      className={`text-[17px] md:text-[19px] leading-relaxed max-w-xl transition-colors duration-500 ${
        isLit ? 'text-white/[0.95]' : 'text-white/75'
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      {children}
    </motion.p>
  );
}

export default function FounderStory() {
  const ref = useRef<HTMLDivElement>(null);
  const storyScrollRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [activePara, setActivePara] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(sectionProgress, [0, 1], ['-8%', '8%']);

  const { scrollYProgress } = useScroll({
    target: storyScrollRef,
    offset: ['start 0.7', 'end 0.3'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="founder" className="overflow-hidden">
      <div
        ref={ref}
        className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center"
      >
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxY }}
          className="relative aspect-[4/5] max-w-[460px] mx-auto md:mx-0 w-full isolate"
        >
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse at 60% 30%, rgba(123,75,255,0.2), transparent 55%), linear-gradient(160deg, #16121e 0%, #070709 100%)',
              filter: 'grayscale(1) contrast(1.1)',
            }}
          />

          {!imgError ? (
            <Image
              src="/founder.png"
              alt="Никита Морус"
              fill
              className="object-cover rounded-3xl z-[1]"
              sizes="(max-width: 768px) 100vw, 460px"
              priority={false}
              onError={() => setImgError(true)}
            />
          ) : (
            <svg
              className="absolute inset-0 z-[1] w-full h-full rounded-3xl"
              viewBox="0 0 400 500"
              aria-hidden
            >
              <defs>
                <radialGradient id="founder-rim" cx="65%" cy="35%" r="45%">
                  <stop offset="0%" stopColor="#F5F5F7" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#F5F5F7" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="210" cy="170" rx="75" ry="95" fill="url(#founder-rim)" />
              <path
                d="M110 500 C 110 340, 170 270, 210 270 C 250 270, 310 340, 310 500 Z"
                fill="url(#founder-rim)"
              />
            </svg>
          )}

          {CORNERS.map((pos) => (
            <span
              key={pos}
              className={`absolute z-[2] w-5 h-5 border-t border-l border-accent/50 pointer-events-none ${pos}`}
              aria-hidden
            />
          ))}

          <div className="absolute z-[2] bottom-5 left-5 right-5 font-mono text-[11px] tracking-widest text-white/40">
            НИКИТА МОРУС
          </div>
        </motion.div>

        <div ref={storyScrollRef} className="relative md:pl-8">
          <div
            className="hidden md:block absolute left-2 top-0 bottom-0 w-px bg-white/[0.08] rounded-full"
            aria-hidden
          />
          <motion.div
            className="hidden md:block absolute left-2 bottom-0 w-px bg-accent rounded-full origin-bottom pointer-events-none"
            style={{ height: reduceMotion ? '100%' : fillHeight }}
            aria-hidden
          />

          <Reveal>
            <Eyebrow>История основателя</Eyebrow>
            <h2 className="h-display text-[clamp(32px,4.5vw,60px)] mb-10 leading-[1.05]">
              22 года. Хостелы в Екатеринбурге, ночи в Москва-Сити — до своего
              онлайн-агентства.
            </h2>
          </Reveal>

          <div className="space-y-6">
            {PARAS.map((node, i) => (
              <StoryParagraph
                key={i}
                index={i}
                active={activePara}
                setActive={setActivePara}
                reduceMotion={reduceMotion}
              >
                {node}
              </StoryParagraph>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-14 flex flex-wrap gap-3">
            {[
              [
                '2024',
                'Екб: хостелы. СПб: общепит. 200 000 ₽ долгов.',
              ],
              ['2025', 'Год изучения маркетинга. 40 000 ₽ за весь год.'],
              [
                '2026',
                '3800$ за 40 дней. Москва-Сити. Своё онлайн-агентство.',
              ],
            ].map(([year, note]) => (
              <div
                key={year}
                className="glass rounded-xl px-4 py-3 flex flex-col gap-1 min-w-[180px]"
              >
                <span className="font-mono text-[11px] tracking-widest text-accent-soft">
                  {year}
                </span>
                <span className="text-white/70 text-[13px]">{note}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
