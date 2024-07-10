export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js', defer: true },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js', defer: true },
        { src: '/script.js', defer: true }
      ],
    },
  },
  css: [
    '~/assets/css/global.css'
  ],
});