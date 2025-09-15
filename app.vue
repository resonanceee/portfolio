<template>
  <!-- Global loading overlay to avoid flash of unstyled content -->
  <LoadingBar />
  <NuxtLayout name="default" />
  <NuxtPage />
  
</template>

<script>
export default {
  mounted() {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js';
    script1.defer = true;
    document.head.appendChild(script1);
  }
}
</script>