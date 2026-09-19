/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        ink: {
          50: '#f7f8fa',
          100: '#eef1f6',
          200: '#d9dee8',
          300: '#b8c2d4',
          400: '#8f9db5',
          500: '#6f7f9c',
          600: '#576681',
          700: '#475369',
          800: '#3d4658',
          900: '#1a2332',
          950: '#0c1220',
        },
        saffron: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(12, 18, 32, 0.08)',
        card: '0 1px 3px rgba(12, 18, 32, 0.06), 0 8px 24px -8px rgba(12, 18, 32, 0.1)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(20, 184, 166, 0.18), transparent), radial-gradient(ellipse 60% 50% at 85% 20%, rgba(249, 115, 22, 0.12), transparent), radial-gradient(ellipse 50% 40% at 50% 90%, rgba(15, 118, 110, 0.08), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.45s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
