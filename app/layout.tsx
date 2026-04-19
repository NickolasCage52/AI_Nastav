import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { FormProvider } from '@/components/FormContext';
import './globals.css';

// Display: системный serif-стек (--font-display в globals.css). Без next/font/google —
// иначе при недоступности fonts.googleapis.com шум в логах и лишние запросы при сборке.

export const metadata: Metadata = {
  title: 'Наставничество по AI-разработке — Никита Морус · От промпта до проекта',
  description:
    'Личное наставничество по AI-разработке для тех, кто хочет собирать сайты, автоматизации и цифровые продукты без классического кода. ChatGPT, Claude, Cursor как рабочая связка.',
  openGraph: {
    title: 'Наставничество по AI-разработке — Никита Морус',
    description: 'От промпта до первого оплачиваемого проекта.',
    type: 'website',
    locale: 'ru_RU',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans">
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
