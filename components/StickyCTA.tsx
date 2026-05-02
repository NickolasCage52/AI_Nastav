'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { useIsMobile } from '@/lib/use-media-query';

const TG = 'https://t.me/nikmorus';

/**
 * STICKY CTA — только мобила (брейкпоинт ниже md).
 * Порог показа ниже на телефоне; скрывается, когда видна финальная CTA-секция.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [hideAtFinal, setHideAtFinal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const threshold = isMobile ? 0.8 : 1.5;
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  useEffect(() => {
    const finalSection = document.getElementById('final');
    if (!finalSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setHideAtFinal(
          Boolean(entry.isIntersecting && entry.intersectionRatio > 0.3),
        );
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.6, 1] },
    );

    observer.observe(finalSection);
    return () => observer.disconnect();
  }, []);

  const shouldShow = visible && !hideAtFinal;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            paddingBottom:
              'max(0.75rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="mx-3 mb-3 bg-ink-50/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2 shadow-glow-sm">
            <a
              href="#pricing"
              className="btn-primary flex-1 justify-center !py-3.5 min-h-[48px] !text-[15px]"
            >
              Выбрать тариф
            </a>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-4 !py-3.5 min-h-[48px] min-w-[48px]"
              aria-label="Telegram"
            >
              <Send size={18} strokeWidth={1.8} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
