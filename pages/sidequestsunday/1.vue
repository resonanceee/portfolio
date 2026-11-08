<template>
  <main class="overflow-x-hidden w-full max-w-full bg-ink text-cream isolate">
    <!-- ====================== HERO (radial wash, editorial left) ====================== -->
    <section class="relative flex items-end overflow-hidden px-6 pt-40 pb-20 md:pt-56 md:pb-28">
      <div ref="heroBg" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,theme(colors.coral)_0%,theme(colors.purple)_40%,theme(colors.ink)_85%)]"></div>
      <div class="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.05) 14px 15px);"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>

      <div class="mx-auto w-full max-w-6xl">
        <p class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-cream/60 hero-eyebrow">
          Side Quest Sunday &middot; #1 &middot; Edge AI
        </p>
        <h1 class="font-display font-black tracking-tightest leading-[0.9] text-cream max-w-5xl"
          style="font-size: clamp(3.5rem, 11vw, 10rem);">
          Man down
        </h1>
        <p class="mt-8 max-w-2xl text-lg md:text-2xl text-cream/70 leading-relaxed hero-sub">
          Detecting falls and fights on a security camera with a Raspberry Pi and a 13-TOPS NPU,
          starting from zero labeled data, in one afternoon.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4 hero-meta">
          <NuxtLink
            to="/work"
            class="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/5"
          >
            All work
          </NuxtLink>
          <span class="text-xs uppercase tracking-wider text-cream/40">Pi 5 &middot; Hailo-8L &middot; Docker &middot; ~3 hours + 1.5 hours</span>
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

          <!-- The quest -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The quest
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                Side Quest Sunday is a fixed time box: a starting point, a goal, and a deadline. This
                one started at 11am with an empty repo and a plan file, and the goal for 2pm was a
                Docker container that detects people fighting or a person down, running on the edge
                nodes that already sit next to our outdoor cameras.
              </p>
              <p>The constraints were the interesting part:</p>
              <ul class="space-y-4 pt-2">
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Hardware:</strong> a Raspberry Pi 5 with a Hailo-8L accelerator (13 TOPS), watching 4K cameras at 6 frames per second.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Latency:</strong> an alert within 5 seconds, computed entirely on the device.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Data:</strong> no labeled footage of our own, and only permissively licensed models, which rules out most of the popular pose models and violence datasets.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Precision first:</strong> few false alarms at the start matter more than catching everything.</span></li>
              </ul>
            </div>
          </section>

          <!-- The approach -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The approach
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                A vision-language model was the obvious first idea and the first one I dropped: the
                Hailo-8L can&rsquo;t run one, and on the Pi&rsquo;s CPU even small ones take seconds
                per image. Single frames are also ambiguous for violence; a shove and a hug look alike.
              </p>
              <p>
                So the pipeline is classic computer vision with the heavy lifting on the NPU:
                a <span class="font-mono text-orange/90">YOLOX-s</span> person detector and an
                <span class="font-mono text-orange/90">MSPN</span> pose model (both Apache-2.0, int8 on
                the Hailo), a tracker on the CPU, and hand-written rules over a few seconds of
                skeleton history. A fall is a fast drop of the hips followed by a lying posture; a
                fight is two people of similar size, close together, both moving their limbs fast for
                most of a 3-second window.
              </p>
              <p>
                I split the afternoon into parallel tracks run by AI agents: one downloaded public
                fall and fight datasets, one brought the NPU up and wrapped both models behind a
                single backend, one ran a license-checked scrape for footage we could legally train
                on, and I wrote the rules engine and evaluation in the meantime.
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
                Thresholds were tuned on one split of the public clips and measured on clips held
                out from tuning, with everything computed from the quantized models on the Pi:
              </p>

              <div class="overflow-x-auto rounded-2xl border border-cream/10 bg-indigo-900/20">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-cream/10 text-left text-cream/50">
                      <th class="px-5 py-3 font-medium">Event</th>
                      <th class="px-5 py-3 font-medium text-right">Detected</th>
                      <th class="px-5 py-3 font-medium text-right">False alerts (normal clips)</th>
                      <th class="px-5 py-3 font-medium text-right">Time to alert</th>
                    </tr>
                  </thead>
                  <tbody class="text-cream/80">
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3">Man down</td>
                      <td class="px-5 py-3 text-right font-semibold text-orange">76%</td>
                      <td class="px-5 py-3 text-right">8%</td>
                      <td class="px-5 py-3 text-right">1.3 s</td>
                    </tr>
                    <tr>
                      <td class="px-5 py-3">Violence</td>
                      <td class="px-5 py-3 text-right font-semibold text-orange">39%</td>
                      <td class="px-5 py-3 text-right">18%</td>
                      <td class="px-5 py-3 text-right">1.8 s</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Man down works. Violence is a baseline, and I&rsquo;d rather say that plainly than
                tune it into a nicer-looking number. A stricter re-split with unseen people and scenes
                gave similar results, so the scores aren&rsquo;t coming from memorized actors or rooms.
              </p>

              <div class="grid gap-6 pt-4">
                <figure class="flex flex-col gap-2">
                  <img src="/sidequestsunday/1/s6_fall_left.gif" alt="Overhead night-vision camera: a person falls, the overlay turns red and a fall alert fires" loading="lazy" class="w-full rounded-2xl border border-cream/10" />
                  <figcaption class="text-sm text-cream/50">Fall alert 0.3 s after impact, man-down alert at 5.7 s. Overhead CCTV at night.</figcaption>
                </figure>
                <figure class="flex flex-col gap-2">
                  <img src="/sidequestsunday/1/s1_fall_03.gif" alt="Wall-mounted home camera: a person falls and a fall alert fires" loading="lazy" class="w-full rounded-2xl border border-cream/10" />
                  <figcaption class="text-sm text-cream/50">Fall alert 1.0 s after the fall. Wall-mounted camera in a home.</figcaption>
                </figure>
                <figure class="flex flex-col gap-2">
                  <img src="/sidequestsunday/1/s10_kneel.gif" alt="Same overhead camera: a person kneels and stands up again, no alert" loading="lazy" class="w-full rounded-2xl border border-cream/10" />
                  <figcaption class="text-sm text-cream/50">No alert: a person kneels and gets back up. The hard negatives matter as much as the hits.</figcaption>
                </figure>
              </div>
            </div>
          </section>

          <!-- What went wrong -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              What went wrong, and what fixed it
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                The first version passed every public benchmark I threw at it, then raised
                <strong class="text-cream">four false fight alerts a minute</strong> on our own
                camera footage, which contains no fights at all.
              </p>
              <p>
                The cause turned out to be my own optimization. A 4K frame is too big for the
                detector, so I split it into four tiles. A person standing on a tile border came out
                as two boxes, one per tile: two &ldquo;people&rdquo; close together, both moving.
                97% of the bad pairs sat exactly on a tile border. Merging boxes cut at a border,
                requiring a fighting pair to be of similar height (same distance from the camera),
                and re-tuning for a 3-second window took it to
                <strong class="text-cream">zero false alerts</strong> on 4.9 minutes of our footage
                that was never used for tuning.
              </p>
              <ul class="space-y-4 pt-2">
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Quantization is not a detail.</strong> On a previous project, thresholds tuned on a laptop broke on the device. This time every threshold came from the int8 output on the Pi. The same rules on float keypoints from a laptop caught 68% of falls instead of 76%.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Lying people are hard to detect.</strong> From a high corner camera the detector often loses someone on the floor. Keeping lower-confidence boxes and letting a track survive a sudden change of shape lifted fall recall from 60% to 80% in an early round.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"></span>
                  <span><strong class="text-cream">Someone walking out of frame looks like a fall.</strong> Their box gets short and wide. Ignoring boxes at the frame edge fixes it on our cameras but costs 13 to 19 points on public datasets, where falls often end at the edge, so it&rsquo;s a per-camera setting rather than a default.</span></li>
              </ul>
            </div>
          </section>

          <!-- On the device -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              On the device
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                I benchmarked the container the same way as the existing vandalism detector on the
                same cameras: real recordings re-encoded to the camera&rsquo;s main stream and served
                over RTSP for ten minutes.
              </p>
              <div class="overflow-x-auto rounded-2xl border border-cream/10 bg-indigo-900/20">
                <table class="w-full text-sm">
                  <tbody class="text-cream/80">
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3 text-cream/50">Input</td>
                      <td class="px-5 py-3 text-right">4512&times;2512 H.264, 6 fps, every frame analysed</td>
                    </tr>
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3 text-cream/50">Keeps up live</td>
                      <td class="px-5 py-3 text-right font-semibold text-orange">yes, no backlog</td>
                    </tr>
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3 text-cream/50">CPU</td>
                      <td class="px-5 py-3 text-right">91% of one core (of four)</td>
                    </tr>
                    <tr class="border-b border-cream/5">
                      <td class="px-5 py-3 text-cream/50">Memory</td>
                      <td class="px-5 py-3 text-right">493 MiB (existing service: ~1.9 GiB)</td>
                    </tr>
                    <tr>
                      <td class="px-5 py-3 text-cream/50">SoC temperature</td>
                      <td class="px-5 py-3 text-right">58 &deg;C max</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                One camera fits on the Hailo-8L. A second one needs the bigger Hailo-8, a faster PCIe
                link, or a lower frame rate. The NPU sits behind a single PCIe lane, and with these
                models it, not the code, sets the ceiling.
              </p>
            </div>
          </section>

          <!-- The data problem -->
          <section class="writeup-section">
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tightest text-cream mb-6">
              The data problem
            </h2>
            <div class="space-y-5 text-cream/70 leading-relaxed">
              <p>
                The public fall and fight datasets are fine for research but mostly can&rsquo;t be
                used to train a commercial model. So while everything else ran, a scraper on a second
                Pi searched YouTube, the Internet Archive and Wikimedia Commons, checking each
                video&rsquo;s license in code before downloading it.
              </p>
              <p>
                It kept 197 videos, almost seven hours. Going by titles, about 23 minutes looked like
                genuine falls. Then I had a swarm of small vision models look at nine frames from
                every clip, and the picture got much worse: one clip was clearly usable, 19 were
                maybes, and the rest were product demos, news studios, films, animals and buildings.
                Half of the &ldquo;Creative Commons&rdquo; videos carried a news, channel or agency
                watermark: re-uploads by someone who likely never owned the footage. A free license
                on the web is a claim, not a fact.
              </p>
              <p>
                The conclusion is unglamorous: the training data has to be recorded on our own
                cameras, with consent. The good news is that the negatives are free. Every hour of
                normal footage the cameras already record is a test of how often the system cries
                wolf.
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
                Benchmarks on public clips told me the system worked. Ten minutes of our own
                footage told me it didn&rsquo;t, and pointed straight at the bug. The most valuable
                test set was the boring one: people walking past a camera with bags and phones.
              </p>
              <p>
                And three hours goes a long way when the work splits cleanly. The agents
                weren&rsquo;t the clever part; deciding what could run in parallel, what had to be
                measured on the real device, and what I would refuse to claim was.
              </p>
            </div>
          </section>

          <!-- Credits -->
          <section class="writeup-section">
            <p class="text-xs text-cream/40 leading-relaxed">
              Demo clips: CAUCAFall (Eraso et al., CC BY 4.0) and GMDCSA-24 (Alam et al., MIT),
              processed by the detector; overlays added. Models: YOLOX and MSPN from the Hailo Model
              Zoo (Apache-2.0).
            </p>
          </section>

        </article>
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

const scrubSentence = 'Can a Raspberry Pi tell a person collapsing from a person kneeling, or a fight from a hug? I had one afternoon to find out, and our own cameras had the final word.';
const scrubWords = scrubSentence.split(' ');

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    if (heroBg.value) {
      gsap.to(heroBg.value, {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: heroBg.value, start: 'top top', end: 'bottom top', scrub: true },
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
        scrollTrigger: { trigger: scrubText.value, start: 'top 80%', end: 'bottom 30%', scrub: true },
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
