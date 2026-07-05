<template>
  <!-- Global loading overlay to avoid flash of unstyled content -->
  <LoadingBar />
  <NuxtLayout name="default" />
  <NuxtPage />
  
</template>

<script>
export default {
  name: 'App'
}
</script>