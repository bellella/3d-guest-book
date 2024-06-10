/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%) translate(-50%, -50%)', opacity: '0' },
          '100%': { transform: 'translateY(0) translate(-50%, -50%)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0) translate(-50%, -50%)', opacity: '1' },
          '100%': { transform: 'translateY(100%) translate(-50%, -50%)', opacity: '0' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

