/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FAFAF8',
          secondary: '#F3F3F0',
        },
        'dark-bg': {
          DEFAULT: '#141618',
          secondary: '#1C1F22',
        },
        accent: {
          DEFAULT: '#435663',
          light: '#E8EEF2',
          dark: '#6B8A9D',
        },
        border: {
          DEFAULT: '#E8E8E4',
          dark: '#262A2D',
        },
        ink: {
          DEFAULT: '#1A1A18',
          soft: '#4A4A46',
          muted: '#8A8A84',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      width: {
        sidebar: '240px',
      },
      maxWidth: {
        content: '52rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'chat-appear': 'chatAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        chatAppear: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(0.5rem)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
    },
  },
  plugins: [],
};
