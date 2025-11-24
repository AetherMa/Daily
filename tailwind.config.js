/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        cocoa: '#4A3B35',
        blush: '#F2C9C1',
        sage: '#C9DCCB',
        sand: '#F5E9DA',
        dusk: '#6B4F4F'
      },
      fontFamily: {
        hand: ['"Patrick Hand"', '"Caveat"', 'system-ui', 'sans-serif'],
        sans: ['"Patrick Hand"', '"Caveat"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        polaroid: '0 12px 30px rgba(74, 59, 53, 0.2)',
        note: '0 10px 25px rgba(0,0,0,0.12)',
        soft: '0 6px 15px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      },
      keyframes: {
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.08)' },
          '50%': { transform: 'scale(0.96)' }
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        'heart-beat': 'heart-beat 1.6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both'
      }
    }
  },
  plugins: []
};
