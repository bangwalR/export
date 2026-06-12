import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        graphite: '#111318',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96D',
        },
        champagne: '#F5EDD6',
        ivory: '#FAF8F3',
        onyx: '#1C1F26',
        smoke: '#8A8F9A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #F5EDD6 50%, #C9A84C 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0A 0%, #111318 100%)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 60px rgba(201, 168, 76, 0.4)',
        lift: '0 20px 60px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        bounce: 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
