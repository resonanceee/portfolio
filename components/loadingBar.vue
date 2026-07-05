<template>
  <div
    v-if="visible"
    class="bg"
    :class="{ 'fade-out': fadeOut }"
    style="position:fixed;inset:0;z-index:9999;background:#3c3f58;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;"
  >
    <p class="loading-text">Loading</p>
    <div class="loading-bar"></div>
    <p class="loading-tip" v-if="windowWidth !== null && isMobile">Try rotating your device</p>
    <p class="loading-tip" v-if="windowWidth !== null && !isMobile">Try moving your mouse around</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const hasShownLoadingBar = useCookie('has-shown-loading-bar', { default: () => false });

const visible = ref(!hasShownLoadingBar.value);
const fadeOut = ref(false);
const windowWidth = ref(null);

// ponytail: cookie set client-only in onMounted to avoid SSR/client hydration mismatch
const isMobile = computed(() => windowWidth.value !== null && windowWidth.value <= 768);

let resizeListener = null;
let fadeTimer = null;
let removeTimer = null;

onMounted(() => {
  if (!process.client) return;

  // Set cookie client-side so SSR and hydration agree on `visible`
  if (!hasShownLoadingBar.value) {
    hasShownLoadingBar.value = true;
  }

  windowWidth.value = window.innerWidth;
  resizeListener = () => { windowWidth.value = window.innerWidth; };
  window.addEventListener('resize', resizeListener);

  if (visible.value) {
    // ponytail: load animation is 1.1s; fade starts at 1175ms so bar fills just before fade
    fadeTimer = setTimeout(() => {
      fadeOut.value = true;
      removeTimer = setTimeout(() => {
        visible.value = false;
      }, 1000);
    }, 1175);
  }
});

onBeforeUnmount(() => {
  if (resizeListener) window.removeEventListener('resize', resizeListener);
  if (fadeTimer) clearTimeout(fadeTimer);
  if (removeTimer) clearTimeout(removeTimer);
});
</script>

<style>
.bg {
  background-color: #3c3f58;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: opacity 1s;
  flex-direction: column;
  animation: bgAnimation 5s infinite alternate;
}

@keyframes bgAnimation {
  0% {
    background-color: #3c3f58;
  }
  100% {
    background-color: #404468;
  }
}

.loading-text {
  margin-bottom: 30px;
  font-size: clamp(1.75rem, 2.25vw, 2.25rem);
  animation: hover 2s infinite cubic-bezier(0.42, 0, 0.58, 1), pulse 2.5s infinite;
}

.loading-tip {
  margin-top: 30px;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

@keyframes hover {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.loading-bar {
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, #ffedc0 0%, #dfc086 45%, #ee856e 100%);
  background-size: 200% 100%;
  animation: load 1.1s forwards, moveGradient 1s infinite alternate;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

@keyframes load {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes moveGradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

.fade-out {
  opacity: 0;
}
</style>