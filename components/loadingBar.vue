<template>
  <div
    v-if="visible"
    class="loading-bg"
    :class="{ 'fade-out': fadeOut }"
  >
    <p class="loading-text">Resonance</p>
    <div class="loading-bar"></div>
    <p class="loading-tip" v-if="windowWidth !== null && isMobile">Try rotating your device</p>
    <p class="loading-tip" v-if="windowWidth !== null && !isMobile">Move your mouse around</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// ponytail: cookie-gated so returning visitors skip the loader; set client-only to avoid SSR hydration mismatch
const hasShownLoadingBar = useCookie('has-shown-loading-bar', { default: () => false });

const visible = ref(!hasShownLoadingBar.value);
const fadeOut = ref(false);
const windowWidth = ref(null);

const isMobile = computed(() => windowWidth.value !== null && windowWidth.value <= 768);

let resizeListener = null;
let fadeTimer = null;
let removeTimer = null;

onMounted(() => {
  if (!process.client) return;

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

<style scoped>
.loading-bg {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #1a2230;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffedc0;
  font-family: "Cabinet Grotesk", "Barlow", ui-sans-serif, system-ui, sans-serif;
  transition: opacity 1s;
  animation: bgPulse 5s infinite alternate;
}

@keyframes bgPulse {
  0% { background-color: #1a2230; }
  100% { background-color: #232838; }
}

.loading-text {
  margin-bottom: 30px;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  animation: hover 2s infinite cubic-bezier(0.42, 0, 0.58, 1), pulse 2.5s infinite;
}

.loading-tip {
  margin-top: 30px;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: rgba(255, 237, 192, 0.5);
}

@keyframes hover {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.loading-bar {
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, #ffedc0 0%, #efa819 45%, #ee856e 100%);
  background-size: 200% 100%;
  animation: load 1.1s forwards, moveGradient 1s infinite alternate;
  box-shadow: 0 0 12px rgba(239, 168, 25, 0.4);
  border-radius: 4px;
}

@keyframes load {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes moveGradient {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 0%; }
}

.fade-out {
  opacity: 0;
}
</style>
