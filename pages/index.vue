<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== ATTENTION: HERO ====================== -->
    <section class="relative flex items-center justify-center px-6 pt-40 pb-28 md:pt-56 md:pb-40 overflow-hidden">
      <!-- Dark radial wash + ambient blobs (pure CSS, no stock photo) -->
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,theme(colors.indigo.900),theme(colors.ink)_70%)]"></div>
      <div class="absolute -top-40 -left-32 -z-10 h-[36rem] w-[36rem] rounded-full bg-purple/20 blur-[140px]"></div>
      <div class="absolute -bottom-40 -right-32 -z-10 h-[36rem] w-[36rem] rounded-full bg-orange/10 blur-[140px]"></div>

      <div class="mx-auto w-full max-w-5xl text-center">
        <p class="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-cream/50 hero-eyebrow">
          Developer &amp; AI/ML Researcher
        </p>

        <!-- H1: name-first, max-w-5xl guarantees 1 line on desktop, 2 max on mobile -->
        <h1
          ref="heroName"
          class="font-display font-black tracking-tightest leading-[0.9] text-cream"
          style="font-size: clamp(3.5rem, 13vw, 11rem);"
        >
          Resonance
        </h1>

        <!-- Sub with inline pill linking WaveLab, EV charging icon replaces the empty gradient swatch -->
        <p class="mx-auto mt-10 max-w-2xl text-lg md:text-2xl font-medium leading-relaxed text-cream/70 hero-sub">
          Currently building AI/ML systems at
          <a
            href="https://wavelab.space"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 align-middle mx-1 rounded-full pl-1.5 pr-3 py-1 bg-cream/10 border border-cream/20 hover:bg-cream/20 hover:border-cream/40 transition-all duration-300 group"
          >
            <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange/20 shrink-0">
              <svg class="h-4 w-4 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 2v5"/><path d="M15 2v5"/><rect x="4" y="7" width="14" height="13" rx="2"/><path d="M12 11l-2.5 4.5h3L10 20"/>
              </svg>
            </span>
            <span class="text-cream font-semibold">WaveLab</span>
            <svg class="h-3.5 w-3.5 text-cream/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
          </a>
          <br class="hidden md:block" />a smart EV charging platform.
        </p>

        <!-- Two CTAs, perfect contrast -->
        <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta">
          <NuxtLink
            to="/work"
            class="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-base font-semibold text-ink transition-all duration-300 hover:bg-orange hover:text-ink shadow-lg shadow-black/30"
          >
            See work
            <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-base font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/5"
          >
            Get in touch
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ====================== INTEREST: FEATURED MINI-BENTO ====================== -->
    <section class="px-6 py-32 md:py-48">
      <div class="mx-auto max-w-6xl">
        <div class="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 class="font-display text-4xl md:text-6xl font-bold tracking-tightest text-cream">
            Selected work
          </h2>
          <NuxtLink to="/work" class="text-sm font-medium text-cream/60 hover:text-cream transition-colors tracking-wide">
            View all projects →
          </NuxtLink>
        </div>

        <!-- 4-card mini bento, grid-flow-dense, zero voids:
             R1: WaveLab(2) + AtomHR(1) = 3 cols
             R2: TrashTracer(1) + AI Hallucination(2) = 3 cols -->
        <div class="grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-5">
          <Project
            v-for="(p, i) in featured"
            :key="p.head"
            v-bind="p"
            variant="feature"
            :index="i"
            :class="(i === 0 || i === 3) ? 'md:col-span-2 md:row-span-1' : ''"
          />
        </div>
      </div>
    </section>

    <!-- ====================== DESIRE: SCRUB-REVEAL PARAGRAPH ====================== -->
    <section class="px-6 py-32 md:py-48 border-t border-cream/5">
      <div class="mx-auto max-w-4xl">
        <p ref="scrubText" class="font-display text-2xl md:text-4xl leading-snug font-medium text-cream scrub-word">
          <span v-for="(w, i) in scrubWords" :key="i" class="inline-block mr-[0.25em] opacity-20">{{ w }}</span>
        </p>
      </div>
    </section>

    <!-- ====================== ACTION: CTA ====================== -->
    <section class="px-6 py-32 md:py-48 border-t border-cream/5">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="font-display font-black tracking-tightest leading-[0.95] text-cream"
          style="font-size: clamp(2.5rem, 8vw, 6rem);">
          Let&rsquo;s build<br />something.
        </h2>
        <NuxtLink
          to="/contact"
          class="mt-12 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-ink transition-all duration-300 hover:bg-cream shadow-xl shadow-orange/20"
        >
          Start a conversation
          <svg class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGsap } from '~/composables/useGsap';

const { gsap, ScrollTrigger } = useGsap();

const heroName = ref(null);
const scrubText = ref(null);

const featured = [
  {
    head: 'WaveLab',
    role: 'AI/ML Research',
    text: 'Smart EV charging platform — turning charging infrastructure into a smart, connected system that generates value.',
    link: 'https://wavelab.space',
    tag: 'Current',
  },
  {
    head: 'AtomHR',
    role: 'Startup',
    text: 'AI platform slashing bureaucracy and streamlining HR for Italian startups and SMEs.',
    link: 'private',
    tag: 'Startup',
  },
  {
    head: 'TrashTracer',
    role: 'Hackathon winner',
    text: 'Large-format leaderboard for top recyclers — won awards at NOI Hackathon & Progetto Rocca.',
    link: 'https://github.com/trashtracer',
    tag: 'Award',
  },
  {
    head: 'AI Hallucination Solution',
    role: 'AI/ML',
    text: 'A solution to AI hallucinations, built in early 2023 when hallucinations were a well-known and widespread issue without a known solution — and presented to the Italian Minister of Education and Merit.',
    link: 'private',
    tag: 'AI/ML',
  },
];

const scrubSentence = "Currently building AI/ML systems at WaveLab — turning charging infrastructure into a smart, connected platform that generates value. Connect, activate, grow.";
const scrubWords = scrubSentence.split(' ');

let ctx;

onMounted(() => {
  // ponytail: scoped gsap context so animations clean up on route change
  ctx = gsap.context(() => {
    // Hero char reveal: split the name into spans, stagger fade-up
    const name = heroName.value;
    if (name) {
      const text = name.textContent;
      name.innerHTML = '';
      [...text].forEach((ch) => {
        const span = document.createElement('span');
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.className = 'inline-block opacity-0';
        name.appendChild(span);
      });
      gsap.fromTo(name.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', delay: 0.15 }
      );
    }

    // Sub + CTA fade in after name
    gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, delay: 0.7, ease: 'power2.out' });
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, delay: 0.9, ease: 'power2.out' });
    gsap.from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.6, delay: 0.05, ease: 'power2.out' });

    // Scrub-reveal: words go 0.2 -> 1 opacity as you scroll through
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
  });
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>
