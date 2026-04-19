import { NextRequest, NextResponse } from 'next/server';

// Force dynamic — этот роут не должен кэшироваться
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Защита от совсем тупых бот-атак через honeypot
// (поле website в форме должно быть скрытым и всегда пустым)
interface ApplyPayload {
  name: string;
  telegram: string;
  plan?: string;
  project?: string;
  /** Honeypot (не `website` — часто автозаполняется браузером) */
  hp_trap?: string;
  /** @deprecated только для старых клиентов */
  website?: string;
}

// Простой rate limit per IP (in-memory, для single-instance достаточно)
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT_MAX = 5;       // 5 заявок
const RATE_LIMIT_WINDOW = 60_000 * 10; // за 10 минут

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

// Валидация имени: 2-40 символов, буквы/пробелы/дефисы/апострофы
function validateName(name: unknown): name is string {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 40;
}

// Валидация telegram: 5-32 символа, латиница/цифры/подчёркивания
// Опциональный @ в начале — нормализуется
function validateTelegram(tg: unknown): tg is string {
  if (typeof tg !== 'string') return false;
  const cleaned = tg.trim().replace(/^@/, '');
  return /^[a-zA-Z0-9_]{5,32}$/.test(cleaned);
}

// HTML для Telegram: надёжнее MarkdownV2 (кириллица, переносы строк, пунктуация)
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const TELEGRAM_FETCH_MS = 25_000;
const UPSTREAM_PROXY_MS = 30_000;

/** Только в development: прокси на прод-API (Vercel), если с ПК не достучаться до api.telegram.org */
function devApplyUpstreamBase(): string | undefined {
  if (process.env.NODE_ENV !== 'development') return undefined;
  const raw = process.env.APPLY_UPSTREAM_URL?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/$/, '');
}

async function proxyPostToUpstream(
  req: NextRequest,
  upstreamBase: string
): Promise<NextResponse> {
  const body = await req.text();
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), UPSTREAM_PROXY_MS);
  try {
    const res = await fetch(`${upstreamBase}/api/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': req.headers.get('content-type') || 'application/json',
        'x-forwarded-for': req.headers.get('x-forwarded-for') ?? '',
        'x-real-ip': req.headers.get('x-real-ip') ?? '',
      },
      body,
      signal: ac.signal,
    });
    const text = await res.text();
    const ct = res.headers.get('content-type') || 'application/json';
    return new NextResponse(text, { status: res.status, headers: { 'Content-Type': ct } });
  } catch (err) {
    console.error('[apply] Upstream proxy error:', err);
    return NextResponse.json(
      {
        error:
          'Локальный прокси не достучался до APPLY_UPSTREAM_URL. Проверь URL деплоя и интернет. ' +
          'Пример в .env.local: APPLY_UPSTREAM_URL=https://<проект>.vercel.app',
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timer);
  }
}

async function fetchTelegramSend(
  url: string,
  body: string
): Promise<{ ok: true; res: Response } | { ok: false; err: unknown }> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TELEGRAM_FETCH_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: ac.signal,
    });
    return { ok: true, res };
  } catch (err) {
    return { ok: false, err };
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  try {
    const upstream = devApplyUpstreamBase();
    if (upstream) {
      return proxyPostToUpstream(req, upstream);
    }

    // Rate limit
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            ?? req.headers.get('x-real-ip')
            ?? 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Слишком много заявок. Попробуй позже.' },
        { status: 429 }
      );
    }

    // Parse
    const body = (await req.json()) as ApplyPayload;
    const { name, telegram, plan, project, hp_trap: hpTrap, website: legacyTrap } =
      body;

    const trapFilled =
      (hpTrap && String(hpTrap).trim().length > 0) ||
      (legacyTrap && String(legacyTrap).trim().length > 0);

    if (trapFilled) {
      return NextResponse.json({ ok: true });
    }

    // Валидация
    if (!validateName(name)) {
      return NextResponse.json(
        { error: 'Имя должно быть от 2 до 40 символов' },
        { status: 400 }
      );
    }

    if (!validateTelegram(telegram)) {
      return NextResponse.json(
        {
          error: 'Telegram ник: только латиница, цифры, подчёркивания, от 5 символов'
        },
        { status: 400 }
      );
    }

    // Нормализация данных
    const cleanName = name.trim();
    const cleanTelegram = '@' + telegram.trim().replace(/^@/, '');
    const cleanPlan = plan?.trim().slice(0, 120);
    const cleanProject = project?.trim().slice(0, 500);

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!token || !chatId) {
      console.error('[apply] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return NextResponse.json(
        { error: 'Сервис временно недоступен. Напиши напрямую @nikmorus' },
        { status: 500 }
      );
    }

    const mskTime = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    const lines = [
      '🔥 <b>Новая заявка с сайта</b>',
      '',
      `👤 <b>Имя:</b> ${escapeHtml(cleanName)}`,
      `✈️ <b>Telegram:</b> ${escapeHtml(cleanTelegram)}`,
    ];

    if (cleanPlan) {
      lines.push(`💼 <b>Тариф:</b> ${escapeHtml(cleanPlan)}`);
    }

    if (cleanProject) {
      lines.push('', '📝 <b>Проект:</b>', escapeHtml(cleanProject));
    }

    lines.push('', `🕒 ${escapeHtml(mskTime)} МСК`);

    const text = lines.join('\n');

    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const tgBody = JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });

    const tgFetch = await fetchTelegramSend(tgUrl, tgBody);
    if (!tgFetch.ok) {
      console.error('[apply] Telegram network error:', tgFetch.err);
      return NextResponse.json(
        {
          error:
            'Сервер не смог связаться с Telegram (таймаут или блокировка api.telegram.org). ' +
            'На своём ПК без VPN: в .env.local для dev добавь APPLY_UPSTREAM_URL=https://<твой-сайт>.vercel.app — ' +
            'заявка уйдёт на прод-API. Или VPN. Сайт на Vercel обычно шлёт в Telegram без VPN. ' +
            'Напрямую: t.me/nikmorus',
        },
        { status: 502 }
      );
    }

    const tgRes = tgFetch.res;

    if (!tgRes.ok) {
      const errorBody = await tgRes.text();
      console.error('[apply] Telegram API error:', tgRes.status, errorBody);
      return NextResponse.json(
        { error: 'Не удалось отправить заявку. Попробуй ещё раз или напиши @nikmorus' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[apply] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка. Напиши напрямую @nikmorus' },
      { status: 500 }
    );
  }
}

// Защита от случайного GET на этот роут
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
