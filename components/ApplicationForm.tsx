'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  PanInfo,
  useReducedMotion,
} from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';
import { useApplicationForm } from './FormContext';
import { PLAN_INDIVIDUAL_PROJECT } from '@/lib/planLabels';
import { useIsMobile } from '@/lib/use-media-query';

const TG = 'https://t.me/nikmorus';
const CLOSE_DRAG_PX = 100;

export default function ApplicationForm() {
  const { isOpen, plan, closeForm } = useApplicationForm();
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [project, setProject] = useState('');
  const [hpTrap, setHpTrap] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setStatus('idle');
    setErrorMsg('');
    setName('');
    setTelegram('');
    setProject('');
    setHpTrap('');
    const t = requestAnimationFrame(() => firstInputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeForm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      setErrorMsg('Введи имя');
      setStatus('error');
      return;
    }

    const tgClean = telegram.trim().replace(/^@/, '');
    if (!/^[a-zA-Z0-9_]{5,32}$/.test(tgClean)) {
      setErrorMsg('Telegram: латиница, цифры, _, от 5 символов');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          telegram: tgClean,
          plan,
          ...(plan === PLAN_INDIVIDUAL_PROJECT && project.trim()
            ? { project: project.trim().slice(0, 500) }
            : {}),
          hp_trap: hpTrap,
        }),
      });

      const raw = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as typeof data) : {};
      } catch {
        setErrorMsg(
          res.ok
            ? 'Ответ сервера некорректен. Напиши напрямую @nikmorus'
            : 'Сервер недоступен (возможен сбой сборки). Перезапусти dev или выполни npm run dev:clean',
        );
        setStatus('error');
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || 'Что-то пошло не так');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Нет связи с сервером. Напиши напрямую @nikmorus');
      setStatus('error');
    }
  };

  const submitDisabled = status === 'loading' || status === 'success';

  const variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : isMobile
      ? { hidden: { y: '100%' }, visible: { y: 0 } }
      : { hidden: { scale: 0.96, opacity: 0 }, visible: { scale: 1, opacity: 1 } };

  const modalClassName = isMobile
    ? 'relative glass rounded-t-3xl rounded-b-none px-8 pt-0 pb-0 w-full max-w-lg mx-auto max-h-[min(90svh,900px)] overflow-y-auto z-10 mt-auto touch-pan-y'
    : 'relative glass rounded-3xl p-8 max-h-[min(90svh,820px)] overflow-y-auto w-[calc(100%-32px)] max-w-md z-10 mx-auto md:mx-0 md:py-10';

  const sheetPadBottom =
    isMobile ?
      `calc(1.5rem + env(safe-area-inset-bottom, 0px))`
    :   undefined;

  const onPanEndMobile = (_: unknown, info: PanInfo) => {
    if (!isMobile || reduce) return;
    const { offset, velocity } = info;
    if (offset.y > CLOSE_DRAG_PX || velocity.y > 500) closeForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col justify-end md:flex-row md:items-center md:justify-center p-0 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/80 backdrop-blur-md cursor-default"
            aria-label="Закрыть"
            onClick={closeForm}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-form-title"
            className={modalClassName}
            style={{ paddingBottom: sheetPadBottom }}
            initial={variants.hidden}
            animate={variants.visible}
            exit={variants.hidden}
            transition={{ duration: 0.33, ease: [0.22, 1, 0.36, 1] }}
            {...(isMobile && !reduce
              ? {
                  drag: 'y',
                  dragConstraints: { top: 0 },
                  dragElastic: { top: 0, bottom: 0.28 },
                  onDragEnd: onPanEndMobile,
                }
              : {})}
          >
            {isMobile && (
              <div className="pt-4 pb-2 flex justify-center" aria-hidden>
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>
            )}

            <button
              type="button"
              onClick={closeForm}
              className="absolute top-5 right-5 md:top-7 md:right-7 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Закрыть"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {status === 'success' ? (
              <div className="pt-2 text-center">
                <motion.div
                  className="mx-auto mb-6 w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 22,
                  }}
                >
                  <Check
                    size={28}
                    strokeWidth={2}
                    className="text-accent-soft"
                  />
                </motion.div>
                <p
                  id="application-form-title"
                  className="h-display text-2xl md:text-3xl text-white mb-3 leading-snug"
                >
                  Заявка отправлена.
                </p>
                <p className="text-white/70 text-[17px] leading-relaxed mb-8">
                  Напишу тебе в Telegram в течение дня.
                </p>
                <button
                  type="button"
                  onClick={closeForm}
                  className="btn-primary w-full justify-center min-h-[48px]"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={isMobile ? 'relative pt-2' : 'relative pt-6'}
              >
                <input
                  type="text"
                  name="hp_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpTrap}
                  onChange={(e) => setHpTrap(e.target.value)}
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />

                <div className="mb-8">
                  <h2
                    id="application-form-title"
                    className="h-display text-3xl text-white pr-14"
                  >
                    Оставить заявку
                  </h2>
                  {plan ? (
                    <p className="h-mono mt-3">Тариф · {plan}</p>
                  ) : null}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="app-name"
                    className="block h-mono text-white/60 mb-2"
                  >
                    Имя
                  </label>
                  <input
                    ref={firstInputRef}
                    id="app-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="как тебя зовут"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-[0.9375rem] md:py-3.5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none transition-colors"
                  />
                </div>

                <div
                  className={
                    plan === PLAN_INDIVIDUAL_PROJECT ? 'mb-5' : 'mb-8'
                  }
                >
                  <label
                    htmlFor="app-tg"
                    className="block h-mono text-white/60 mb-2"
                  >
                    Telegram
                  </label>
                  <input
                    id="app-tg"
                    name="telegram"
                    autoComplete="off"
                    value={telegram}
                    onChange={(e) => {
                      setTelegram(e.target.value);
                      if (errorMsg) setErrorMsg('');
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="@username"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-[0.9375rem] md:py-3.5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none transition-colors"
                  />
                </div>

                {plan === PLAN_INDIVIDUAL_PROJECT ? (
                  <div className="mb-8">
                    <label
                      htmlFor="app-project"
                      className="block h-mono text-white/60 mb-2"
                    >
                      В ДВУХ СЛОВАХ — ЧТО ЗА ПРОЕКТ?
                    </label>
                    <textarea
                      id="app-project"
                      name="project"
                      rows={3}
                      maxLength={500}
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="Например: лендинг для курса, автоматизация отчётов в компании, MVP приложения для доставки..."
                      className="w-full resize-y min-h-[96px] bg-white/[0.03] border border-white/10 rounded-xl px-4 py-[0.9375rem] md:py-3.5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none transition-colors text-base md:text-[15px] leading-relaxed"
                    />
                  </div>
                ) : null}

                {errorMsg ? (
                  <p
                    className="text-accent-soft text-sm mb-4 leading-relaxed"
                    role="alert"
                  >
                    {errorMsg}{' '}
                    <a
                      href={TG}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-white/80 hover:text-white"
                    >
                      t.me/nikmorus
                    </a>
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="btn-primary w-full justify-center disabled:opacity-40 disabled:pointer-events-none gap-2 min-h-[48px]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin shrink-0"
                      />
                      Отправка...
                    </>
                  ) : (
                    'Отправить заявку'
                  )}
                </button>

                <p className="text-white/35 text-xs text-center mt-6 leading-relaxed">
                  Нажимая «Отправить заявку», ты соглашаешься получить сообщение в
                  Telegram от @nikmorus.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
