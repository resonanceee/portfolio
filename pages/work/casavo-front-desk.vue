<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== HERO (radial wash, editorial left) ====================== -->
    <section class="relative flex items-end overflow-hidden px-6 pt-40 pb-20 md:pt-56 md:pb-28">
      <div ref="heroBg" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,theme(colors.coral)_0%,theme(colors.indigo.900)_45%,theme(colors.ink)_85%)]"></div>
      <div class="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.05) 14px 15px);"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>

      <div class="mx-auto w-full max-w-6xl">
        <p class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cream/60 hero-eyebrow">
          Case study &middot; Voice AI &middot; Hack The Peak 2026
        </p>
        <h1 class="font-display font-black tracking-tightest leading-[0.9] text-cream max-w-5xl"
          style="font-size: clamp(3.5rem, 11vw, 10rem);">
          Casavo Front Desk Agent
        </h1>
        <p class="mt-8 max-w-2xl text-lg md:text-2xl text-cream/70 leading-relaxed hero-sub">
          An AI voice agent that answers Casavo&rsquo;s phone line, separates sellers from tire-kickers,
          and hands estate agents a dossier before they ring the doorbell.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4 hero-meta">
          <a
            href="#findings"
            class="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-orange"
          >
            How it scored
          </a>
          <NuxtLink
            to="/work"
            class="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/5"
          >
            All work
          </NuxtLink>
          <span class="text-xs uppercase tracking-wider text-cream/40">Bolzano &middot; Conceived, built and tested in ~24h</span>
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
                Casavo&rsquo;s phone line gets called by everyone who owns a house and has a
                Sunday-afternoon thought. Some of those callers will sign a mandate within weeks;
                others just want a free price and will never sell. A human front desk can smell the
                difference in two minutes &mdash; but humans are expensive and don&rsquo;t work Sundays.
              </p>
              <p>
                So the &ldquo;front desk&rdquo; either costs a fortune or becomes a switchboard that
                forwards every tire-kicker to an estate agent who has a family, a dinner, and better
                things to do. Every mismatched visit is an hour of a professional&rsquo;s life burned.
              </p>
            </div>
          </section>

          <!-- The solution -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The solution
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                An AI voice agent that answers like the best colleague the front desk ever had: it
                talks, it listens for what the caller doesn&rsquo;t say out loud (&ldquo;I&rsquo;ll sell
                in three months&rdquo; &mdash; while their mortgage hasn&rsquo;t been approved yet), it
                prices the property through Casavo&rsquo;s own valuation service, books a visit only
                when the caller can actually sell, and hands the agent a two-minute dossier before
                they ring the doorbell. The estate agent works the leads that matter, in order, with
                receipts.
              </p>
            </div>
          </section>

          <!-- Console demo gif -->
          <figure class="writeup-section">
            <div class="demo-frame overflow-hidden rounded-2xl border border-cream/10">
              <img
                src="/casavo-console-demo.gif"
                alt="Casavo console demo — lead queue, dossier, and bilingual transcript"
                class="block w-full will-change-transform"
                loading="lazy"
              />
            </div>
            <figcaption class="mt-3 text-sm text-cream/40">
              The agent&rsquo;s console: queue, dossier, bilingual transcript.
            </figcaption>
          </figure>

          <!-- The architecture -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The architecture
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <!-- Diagram: rendered flow, not ASCII -->
            <div class="diagram-wrap rounded-2xl border border-cream/10 bg-indigo-900/20 p-6 md:p-8">
              <!-- Caller -->
              <div class="diagram-node flex justify-center">
                <span class="rounded-full border border-cream/20 bg-ink/60 px-6 py-2 text-sm font-semibold text-cream">Caller</span>
              </div>

              <div class="diagram-node flex flex-col items-center py-2" aria-hidden="true">
                <span class="h-5 w-px bg-cream/25"></span>
                <svg class="h-3.5 w-3.5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>

              <!-- ElevenLabs agent -->
              <div class="diagram-node rounded-2xl border border-cream/15 bg-indigo-900/50 p-5">
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 class="font-display text-lg md:text-xl font-bold tracking-tight text-cream">ElevenLabs agent</h3>
                  <p class="text-sm text-cream/50">system prompt: Casavo&rsquo;s own policy docs, encoded</p>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="tool in agentTools" :key="tool" class="rounded-full border border-cream/10 bg-ink/50 px-3 py-1 font-mono text-xs text-orange/90">{{ tool }}</span>
                </div>
              </div>

              <div class="diagram-node flex flex-col items-center py-2" aria-hidden="true">
                <span class="h-5 w-px bg-cream/25"></span>
                <svg class="h-3.5 w-3.5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>

              <!-- Ingest -->
              <div class="diagram-node rounded-2xl border border-cream/15 bg-indigo-900/50 p-5">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full border border-cream/10 bg-ink/50 px-3 py-1 font-mono text-xs text-orange/90">salva_lead</span>
                  <svg class="h-3.5 w-3.5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  <h3 class="font-mono text-sm font-semibold text-cream">POST /api/public/ingest</h3>
                  <span class="text-sm text-cream/50">(Lovable app)</span>
                </div>
                <ol class="mt-4 space-y-2">
                  <li v-for="(step, i) in ingestSteps" :key="i" class="flex gap-3 text-sm text-cream/65 leading-relaxed">
                    <span class="font-mono text-orange/80 shrink-0">{{ i + 1 }}.</span>
                    <span>{{ step }}</span>
                  </li>
                </ol>
              </div>

              <div class="diagram-node flex flex-col items-center py-2" aria-hidden="true">
                <span class="h-5 w-px bg-cream/25"></span>
                <svg class="h-3.5 w-3.5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>

              <!-- Console -->
              <div class="diagram-node rounded-2xl border border-cream/15 bg-indigo-900/50 p-5">
                <h3 class="font-display text-lg md:text-xl font-bold tracking-tight text-cream">Console</h3>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="f in consoleFeatures" :key="f" class="rounded-full border border-cream/10 bg-ink/50 px-3 py-1 text-xs text-cream/70">{{ f }}</span>
                </div>
              </div>
            </div>
              <p>
                Two things in that diagram deserve a second look. The agent doesn&rsquo;t just
                transcribe &mdash; it classifies: five readiness levels from Casavo&rsquo;s own
                taxonomy, with the caller&rsquo;s literal words as evidence for why each call got its
                verdict. And the ingest layer isn&rsquo;t a pipe; it&rsquo;s armor: cards are saved
                mid-call and merged at close, opt-outs purge personal data instead of flagging it,
                and a dropped call resumes into the same card instead of birthing a duplicate.
              </p>
            </div>
          </section>

          <!-- Findings from the scored run -->
          <section id="findings" class="writeup-section scroll-mt-24">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              Findings from the scored run
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                The constraint: conceived, built, tested and submitted in roughly a day at Hack The
                Peak 2026 in Bolzano &mdash; a hackathon where 50+ teams were shipping against the
                same live mock environment throughout the day. The system scored below what the same
                components had proven hours earlier in isolation, and the reasons are the reason to
                hire someone who builds this way.
              </p>
            </div>

            <div class="mt-12 space-y-10">
              <article v-for="f in findings" :key="f.title">
                <h3 class="font-display text-xl md:text-2xl font-bold tracking-tight text-cream">
                  {{ f.title }}
                </h3>
                <div class="mt-3 space-y-4 text-cream/65 leading-relaxed">
                  <p v-for="(p, j) in f.body" :key="j">{{ p }}</p>
                </div>
                <p v-if="f.lesson" class="mt-4 text-sm text-cream/50 leading-relaxed">
                  {{ f.lesson }}
                </p>
              </article>
            </div>
          </section>

          <!-- What it proves -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              What it proves
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                This is what production-grade AI system design looks like under a deadline: not a
                demo that works once, but a system that degrades honestly &mdash; with a
                twelve-scenario automated regression battery running against the agent itself, GDPR
                handled as deletion rather than decoration, and a post-run analysis honest enough to
                list every way the environment won.
              </p>
              <p class="font-display text-2xl md:text-3xl font-medium leading-snug text-cream pt-2">
                The scoreboard said 22/75. The codebase says something more useful: every failure
                mode is named, explained, and one refactor away from fixed.
              </p>
            </div>
          </section>

        </article>
      </div>
    </section>

    <!-- ====================== CTA (matches homepage) ====================== -->
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

// ponytail: diagram data inline — static writeup, no CMS
const agentTools = [
  'agenti_citta',
  'cerca_immobile',
  'valuta_immobile',
  'slot_liberi',
  'prenota_appuntamento',
];
const ingestSteps = [
  'upsert + merge into the leads table',
  'transcript fallback via ElevenLabs API if omitted',
  'copy to the event platform',
];
const consoleFeatures = [
  'queue',
  'dossier',
  'bilingual transcript',
  'privacy controls',
];
const findings = [
  {
    title: 'Test bookings drained the live slot pool',
    body: [
      'The mock’s appointment slots were shared and finite — across all 50+ teams. We consumed 34 real appointments running our own test suite, and everyone else was doing the same. By mid-afternoon, whole cities had no free slot within 72 hours. When the judged calls came in, “book a visit” scenarios got the policy-correct fallback (“the agent has no slot — offer a callback”) instead of a booking. Correct behavior, wrong answer for a rubric written against a stocked world.',
    ],
    lesson: 'The lesson isn’t subtle: test destructive operations against stubs, and treat visibly scarce shared resources as infrastructure, not data.',
  },
  {
    title: 'One-shot card generation is fragile on long calls',
    body: [
      'The full lead card is a single, large tool-call payload. On long conversations — exactly the drop-and-resume pattern that was a known scored scenario — the final save repeatedly failed to generate. Mid-call saves and a capped transcript softened it, but the structural fix is obvious in hindsight: compact section tools merged server-side, not one heroic JSON at the end.',
    ],
  },
  {
    title: 'Migrating the LLM mid-event costs more than the deprecation it avoids',
    body: [
      'A provider deprecation email triggered a switch to a preview model halfway through the day. From then on: intermittent generation failures, one repeated closing message, one booking made under caller pressure. The old model would have been fine well past the event. Pin the model, configure the fallback cascade on day one, and don’t chase deprecations before their actual date.',
    ],
  },
  {
    title: 'Date arithmetic is a hazard class',
    body: [
      'Without a timezone injection, the agent invented day names for future dates (“Thursday, September the… seventeen”). The fix — real time in context, plus a rule to repeat slots exactly as the API returns them — works, but it’s the kind of bug you only catch by making the system do the real thing.',
    ],
  },
];

const heroBg = ref(null);
const scrubText = ref(null);

const scrubSentence = 'An AI front desk that smells the difference between a sale within weeks and a Sunday-afternoon thought.';
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

    // diagram: node-by-node cascade
    gsap.from('.diagram-node', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: '.diagram-wrap', start: 'top 80%' },
    });

    // demo gif: ken-burns settle as it enters, gentle fade as it leaves
    gsap.fromTo('.demo-frame img',
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.demo-frame', start: 'top 95%', end: 'top 35%', scrub: true },
      }
    );
    gsap.to('.demo-frame', {
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: { trigger: '.demo-frame', start: 'bottom 45%', end: 'bottom 15%', scrub: true },
    });
  });
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>
