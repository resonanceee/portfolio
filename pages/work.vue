<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== HERO (gradient, scrub shift) ====================== -->
    <section class="relative h-screen flex items-end overflow-hidden px-6 pb-20 md:pb-28">
      <div ref="heroBg" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,theme(colors.purple)_0%,theme(colors.indigo.900)_45%,theme(colors.ink)_85%)]"></div>
      <!-- ponytail: CSS texture overlay, no external image -->
      <div class="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.05) 14px 15px);"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>

      <div class="mx-auto w-full max-w-6xl">
        <p class="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cream/60">{{ total }} projects</p>
        <h1 class="font-display font-black tracking-tightest leading-[0.9] text-cream"
          style="font-size: clamp(3.5rem, 13vw, 11rem);">
          Work
        </h1>
        <p class="mt-6 max-w-xl text-lg md:text-xl text-cream/70 leading-relaxed">
          A mix of startups, research, hackathon wins, and open-source contributions —
          with a focus on AI/ML and developer experience.
        </p>
      </div>
    </section>

    <!-- ====================== BENTO GRID (gapless, grid-flow-dense) ====================== -->
    <section class="px-6 py-24 md:py-32">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 flex items-end justify-between">
          <h2 class="font-display text-3xl md:text-5xl font-bold tracking-tightest">Featured</h2>
          <p class="text-sm text-cream/40 hidden md:block">hover to reveal</p>
        </div>

        <!-- 4-col × 3-row bento, grid-flow-dense, zero voids:
             R1: WaveLab(2) + AtomHR(2) = 4
             R2: WaveLab(cont 2) + TrashTracer(1) + Weather(1) = 4
             R3: EyeHide(2) + Stats(2) = 4 -->
        <div class="grid grid-cols-1 md:grid-cols-4 grid-flow-dense gap-4 md:gap-5 auto-rows-[minmax(220px,auto)]">
          <Project v-bind="bento.wavelab" variant="bento" :index="0" class="md:col-span-2 md:row-span-2" />
          <Project v-bind="bento.atomhr" variant="bento" :index="1" class="md:col-span-2 md:row-span-1" />
          <Project v-bind="bento.trashtracer" variant="bento" :index="2" class="md:col-span-1 md:row-span-1" />
          <Project v-bind="bento.codegram" variant="bento" :index="3" class="md:col-span-1 md:row-span-1" />
          <Project v-bind="bento.eyehide" variant="bento" :index="4" class="md:col-span-2 md:row-span-1" />
          <div class="md:col-span-2 md:row-span-1 rounded-2xl border border-cream/10 bg-indigo-900/40 p-7 flex flex-col justify-between">
            <p class="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight text-cream">
              By the numbers
            </p>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p class="font-display text-4xl md:text-5xl font-black text-orange">{{ stats.startups }}</p>
                <p class="text-xs uppercase tracking-wider text-cream/50 mt-1">startups</p>
              </div>
              <div>
                <p class="font-display text-4xl md:text-5xl font-black text-cream">{{ stats.awards }}</p>
                <p class="text-xs uppercase tracking-wider text-cream/50 mt-1">awards</p>
              </div>
              <div>
                <p class="font-display text-4xl md:text-5xl font-black text-coral">{{ stats.odh }}</p>
                <p class="text-xs uppercase tracking-wider text-cream/50 mt-1">ODH projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================== HORIZONTAL ACCORDION (remaining work) ====================== -->
    <section class="px-6 py-24 md:py-32 border-t border-cream/5">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12">
          <h2 class="font-display text-3xl md:text-5xl font-bold tracking-tightest">More work</h2>
          <p class="mt-3 text-cream/50 max-w-lg">Hover or scroll to explore.</p>
        </div>

        <!-- accordion: flex row, slices expand on hover -->
        <div ref="accordion" class="flex flex-col md:flex-row gap-3 md:gap-4 h-[60vh] md:h-[480px]">
          <Project
            v-for="(p, i) in accordionProjects"
            :key="p.head"
            v-bind="p"
            variant="accordion"
            :index="i"
            :open="openIndex === i"
            @open="openIndex = $event"
          />
        </div>
      </div>
    </section>

    <!-- ====================== HONORS & AWARDS ====================== -->
    <section class="px-6 py-24 md:py-32 border-t border-cream/5">
      <div class="mx-auto max-w-4xl">
        <div class="mb-12">
          <h2 class="font-display text-3xl md:text-5xl font-bold tracking-tightest">Honors &amp; awards</h2>
          <p class="mt-3 text-cream/50 max-w-lg">Recognition from hackathons, competitions, and academic excellence.</p>
        </div>

        <ul class="divide-y divide-cream/10">
          <li
            v-for="(a, i) in awards"
            :key="i"
            class="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-5 transition-colors"
          >
            <span class="font-mono text-sm text-orange/80 md:w-28 shrink-0">{{ a.date }}</span>
            <div class="flex-1">
              <p class="font-display text-lg md:text-xl font-semibold text-cream group-hover:text-orange transition-colors">{{ a.title }}</p>
              <p class="text-sm text-cream/50 mt-1">{{ a.issuer }}</p>
              <p v-if="a.detail" class="text-sm text-cream/40 mt-2 max-w-2xl">{{ a.detail }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ====================== CTA ====================== -->
    <section class="px-6 py-32 md:py-48 border-t border-cream/5">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="font-display font-black tracking-tightest leading-[0.95]"
          style="font-size: clamp(2.5rem, 8vw, 6rem);">
          Want to build<br />together?
        </h2>
        <NuxtLink
          to="/contact"
          class="mt-12 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-ink transition-all duration-300 hover:bg-cream shadow-xl shadow-orange/20"
        >
          Get in touch
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGsap } from '~/composables/useGsap';

const { gsap, ScrollTrigger } = useGsap();

const heroBg = ref(null);
const accordion = ref(null);
const openIndex = ref(0); // first slice open by default

// ponytail: project data stays inline — static portfolio, no CMS needed. No stock images — cards use CSS gradients.
const bento = {
  wavelab: {
    head: 'WaveLab',
    role: 'AI/ML Research',
    org: 'Current',
    text: 'Smart EV charging platform. Currently leading AI/ML research: turning charging infrastructure into a smart, connected platform that generates value. Connect, activate, grow. Trusted by CDP, ELIS, NOI Techpark, Plug and Play.',
    link: 'https://wavelab.space',
    tag: 'Current',
  },
  atomhr: {
    head: 'AtomHR',
    role: 'Startup',
    org: 'Independent',
    text: 'AI platform that slashes bureaucracy and streamlines HR processes for Italian startups and SMEs.',
    link: 'private',
    tag: 'Startup',
  },
  trashtracer: {
    head: 'TrashTracer',
    role: 'Hackathon winner',
    org: 'Independent',
    text: 'Large-format leaderboard for top recyclers to encourage eco-friendly behaviour. Won awards at NOI Hackathon 2022 and Progetto Rocca.',
    link: 'https://github.com/trashtracer',
    tag: 'Award',
  },
  codegram: {
    head: 'Codegram',
    role: 'Side project',
    org: 'Independent',
    text: 'Developer tool — see codegram.fyi.',
    link: 'https://codegram.fyi',
    tag: 'Dev tool',
  },
  eyehide: {
    head: 'EyeHide',
    role: 'Startup',
    org: 'Independent',
    text: 'Privacy-first hardware and software safeguarding users against the growing risks of AI and large language models. A secure digital experience without compromising privacy.',
    link: 'private',
    tag: 'Startup',
  },
};

const accordionProjects = [
  {
    head: 'AI Hallucination Solution',
    role: 'AI/ML',
    org: 'Galileo Galilei',
    text: 'A solution to AI hallucinations, built at the Galileo Galilei high school in early 2023 — at a time when hallucinations were already a well-known and widespread issue without a known solution — and presented to the Italian Minister of Education and Merit. Team project with Gennaro Iaccarino and Michele Magri.',
    link: 'private',
    tag: 'AI/ML',
  },
  {
    head: 'Localbrain',
    role: 'Open Source',
    org: 'bCommonsLAB',
    text: 'Open-source LLM platform. Contributed the option to run open-source LLMs on local hardware and expose that hardware to other users of the service as a decentralized hardware network.',
    link: 'https://github.com/bCommonsLAB/LocalBrain',
    tag: 'OSS',
  },
  {
    head: 'ODH Data Quality',
    role: 'Project',
    org: 'ODH',
    text: 'Data quality checker for the NOI / Open Data Hub — automated validation tool ensuring accuracy and consistency of data within the Open Data Hub.',
    link: 'https://github.com/noi-techpark/automated-data-quality-monitoring-tool/',
    tag: 'ODH',
  },
  {
    head: 'WaveLab Station',
    role: 'Computer Vision',
    org: 'WaveLab',
    text: 'Enhances the EV charging experience with computer vision — live-feed analysis of misuse, user mood, and personalized recommendations for nearby attractions. Confidential per WaveLab.',
    link: 'private',
    tag: 'CV',
  },
  {
    head: 'ACS Emissions',
    role: 'Dashboard',
    org: 'ACS',
    text: 'Dashboard tracking mobility emissions for ACS Data Systems.',
    link: 'https://github.com/SysWhiteDev/ACS-Challenge-2023',
    tag: 'Data',
  },
  {
    head: 'Weather Component',
    role: 'Project',
    org: 'ODH',
    text: 'Modular web component visualizing Open Data Hub weather data — live map, forecasts, webcams, dark/light mode. Featured on the ODH website.',
    link: 'https://weather.syswhite.dev/',
    tag: 'ODH',
  },
];

// ponytail: counts reflect displayed projects — startups (AtomHR, EyeHide), ODH (Weather, Data Quality), awards (6 honors below)
const stats = { startups: 2, awards: 6, odh: 2 };
const total = 11;

// ponytail: honors & awards from LinkedIn — sorted newest event first; date = event date, issuer = recognizing body
const awards = [
  {
    date: 'Jan 2024',
    title: 'Certificate of Merit for Excellence',
    issuer: 'Autonomous Province of Bolzano — South Tyrol',
    detail: 'Outstanding achievement at the FIRST Lego League competition in Rovereto (Jan 21, 2024), as a student at G. Galilei High School (LSSA program).',
  },
  {
    date: 'Nov 2023',
    title: 'Certificate of Merit for Excellence',
    issuer: 'Autonomous Province of Bolzano — South Tyrol',
    detail: 'Outstanding performance at the NOI Hackathon SFSCON Edition (Nov 10–11, 2023) at NOI Techpark, Bolzano.',
  },
  {
    date: 'Nov 2023',
    title: 'Winner, Premio Fabrizio Rocca',
    issuer: 'Premio Fabrizio Rocca',
    detail: 'Recognized for an app that makes recycling more engaging through gamification.',
  },
  {
    date: 'Nov 2022',
    title: 'NOI Hackathon SFScon Edition Winner',
    issuer: 'ACS Data Systems AG',
    detail: 'Won the 24-hour hackathon using Large Format Displays (LFD) to enhance user engagement and promote awareness on a sponsor challenge.',
  },
  {
    date: 'Nov 2022',
    title: 'Certificate of Merit for Excellence',
    issuer: 'Autonomous Province of Bolzano — South Tyrol',
    detail: 'Outstanding performance at the NOI Hackathon SFSCON Edition (Nov 11–12, 2022) at NOI Techpark, Bolzano.',
  },
  {
    date: 'May 2022',
    title: 'Certificate of Honorable Mention',
    issuer: 'Autonomous Province of Bolzano — South Tyrol',
    detail: 'Honorable mention at the BR41N.io Brain-Computer Interface Designers Hackathon (Apr 30 – May 1, 2022) at NOI Techpark, Bolzano.',
  },
];

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    // hero: fade the gradient backdrop as you scroll past — pure CSS bg, no image to scale
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

    // bento cards: stagger fade-up on enter
    // ponytail: immediateRender:false so opacity:0 only applies when ScrollTrigger fires, not on load — prevents cards stuck invisible
    gsap.utils.toArray('.grid > *').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: card, start: 'top 88%' },
      });
    });

    // accordion: stagger the slices in
    if (accordion.value) {
      gsap.from(accordion.value.children, {
        opacity: 0,
        x: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: accordion.value, start: 'top 80%' },
      });
    }
  });
  // ponytail: refresh after a tick so trigger positions match the final layout — fixes sections stuck invisible
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>
