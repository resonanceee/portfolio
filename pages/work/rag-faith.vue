<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== HERO (radial wash, editorial left) ====================== -->
    <section class="relative flex items-end overflow-hidden px-6 pt-40 pb-20 md:pt-56 md:pb-28">
      <div ref="heroBg" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,theme(colors.blue)_0%,theme(colors.indigo.900)_45%,theme(colors.ink)_85%)]"></div>
      <div class="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.05) 14px 15px);"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>

      <div class="mx-auto w-full max-w-6xl">
        <p class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cream/60 hero-eyebrow">
          Writeup &middot; AI/ML Research &middot; Open Source
        </p>
        <h1 class="font-display font-black tracking-tightest leading-[0.9] text-cream max-w-5xl"
          style="font-size: clamp(3.5rem, 11vw, 10rem);">
          RAG Faith
        </h1>
        <p class="mt-8 max-w-2xl text-lg md:text-2xl text-cream/70 leading-relaxed hero-sub">
          Measuring how faithfully retrieval-augmented answers stick to their sources —
          multilingual NLI and LLM judges across English, German, and Italian.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4 hero-meta">
          <a
            href="https://github.com/resonanceee/rag-faithfulness-eval"
            target="_blank"
            rel="noopener"
            class="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-orange"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
            Read on GitHub
          </a>
          <NuxtLink
            to="/work"
            class="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/5"
          >
            All work
          </NuxtLink>
          <span class="text-xs uppercase tracking-wider text-cream/40">MIT license &middot; Python</span>
        </div>
      </div>
    </section>

    <!-- ====================== STANDFIRST (scrub reveal) ====================== -->
    <section class="px-6 py-24 md:py-36 border-t border-cream/5">
      <div class="mx-auto max-w-4xl">
        <p ref="scrubText" class="font-display text-2xl md:text-4xl leading-snug font-medium text-cream scrub-word">
          <span v-for="(w, i) in scrubWords" :key="i" class="inline-block mr-[0.25em] opacity-20">{{ w }}</span>
        </p>
      </div>
    </section>

    <!-- ====================== WRITEUP BODY (placeholder sections) ====================== -->
    <section class="px-6 pb-24 md:pb-36">
      <div class="mx-auto max-w-2xl">
        <article class="flex flex-col gap-20 md:gap-28">
          <section
            v-for="(s, i) in sections"
            :key="s.title"
            class="writeup-section"
          >
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              {{ s.title }}
            </h2>
            <div class="rounded-2xl border border-dashed border-cream/25 bg-indigo-900/20 px-7 py-10 text-cream/40 text-sm leading-relaxed">
              Placeholder — your writeup for &ldquo;{{ s.title }}&rdquo; goes here.
            </div>
          </section>
        </article>
      </div>
    </section>

    <!-- ====================== CTA (GitHub) ====================== -->
    <section class="px-6 py-32 md:py-48 border-t border-cream/5">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="font-display font-black tracking-tightest leading-[0.95] text-cream"
          style="font-size: clamp(2.5rem, 8vw, 6rem);">
          Read the code.
        </h2>
        <p class="mt-6 text-lg text-cream/60 max-w-xl mx-auto">
          Benchmarks, judge harness, and reproducible results — all open source.
        </p>
        <a
          href="https://github.com/resonanceee/rag-faithfulness-eval"
          target="_blank"
          rel="noopener"
          class="mt-12 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-ink transition-all duration-300 hover:bg-cream shadow-xl shadow-orange/20"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
          resonanceee/rag-faithfulness-eval
        </a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGsap } from '~/composables/useGsap';

const { gsap, ScrollTrigger } = useGsap();

const heroBg = ref(null);
const scrubText = ref(null);

// ponytail: sections inline — static writeup, no CMS. Replace placeholder blocks with prose.
const sections = [
  { title: 'Motivation' },
  { title: 'The approach' },
  { title: 'Results' },
  { title: 'What I learned' },
];

const scrubSentence = 'LLM judges look confident. NLI judges look cheap. Neither is faithful enough alone — so I benchmarked both, across three languages, and kept the receipts.';
const scrubWords = scrubSentence.split(' ');

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    // hero: fade the gradient backdrop as you scroll past
    if (heroBg.value) {
      gsap.to(heroBg.value, {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroBg.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    gsap.from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.6, delay: 0.05, ease: 'power2.out' });
    gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: 'power2.out' });
    gsap.from('.hero-meta', { opacity: 0, y: 20, duration: 0.8, delay: 0.5, ease: 'power2.out' });

    // standfirst: words scrub 0.2 -> 1 as you scroll through
    if (scrubText.value) {
      gsap.to(scrubText.value.querySelectorAll('span'), {
        opacity: 1,
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: scrubText.value,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: true,
        },
      });
    }

    // writeup sections: stagger fade-up
    gsap.utils.toArray('.writeup-section').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  });
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>
