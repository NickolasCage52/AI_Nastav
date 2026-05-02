import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        '3xl': '1920px',
        tall: { raw: '(min-height: 800px)' },
        short: { raw: '(max-height: 600px)' },
        touch: { raw: '(hover: none)' },
        mouse: { raw: '(hover: hover)' },
      },
      colors: {
        ink: {
          DEFAULT: '#07070A',
          50: '#0C0C12',
          100: '#131320',
        },
        accent: {
          DEFAULT: '#7B4BFF',
          soft:    '#A97BFF',
          deep:    '#5A2EE0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans:    ['var(--font-geist-sans)', 'system-ui'],
        mono:    ['var(--font-geist-mono)', 'ui-monospace'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-sm': '0 0 32px -8px rgba(123,75,255,0.35)',
        'glow':    '0 0 80px -16px rgba(123,75,255,0.45)',
        'glow-lg': '0 0 160px -30px rgba(123,75,255,0.55)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.55' },
          '50%':      { opacity: '0.95' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 120px -30px rgba(123,75,255,0.4)',
          },
          '50%': {
            boxShadow: '0 0 140px -25px rgba(123,75,255,0.55)',
          },
        },
      },
      animation: {
        breathe: 'breathe 8s ease-in-out infinite',
        shimmer: 'shimmer 5s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
