<template>
      
  <NuxtLayout name="default" /> <!-- links broken-->
  <NuxtPage />
</template>

<script>
export default {
    mounted() {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js';
        document.head.appendChild(script2);
    }
}
</script>