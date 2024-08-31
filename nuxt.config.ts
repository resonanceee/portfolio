export default defineNuxtConfig({
  css: [
    '~/assets/css/global.css'
  ],
  app: {
    head: {
      title: "Resonances's Portfolio",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  compatibilityDate: '2024-07-13',
});