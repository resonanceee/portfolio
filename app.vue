<template>
  <NuxtLayout name="default" />
  <NuxtPage />
  
</template>

<script>
// ponytail: another app on localhost:3000 registers a PWA service worker that hijacks this
// origin (SWs are per host+port). If a foreign SW controls the page, install our
// self-unregistering /sw.js — it clears all caches, unregisters, reloads once, then is gone.
export default {
  name: 'App',
  mounted() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('/sw.js');
    }
  },
}
</script>