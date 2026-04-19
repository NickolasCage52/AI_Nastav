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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink/60 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-12 h-16">
          {/* Wordmark */}
          <a
            href="#top"
            className="font-mono text-[13px] tracking-[0.2em] font-medium text-white"
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
            className="md:hidden p-2 -mr-2 text-white"
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
            className="fixed inset-0 z-[60] bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
              <span className="font-mono text-[13px] tracking-[0.2em] font-medium">
                morus <span className="text-accent-soft">●</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-2"
                aria-label="Закрыть"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-col px-6 py-10 gap-6">
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
                    className="h-display text-4xl block"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8"
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
