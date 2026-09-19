<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== HERO (radial wash, editorial left) ====================== -->
    <section class="relative flex items-end overflow-hidden px-6 pt-40 pb-20 md:pt-56 md:pb-28">
      <div ref="heroBg" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,theme(colors.blue)_0%,theme(colors.indigo.900)_45%,theme(colors.ink)_85%)]"></div>
      <div class="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.05) 14px 15px);"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>

      <div class="mx-auto w-full max-w-6xl">
        <p class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cream/60 hero-eyebrow">
          Writeup &middot; AI/ML Engineering &middot; Open Source
        </p>
        <h1 class="font-display font-black tracking-tightest leading-[0.9] text-cream max-w-5xl"
          style="font-size: clamp(3.5rem, 11vw, 10rem);">
          RAG Faith
        </h1>
        <p class="mt-8 max-w-2xl text-lg md:text-2xl text-cream/70 leading-relaxed hero-sub">
          Measuring how faithfully retrieval-augmented answers stick to their sources:
          multilingual NLI and LLM judges across English, German, and Italian.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4 hero-meta">
          <a
            href="https://github.com/resonanceee/ragfaith"
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

    <!-- ====================== WRITEUP BODY ====================== -->
    <section class="px-6 pb-24 md:pb-36">
      <div class="mx-auto max-w-2xl">
        <article class="flex flex-col gap-20 md:gap-28">

          <!-- Motivation -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              Motivation
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                I use LLM agents a lot in my own work, and over time I noticed something that bothered
                me: when an answer draws on retrieved documents, the model rarely copies them. It
                rephrases, fills in gaps, and every so often states something the source never said.
                Most of the time it&rsquo;s harmless. Sometimes it isn&rsquo;t. The frustrating part was
                that I had no way of knowing which was which without checking every answer by hand.
              </p>
              <p>
                ragfaith started as an attempt to measure that properly: to find out how well the
                available &ldquo;judge&rdquo; approaches actually detect when an answer stops matching
                its sources. It ended with a small open-source tool that now watches my own agent
                conversations and tells me when something looks off.
              </p>
            </div>
          </section>

          <!-- The approach -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The approach
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                The setup is deliberately simple. An answer gets broken down into individual claims,
                and for each claim a judge is shown the question and the retrieved passages, then
                asked for one of three verdicts:
                <span class="font-mono text-orange/90">faithful</span>,
                <span class="font-mono text-orange/90">unfaithful</span>, or
                <span class="font-mono text-orange/90">unverifiable</span>. Everything else (the
                comparisons, the languages, the cost analysis) hangs off that one task.
              </p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong class="text-cream">A: NLI judge.</strong> A small multilingual DeBERTa model that runs locally and costs nothing.</li>
                <li><strong class="text-cream">B: LLM judge.</strong> Nine inexpensive models compared against each other, plus two frontier models to see if spending more helps.</li>
                <li><strong class="text-cream">C: Hybrid.</strong> The NLI model handles the claims it&rsquo;s sure about; the rest go to the LLM.</li>
                <li><strong class="text-cream">D: No decomposition.</strong> The whole answer judged in one pass, included mostly as a control.</li>
              </ul>
              <p>
                For data I used 18,900 English claims from the RAGTruth benchmark, 800 synthetic
                German and Italian examples I built myself, and about 600 real answers I collected.
                Where a judge disagreed with the published labels, 71 of those cases were reviewed by
                hand. I adjudicated all three languages; two independent reviewers cross-checked
                alongside me, one covering Italian and English and a native German speaker covering
                German. The whole
                thing cost about $19.40 in API calls, and every number in the repo can be reproduced
                from the checked-in caches without spending anything.
              </p>
            </div>
          </section>

          <!-- Results -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              Results
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                The result that surprised me most: the best judge turned out to be GLM-5.3-Flash, a
                small and cheap model, better than alternatives that cost up to 22&times; more per
                token. Bigger and more expensive did not mean more accurate here.
              </p>

              <!-- headline table -->
              <div class="overflow-x-auto rounded-2xl border border-cream/10 bg-indigo-900/20">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-cream/10 text-left text-cream/50">
                      <th class="px-5 py-3 font-medium">Judge</th>
                      <th class="px-5 py-3 font-medium text-right">Claim F1</th>
                      <th class="px-5 py-3 font-medium text-right">Noise-adjusted F1</th>
                      <th class="px-5 py-3 font-medium text-right">Cost / 18.9k claims</th>
                    </tr>
                  </thead>
                  <tbody class="text-cream/80">
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3 font-mono">glm-5.3-flash</td>
                      <td class="px-5 py-3 text-right font-semibold text-orange">0.481</td>
                      <td class="px-5 py-3 text-right font-semibold text-orange">0.693</td>
                      <td class="px-5 py-3 text-right">~$1.92</td>
                    </tr>
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3 font-mono">NLI (mDeBERTa, local)</td>
                      <td class="px-5 py-3 text-right">0.138</td>
                      <td class="px-5 py-3 text-right">0.369</td>
                      <td class="px-5 py-3 text-right">free</td>
                    </tr>
                    <tr>
                      <td class="px-5 py-3 font-mono">claude-sonnet-5 (frontier)</td>
                      <td class="px-5 py-3 text-right">0.403&thinsp;·&thinsp;below flash</td>
                      <td class="px-5 py-3 text-right">—</td>
                      <td class="px-5 py-3 text-right">$2.64 / 1k (~22&times;)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>A few other things the data showed fairly clearly:</p>
              <ul class="space-y-4 pt-2">
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>The local NLI model, on its own, caught only about a quarter of hallucinations (0.23 recall). It works as a cheap pre-filter, but I wouldn&rsquo;t trust it as the only line of defense.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>The hybrid idea looks good on paper but doesn&rsquo;t save much in practice; to keep most of the LLM&rsquo;s quality, about 93% of claims still ended up going to the LLM anyway.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>Splitting answers into individual claims matters a lot. Judging whole answers in one pass dropped response-level F1 to 0.107.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>For German, translating the claim and evidence into English before judging roughly doubled hallucination recall (0.39 to 0.73). Italian benefited less, but still measurably.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>In the 71 cases we checked by hand where the judge and the published labels disagreed, the published label was wrong or ambiguous 42% of the time. So the reported scores are, if anything, on the conservative side.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span>I also tried distilling the judge into a smaller model that could run locally. It failed twice; the small model kept deferring most claims back to the big one. I kept the experiment in the repo anyway; negative results are still results.</span></li>
              </ul>
            </div>
          </section>

          <!-- What I shipped -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              What I shipped
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                A benchmark that only lives in a notebook isn&rsquo;t much use, so once I knew which
                judge to use, I packaged it three ways depending on how people run their agents.
                All three judge with the winning LLM; the NLI model stays in the benchmark only:
              </p>
              <ul class="space-y-3">
                <li class="flex flex-col gap-1 rounded-xl border border-cream/10 bg-indigo-900/20 px-5 py-4">
                  <span class="font-mono text-sm text-orange">ragfaith-proxy · PyPI</span>
                  <span class="text-sm">A small OpenAI-compatible proxy you can point any client at. It doesn&rsquo;t store an API key of its own; it forwards yours, so it&rsquo;s safe to run on a home server.</span>
                </li>
                <li class="flex flex-col gap-1 rounded-xl border border-cream/10 bg-indigo-900/20 px-5 py-4">
                  <span class="font-mono text-sm text-orange">@resonanceee/opencode-ragfaith · npm</span>
                  <span class="text-sm">A plugin for opencode sessions. Publishing is automated: merges to the protected main branch publish to npm when the version changes.</span>
                </li>
                <li class="flex flex-col gap-1 rounded-xl border border-cream/10 bg-indigo-900/20 px-5 py-4">
                  <span class="font-mono text-sm text-orange">ragfaith-mcp · PyPI</span>
                  <span class="text-sm">Same judge as an MCP server (<span class="font-mono">pip install ragfaith-mcp</span>): exposes <span class="font-mono">check_faithfulness</span> to any MCP-capable host over stdio.</span>
                </li>
              </ul>
              <p>
                All three follow the same ground rules: a model never judges its own output, verdicts
                are cached so repeats are free, and token usage is logged so costs stay visible. The
                proxy runs as a little always-on service on a Raspberry Pi at home, checking my own
                agent sessions; that&rsquo;s also where the latency figures in the README come from
                (about 0.44s per claim at p50).
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
                The most useful thing I learned is about how models actually go wrong. They almost
                never make something up from nothing; on real data, outright fabrications were under
                1%. The common failure is subtler: the model starts from something the source does
                say, then gradually goes a bit further than the source supports. That kind of drift
                showed up in about 8–10% of claims. Detecting it is a different problem than detecting
                a confident lie, and honestly a harder one.
              </p>
              <p>
                Second lesson: when you build tooling around LLMs, boring details decide whether the
                thing works. One otherwise decent model refused to return valid JSON about 13% of the
                time, which meant constant retries and a much higher real cost than its sticker price
                suggested. Picking a judge (or any model for a pipeline) is as much about
                reliability and behavior as it is about benchmark scores.
              </p>
              <p>
                And a humbling one: at one point my own German test data had a bug that made scores
                look about 20% better than reality. I caught it because an early result looked too
                good, rebuilt the dataset, and marked the old numbers as invalid rather than quietly
                keeping them. If you want people to trust your measurements, you have to be the first
                to doubt them.
              </p>
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
          Benchmarks, judge harness, and reproducible results, all open source.
        </p>
        <a
          href="https://github.com/resonanceee/ragfaith"
          target="_blank"
          rel="noopener"
          class="mt-12 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-ink transition-all duration-300 hover:bg-cream shadow-xl shadow-orange/20"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
          resonanceee/ragfaith
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

// prose inline in template, static writeup, no CMS

const scrubSentence = 'How do you know when an AI answer quietly stops matching its sources? I benchmarked the options across three languages, then built the check into my own workflow.';
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
