<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate" @mousemove="handleMouseMove">
    <!-- ambient blobs -->
    <div class="absolute top-1/4 left-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-purple/15 blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange/10 blur-[140px] pointer-events-none"></div>

    <section class="min-h-screen flex items-center justify-center px-6 py-32 md:py-48">
      <div class="mx-auto w-full max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-px rounded-3xl overflow-hidden border border-cream/10 bg-cream/5 backdrop-blur-sm">

          <!-- LEFT: headline -->
          <div class="relative bg-indigo-900/60 p-10 md:p-16 flex flex-col justify-center">
            <p class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cream/50">Contact</p>
            <h1 class="font-display font-black tracking-tightest leading-[0.95] text-cream"
              style="font-size: clamp(2.75rem, 6vw, 5rem);">
              Let&rsquo;s<br />talk.
            </h1>
            <p class="mt-8 max-w-md text-lg md:text-xl text-cream/65 leading-relaxed">
              Open to AI/ML research, developer tooling, and ambitious side projects.
              Currently building at WaveLab.
            </p>
            <div class="mt-10 flex items-center gap-2 text-sm text-cream/40">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
              </span>
              available for select work
            </div>
          </div>

          <!-- RIGHT: links -->
          <div class="bg-ink/60 p-10 md:p-16 flex flex-col justify-center gap-10">
            <div>
              <p class="text-xs font-medium uppercase tracking-[0.25em] text-orange mb-3">Email</p>
              <a
                href="mailto:res@onance.dev"
                class="group inline-flex items-center gap-2 font-display text-2xl md:text-3xl font-semibold text-cream hover:text-orange transition-colors contact-link"
              >
                res@onance.dev
                <svg class="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </a>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-[0.25em] text-orange mb-3">GitHub</p>
              <a
                href="https://github.com/resonanceee"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-2 font-display text-2xl md:text-3xl font-semibold text-cream hover:text-orange transition-colors contact-link"
              >
                @resonanceee
                <svg class="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </a>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-[0.25em] text-orange mb-3">Currently</p>
              <a
                href="https://wavelab.space"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-2 font-display text-2xl md:text-3xl font-semibold text-cream hover:text-orange transition-colors contact-link"
              >
                WaveLab
                <svg class="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </a>
              <p class="mt-2 text-sm text-cream/45">AI/ML research · smart EV charging</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom cursor bubble (desktop only) -->
    <div v-if="!isMobile" class="bubble" :class="{ hovered: isHovered }" :style="bubbleStyle">
      <span v-if="isHovered">click</span>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const bubbleStyle = ref({ left: '0px', top: '0px' });
const isMobile = ref(false);
const isHovered = ref(false);

onMounted(() => {
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches;
  const noHover = window.matchMedia?.('(hover: none)')?.matches;
  isMobile.value = Boolean(coarse && noHover);
});

const handleMouseMove = (event) => {
  if (isMobile.value) return;
  const { clientX, clientY } = event;
  bubbleStyle.value = {
    left: `${clientX - 25}px`,
    top: `${clientY - 25}px`,
  };
  const el = document.elementFromPoint(clientX, clientY);
  isHovered.value = !!(el && el.closest('a.contact-link'));
};
</script>

<style scoped>
/* ponytail: cursor:none only on precise-pointer devices, avoids hydration flicker on touch */
@media (hover: hover) and (pointer: fine) {
  main, .contact-link, .bubble {
    cursor: none;
  }
}

.bubble {
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
  transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease, transform 0.3s ease;
}

.bubble.hovered {
  width: 90px;
  height: 50px;
  border-radius: 20px 20px 20px 0;
  background: #efa819;
  mix-blend-mode: normal;
  transform: scale(1.05);
}
</style>
