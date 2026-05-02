'use client';

import { useEffect } from 'react';

export default function Error({
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
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-mut)]">
        Ошибка
      </p>
      <h1 className="h-display text-2xl text-[var(--text-pri)] md:text-3xl">
        Что-то пошло не так
      </h1>
      <p className="text-[15px] leading-relaxed text-[var(--text-sec)]">
        Попробуй обновить страницу. Если повторится — напиши в поддержку и
        приложи текст ошибки из консоли.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="btn-primary"
      >
        Попробовать снова
      </button>
    </div>
  );
}
