'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Программа',  href: '#program'  },
  { label: 'Кейсы',      href: '#cases'    },
  { label: 'История',    href: '#founder'  },
  { label: 'Тарифы',     href: '#pricing'  },
  { label: 'FAQ',        href: '#faq'      },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
          scrolled
            ? 'bg-ink/60 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-12 h-16 min-h-[64px]">
          {/* Wordmark */}
          <a
            href="#top"
            className="font-mono text-[13px] tracking-[0.2em] font-medium text-white min-h-[44px] flex items-center py-1 -ml-1 pl-1"
            aria-label="Morus — на главную"
          >
            morus
            <span className="text-accent-soft ml-1">●</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-[14px] text-white/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#pricing"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-[14px] text-white hover:border-accent hover:bg-accent/5 hover:text-accent-soft transition-all"
          >
            Выбрать тариф
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-white"
            aria-label="Меню"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay — full screen, крупный тайп */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex shrink-0 items-center justify-between px-6 min-h-[64px] safe-top border-b border-white/5">
              <span className="font-mono text-[13px] tracking-[0.2em] font-medium">
                morus <span className="text-accent-soft">●</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                aria-label="Закрыть"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col overflow-y-auto pl-6 pr-6 pb-8 gap-7 pt-10">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="h-display text-[clamp(2rem,8vw,2.25rem)] flex min-h-[56px] items-center active:opacity-70 transition-opacity touch-manipulation"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto shrink-0 safe-bottom pb-3 pt-2"
              >
                <a
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Выбрать тариф
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
