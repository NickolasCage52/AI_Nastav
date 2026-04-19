'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const TG = 'https://t.me/nikmorus';

/**
 * STICKY CTA (mobile only)
 * — появляется после scroll > 150vh
 * — safe-area-inset-bottom для iPhone
 * — 2 кнопки: тариф / telegram
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="mx-3 mb-3 bg-ink-50/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2 shadow-glow-sm">
            <a
              href="#pricing"
              className="btn-primary flex-1 justify-center !py-3.5 !text-[15px]"
            >
              Выбрать тариф
            </a>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-4 !py-3.5"
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
