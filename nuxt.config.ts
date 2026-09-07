export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      title: "Resonance — AI/ML Engineer",
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  compatibilityDate: '2024-07-13',
});
