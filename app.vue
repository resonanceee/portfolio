<template>
  <NuxtLayout name="default" />
  <NuxtPage />
</template>

<script>
// eventually will need to change this to nuxt-parallax
export default {
    mounted() {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js';
        document.head.appendChild(script1);
    }
}
</script>