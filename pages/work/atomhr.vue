<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== HERO ====================== -->
    <section class="relative flex items-end overflow-hidden px-6 pt-40 pb-20 md:pt-56 md:pb-28">
      <div ref="heroBg" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,theme(colors.orange)_0%,theme(colors.indigo.900)_45%,theme(colors.ink)_85%)]"></div>
      <div class="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.05) 14px 15px);"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>

      <div class="mx-auto w-full max-w-6xl">
        <p class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cream/60 hero-eyebrow">
          Case study &middot; Startup &middot; Apr&ndash;Sep 2025
        </p>
        <h1 class="font-display font-black tracking-tightest leading-[0.9] text-cream max-w-5xl"
          style="font-size: clamp(3.5rem, 11vw, 10rem);">
          AtomHR
        </h1>
        <p class="mt-8 max-w-2xl text-lg md:text-2xl text-cream/70 leading-relaxed hero-sub">
          An HR platform for Italian small businesses where the employment contract writes
          itself, both parties sign on their phones, and HR finally knows who&rsquo;s on
          holiday next week.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4 hero-meta">
          <a
            href="#what-happened"
            class="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-orange"
          >
            Why we stopped
          </a>
          <NuxtLink
            to="/work"
            class="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/5"
          >
            All work
          </NuxtLink>
          <span class="text-xs uppercase tracking-wider text-cream/40">Three co-founders &middot; working alpha &middot; pilot stage</span>
        </div>
      </div>
    </section>

    <!-- ====================== STANDFIRST ====================== -->
    <section class="px-6 py-24 md:py-36 border-t border-cream/5">
      <div class="mx-auto max-w-4xl">
        <p ref="scrubText" class="font-display text-2xl md:text-4xl leading-snug font-medium text-cream scrub-word">
          <span v-for="(w, i) in scrubWords" :key="i" class="inline-block mr-[0.25em] opacity-20">{{ w }}</span>
        </p>
      </div>
    </section>

    <!-- ====================== WRITEUP BODY ====================== -->
    <section class="px-6 pb-24 md:pb-36">
      <div class="mx-auto max-w-2xl">
        <article class="flex flex-col gap-20 md:gap-28">

          <!-- The problem -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The problem
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                Hiring someone in Italy involves a surprising amount of paper. Employment
                contracts follow national collective agreements, the CCNL, and there are
                dozens of them, each with its own rules about roles, levels, and notice
                periods. Most small businesses don&rsquo;t have an HR department that knows
                these by heart; they have one person doing HR alongside three other jobs,
                copying last year&rsquo;s contract and hoping the clauses still apply.
              </p>
              <p>
                The existing HR software doesn&rsquo;t really help them. The serious tools
                are built and priced for companies with hundreds of employees, and the
                cheap ones are little more than shared drives with a logo. We figured a
                small Italian company should be able to hire someone in an afternoon
                instead of a week.
              </p>
            </div>
          </section>

          <!-- What we built -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              What we built
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                AtomHR was a complete hiring-to-day-one flow, built around an LLM doing
                the drafting work and a human confirming the parts that carry legal
                weight:
              </p>
              <ul class="space-y-4 pt-2">
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>HR sends a magic link; the new hire fills in their details plus whatever custom fields the company needs (contract data, sure, t-shirt size, also fine). They&rsquo;re auto-assigned to teams, which later feeds company statistics.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>The LLM drafts the employment contract from the job details. It suggests the right CCNL from the role description; <strong class="text-cream">the HR manager confirms it</strong>. A machine proposing and a human approving turned out to be the design people trusted.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>Around ten minutes of automated checks later, the contract lands in the company&rsquo;s document cloud. Whoever has signing power gets notified, verifies with 2FA on their phone, and signs with an advanced electronic signature (qualified signatures were in progress). Both parties sign, and the signed copy is stored with full timestamps and metadata.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>After signing, the new hire unlocks the rest: shared documents, a leave calendar showing HR what percentage of staff is already absent on the days being requested (so approvals happen with staffing in mind, not blindly), anonymous surveys, and a clock-in/out module for companies that need one.</span></li>
              </ul>
            </div>
          </section>

          <!-- Product walkthrough gif -->
          <figure class="writeup-section">
            <div class="demo-frame overflow-hidden rounded-2xl border border-cream/10">
              <img
                src="/atomhr-flow.gif"
                alt="AtomHR product walkthrough: job postings and talent flows"
                class="block w-full will-change-transform"
                loading="lazy"
              />
            </div>
            <figcaption class="mt-3 text-sm text-cream/40">
              The product in motion. From the original pitch deck.
            </figcaption>
          </figure>

          <!-- The team -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The team
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                Three co-founders, all developers. I owned the AI side (the agentic
                contract pipeline) and shared regular front- and backend work.
                <a href="https://syswhite.dev/" target="_blank" rel="noopener" class="text-cream underline decoration-cream/30 hover:decoration-orange underline-offset-4">Michele</a>
                built the auth system and most of the non-AI codebase. Hamza covered
                features too, but carried most of what makes a company a company:
                outreach, legal, and operations.
              </p>
            </div>
          </section>

          <!-- What happened -->
          <section id="what-happened" class="writeup-section scroll-mt-24">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              What happened
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                The alpha worked end to end, and we got pilot conversations going with a
                handful of companies. That&rsquo;s where we ran into the wall that
                mattered: trust. Not trust in us; trust in the idea. Italian small
                businesses run a lot of their processes through work consultants, partly
                because those consultants understand an uncomfortable truth: many SMEs
                operate in legal gray areas around tax and liability, and they want a
                professional between them and anything that automates compliance. A
                purely AI-generated contract made people nervous in a way no feature
                list could fix.
              </p>
              <p>
                So we started onboarding a work consultant who could operate alongside the
                platform; human expertise riding on top of the automation. And right in
                the middle of that, the opportunity to join WaveLab showed up. Real
                product, real team, work I already cared about. We looked at both paths
                honestly: AtomHR needed months of slow, trust-heavy selling to reach its
                first yes, and WaveLab needed builders now. We chose, and I don&rsquo;t
                regret choosing.
              </p>
            </div>
          </section>

          <!-- What stuck with me -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              What stuck with me
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                In markets that smell like regulation, the technology is rarely the hard
                part; distribution and trust are. Our best design decision had nothing
                to do with model quality: having the AI propose and a human confirm is
                what made the product feel safe enough to try.
              </p>
              <p>
                And one thing that had nothing to do with engineering: knowing when to
                stop pushing something out of pride. The product worked and the pilot
                conversations were real, but the better opportunity was clear. Walking
                away felt wrong at the time; it doesn&rsquo;t anymore.
              </p>
            </div>
          </section>

        </article>
      </div>
    </section>

    <!-- ====================== CTA ====================== -->
    <section class="px-6 py-32 md:py-48 border-t border-cream/5">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="font-display font-black tracking-tightest leading-[0.95]"
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

const heroBg = ref(null);
const scrubText = ref(null);

const scrubSentence = 'We built software that turned hiring someone in Italy from a week of paperwork into an afternoon; then walked away from it for a better opportunity.';
const scrubWords = scrubSentence.split(' ');

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
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
