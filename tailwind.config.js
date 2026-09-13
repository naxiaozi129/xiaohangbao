/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#5EEAD4',
        sky: '#38BDF8',
        iris: '#818CF8',
        night: '#1A4A6B',
        dusk: '#245A78',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"ZCOOL XiaoWei"', '"Noto Sans SC"', 'serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(56, 189, 248, 0.18)',
      },
    },
  },
  plugins: [],
}
