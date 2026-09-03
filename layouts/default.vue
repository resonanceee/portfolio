<template>
  <div class="nav-root">
    <!-- Floating glass pill nav (desktop) -->
    <nav
      class="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-ink/40 backdrop-blur-xl px-2 py-2 shadow-2xl shadow-black/40"
      aria-label="Primary"
    >
      <NuxtLink
        v-for="item in links"
        :key="item.to"
        :to="item.to"
        class="relative px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-300"
        :class="isActive(item.to)
          ? 'text-ink bg-cream'
          : 'text-cream/70 hover:text-cream'"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <!-- Mobile hamburger trigger -->
    <button
      class="fixed top-5 right-5 z-50 md:hidden flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-ink/40 backdrop-blur-xl"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation menu"
      @click="toggle"
    >
      <span class="relative block h-4 w-6">
        <span
          class="absolute left-0 block h-0.5 w-6 bg-cream transition-all duration-300"
          :class="isOpen ? 'top-2 rotate-45' : 'top-0'"
        ></span>
        <span
          class="absolute left-0 top-2 block h-0.5 w-6 bg-cream transition-all duration-300"
          :class="isOpen ? 'opacity-0' : 'opacity-100'"
        ></span>
        <span
          class="absolute left-0 block h-0.5 w-6 bg-cream transition-all duration-300"
          :class="isOpen ? 'top-2 -rotate-45' : 'top-4'"
        ></span>
      </span>
    </button>

    <!-- Mobile full-screen overlay -->
    <Transition name="overlay">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-2xl md:hidden"
      >
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="font-display text-4xl font-light tracking-wide text-cream transition-colors hover:text-orange"
          @click="close"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>

    <slot />

    <!-- Custom cursor bubble (desktop only) — ponytail: lives in layout so every page gets it -->
    <div v-if="!isMobile" class="cursor-bubble" :class="{ hovered: isHovered, dimmed: isDimmed }" :style="bubbleStyle">
      <span v-if="isHovered">click</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const route = useRoute();
const links = [
  { to: '/', label: 'home' },
  { to: '/work', label: 'work' },
  { to: '/contact', label: 'contact' },
];

const isOpen = ref(false);

// ponytail: close overlay on route change so back/forward doesn't leave it stuck open
watch(() => route.path, () => { isOpen.value = false; });

function isActive(path) {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
}

function toggle() { isOpen.value = !isOpen.value; }
function close() { isOpen.value = false; }

// ponytail: one global mousemove drives the cursor bubble + link-hover morph for every page
const bubbleStyle = ref({ left: '-100px', top: '-100px' });
const isMobile = ref(false);
const isHovered = ref(false);
const isDimmed = ref(false);

function handleMouseMove(event) {
  const { clientX, clientY } = event;
  bubbleStyle.value = { left: `${clientX}px`, top: `${clientY}px` };
  const el = document.elementFromPoint(clientX, clientY);
  const link = el && el.closest('a');
  isHovered.value = !!link;
  const inNav = !!(el && (el.closest('nav') || el.closest('button[aria-label*="navigation"]')));
  isDimmed.value = route.path !== '/contact' || inNav;
}

onMounted(() => {
  // ponytail: matchMedia over UA sniff — catches iPad desktop-mode + modern touch devices
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches;
  const noHover = window.matchMedia?.('(hover: none)')?.matches;
  isMobile.value = Boolean(coarse && noHover);
  if (!isMobile.value) window.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style>
.nav-root {
  position: relative;
}

/* Overlay transition: slide + fade */
.overlay-enter-active, .overlay-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

/* ponytail: hide native cursor everywhere on precise-pointer devices, !important overrides UA cursor:pointer on a/button */
@media (hover: hover) and (pointer: fine) {
  * {
    cursor: none !important;
  }
}

.cursor-bubble {
  position: fixed;
  width: 50px;
  height: 50px;
  background: #ffedc0;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1a2230;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}

.cursor-bubble.dimmed {
  width: 24px;
  height: 24px;
  opacity: 0.4;
}

.cursor-bubble.hovered {
  width: 90px;
  height: 50px;
  border-radius: 20px 20px 20px 0;
  background: #efa819;
  mix-blend-mode: normal;
  transform: translate(-50%, -50%) scale(1.05);
}

.cursor-bubble.dimmed.hovered {
  width: 72px;
  height: 40px;
  opacity: 0.65;
}
</style>
