/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Ultra-dark base
        ink: '#0C0C0C',
        // Deep navy token
        navy: '#0A1626',
        // Light corporate blues
        'corp-blue': '#7FA8C9',
        'corp-blue-soft': '#BBCCD7',
        // Soft pinks
        'soft-pink': '#E9A8C9',
        'soft-pink-deep': '#B600A8',
        // Glassy nav text
        glass: '#D7E2EA',
      },
      letterSpacing: {
        ultra: '0.35em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
