/**
 * FOOTER — минималистичный, не отвлекающий от CTA выше
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-[13px] tracking-[0.2em] font-medium">
            morus <span className="text-accent-soft">●</span>
          </div>
          <div className="text-white/40 text-sm mt-2">
            Наставничество по AI-разработке · © 2026
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-x-8 gap-y-4 text-sm text-white/60">
          <div className="flex flex-col gap-1">
            <a
              href="https://t.me/nikmorus"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-soft transition-colors"
            >
              Telegram
            </a>
            <span className="text-white/40 text-xs">
              Вопросы — напрямую в ЛС
            </span>
          </div>
          <a
            href="https://t.me/morus_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-soft transition-colors"
          >
            Канал
          </a>
          <a
            href="mailto:hi@morus.pro"
            className="hover:text-accent-soft transition-colors"
          >
            hi@morus.pro
          </a>
        </div>
      </div>
    </footer>
  );
}
