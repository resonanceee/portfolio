/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#3c3f58',
          900: '#2a2c40',
          800: '#33354d',
        },
        ink: '#1a2230',
        orange: {
          DEFAULT: '#efa819',
        },
        cream: '#ffedc0',
        purple: '#6d4ab1',
        blue: '#4253f1',
        coral: '#ee856e',
      },
      fontFamily: {
        // ponytail: Cabinet Grotesk loaded via Fontshare CDN link in nuxt.config;
        // Barlow kept as fallback so first paint never breaks if CDN is slow
        display: ['"Cabinet Grotesk"', 'Barlow', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Cabinet Grotesk"', 'Barlow', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        '5xl': '64rem',
        '6xl': '72rem',
      },
    },
  },
  plugins: [],
};
