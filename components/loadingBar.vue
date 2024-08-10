<template>
  <div v-if="visible" class="bg" :class="{ 'fade-out': fadeOut }">
    <div class="loading-bar"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const visible = ref(false);
const fadeOut = ref(false);

onMounted(() => {
  const hasShownLoadingBar = sessionStorage.getItem('hasShownLoadingBar');

  if (!hasShownLoadingBar) {
    visible.value = true;
    sessionStorage.setItem('hasShownLoadingBar', 'true');
  }

  setTimeout(() => {
    fadeOut.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 1000);
  }, 1500);
});
</script>

<style>
.bg {
  background-color: #4c217e;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: opacity 1s;
}

.loading-bar {
  width: 0;
  height: 4px;
  background-color: #fff;
  animation: load 3s forwards;
}

@keyframes load {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.fade-out {
  opacity: 0;
}
</style>