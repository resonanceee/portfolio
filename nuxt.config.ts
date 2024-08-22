export default defineNuxtConfig({
  css: [
    '~/assets/css/global.css'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  compatibilityDate: '2024-07-13',
});