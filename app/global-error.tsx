'use client';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { useEffect } from 'react';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ru" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-[var(--bg-ink)] text-[var(--text-pri)]">
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-mut)]">
            Критическая ошибка
          </p>
          <h1 className="h-display text-2xl md:text-3xl">Сбой приложения</h1>
          <p className="text-[15px] leading-relaxed text-[var(--text-sec)]">
            Обнови страницу. Если экран не исчезает — перезапусти dev-сервер
            (останови и снова <code className="text-accent-soft">npm run dev</code>
            ).
          </p>
          <button type="button" onClick={() => reset()} className="btn-primary">
            Попробовать снова
          </button>
        </div>
      </body>
    </html>
  );
}
