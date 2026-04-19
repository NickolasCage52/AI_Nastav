# Наставничество по AI-разработке

Лендинг авторского наставничества Никиты Моруса.  
Next.js 14 · Tailwind CSS · Framer Motion · TypeScript.

## Live

Production: [добавить ссылку после первого деплоя на Vercel]

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript 5**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**
- **next/font** (Fraunces, Geist, Geist Mono)

## Quick start

```bash
# Клонировать репо
git clone https://github.com/NickolasCage52/AI_Nastav.git
cd AI_Nastav

# Установить зависимости
npm install

# Настроить env
cp .env.example .env.local
# Заполнить TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID

# Запустить dev-сервер
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm run start
```

На Windows, если нет `cp`, скопируй `.env.example` в `.env.local` вручную.

## Environment variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather | yes |
| `TELEGRAM_CHAT_ID` | ID чата для получения заявок | yes |

**Как получить:**

1. Написать @BotFather → `/newbot` → получить токен  
2. Написать своему боту любое сообщение  
3. Открыть `https://api.telegram.org/bot<TOKEN>/getUpdates`  
4. Найти `"chat":{"id":123456789` — это `chat_id`

## Deploy on Vercel

1. Подключить репозиторий к Vercel (**Import Project**).  
2. **Environment Variables** (Production и при необходимости Preview):  
   - `TELEGRAM_BOT_TOKEN`  
   - `TELEGRAM_CHAT_ID`  
3. **Deploy**. После деплоя обнови ссылку в разделе **Live** выше.

## Структура проекта

```
app/
  layout.tsx          — шрифты, metadata
  page.tsx            — сборка всех секций
  globals.css         — design tokens, компоненты
  api/apply/          — API для приёма заявок в Telegram

components/
  Header, Hero, Problem, Transformation, Directions,
  WhyNow, WhoItIsFor, Stack, Cases, Payments,
  FounderStory, Agency, Program, WhatsInside,
  WhyNotCourse, Pricing, FAQ, FinalCTA, Footer,
  StickyCTA, ApplicationForm, FormContext, Ticker, Section

public/
  founder.png         — портрет автора
  cases/              — фото учеников
  payments/           — скрины оплат
```

## Куда класть фото

| Путь | Назначение |
|------|------------|
| `/public/founder.png` | Портрет Никиты (`FounderStory`) |
| `/public/cases/albert.png` | Фото ученика Альберта |
| `/public/cases/nikita-student.png` | Фото ученика Никиты |
| `/public/payments/payment-1.png` … `payment-6.png` | Скрины оплат |

## Telegram контакты

- Автор: [@nikmorus](https://t.me/nikmorus)  
- Агентство: [ai-delivery.shop](https://ai-delivery.shop)

## Прочее

- Локально при сбоях чанков Next.js: останови все процессы `next dev`, выполни `npm run clean`, снова `npm run dev` (см. комментарий в `next.config.js`).
