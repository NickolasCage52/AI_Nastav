'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section, Reveal, Eyebrow } from './Section';
import { useIsMobile } from '@/lib/use-media-query';

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: 'Нужен ли опыт в программировании?',
    a: 'Нет. Наставничество рассчитано на вход в AI-разработку без классического кода. Ты учишься ставить задачи ИИ и работать через Cursor — без написания кода руками.',
  },
  {
    q: 'Я уже пользуюсь ChatGPT. Мне подойдёт?',
    a: 'Да. Одно дело — иногда пользоваться. Другое — выстроить систему и делать через ИИ реальные проекты, за которые платят.',
  },
  {
    q: 'Что именно я смогу делать после?',
    a: 'Сайты, лендинги, автоматизации, MVP, внутренние инструменты, трекеры и другие рабочие цифровые решения.',
  },
  {
    q: 'Это только про заработок?',
    a: 'Нет. Навык универсален: заработок на проектах, автоматизация личных задач, усиление текущей работы, выход на зарубежный рынок.',
  },
  {
    q: 'Сколько времени это займёт?',
    a: 'Зависит от тарифа и твоего темпа. Суть — идти по системе с сопровождением, а не через хаос.',
  },
  {
    q: 'Что с доступом к базе знаний?',
    a: 'На базовом тарифе доступ открыт на 2 месяца после старта — этого хватает, чтобы пройти материал и закрепить. На тарифах «Результативные проекты» и «Рост через партнёрство» — база остаётся навсегда. Можно возвращаться к промптам, шаблонам и разборам в любой момент, даже через год.',
  },
  {
    q: 'Будут ли реальные проекты?',
    a: 'Да. Особенно во 2 и 3 тарифе, где идёт глубокая работа с реализацией — вплоть до совместного закрытия клиентов.',
  },
  {
    q: 'Как попасть в агентство после обучения?',
    a: 'После любого тарифа я отбираю сильнейших учеников в AI Delivery — моё агентство по AI-разработке. Это реальные клиентские проекты с оплатой и сопровождением. Отбор — по результатам работы на наставничестве.',
  },
];

/**
 * FAQ
 * — accordion, первый открыт по умолчанию
 * — `+` поворачивается в `×` на 45deg
 * — раскрытие через grid rows + blur на тексте
 */
export default function FAQ() {
  const [open, setOpen] = useState<number>(0);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <Section id="faq">
      <Reveal>
        <Eyebrow>Вопросы</Eyebrow>
        <h2 className="h-display text-[clamp(36px,5vw,68px)] mb-16 max-w-3xl">
          Частые <span className="italic text-accent-soft">вопросы.</span>
        </h2>
      </Reveal>

      <div className="max-w-3xl">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="faq-row border-t border-white/5 last:border-b pl-3 md:pl-4"
              data-open={isOpen ? 'true' : 'false'}
            >
              <button
                className="w-full flex items-center justify-between gap-6 py-7 text-left group relative touch-manipulation rounded-lg outline-offset-2 active:bg-white/[0.03] md:active:bg-transparent"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="text-[19px] md:text-[22px] text-white font-medium leading-snug mouse:group-hover:text-accent-soft transition-colors">
                  {item.q}
                </span>
                <motion.span
                  className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-accent-soft"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Plus size={16} strokeWidth={1.8} />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                transition={{ duration: reduce ? 0.01 : 0.4, ease: EASE }}
                className="grid overflow-hidden"
              >
                <div className="min-h-0 overflow-hidden">
                  <motion.p
                    className="text-white/65 text-[17px] leading-relaxed pb-7 max-w-2xl"
                    initial={false}
                    animate={
                      reduce || isMobile
                        ? { opacity: isOpen ? 1 : 0 }
                        : {
                            opacity: isOpen ? 1 : 0,
                            filter: isOpen ? 'blur(0px)' : 'blur(6px)',
                          }
                    }
                    transition={{
                      duration: reduce ? 0.01 : 0.4,
                      delay: isOpen && !reduce && !(isMobile) ? 0.06 : 0,
                      ease: EASE,
                    }}
                  >
                    {item.a}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
