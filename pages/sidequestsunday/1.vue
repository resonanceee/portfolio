<template>
  <main class="sqs">
<div class="wrap">
<header><div class="eyebrow">Side Quest Sunday #1 · Pi 5 + Hailo-8L · 6 fps</div>
<h1>Violence and man-down detection on the edge</h1>
<p class="lede">A Docker container on our edge node detects people, estimates their pose on the Hailo NPU, and raises an alert for a fall or person lying down, and for two or more people fighting. Built in one Side Quest Sunday: an empty repo at 11am, a working container on the device by 2pm, then 1.5 hours of fixing what our own cameras exposed. Every number below comes from the quantized models on the device, on clips held out from tuning. Fight demo clips are left out on purpose: the public fight datasets don't allow reuse.</p></header>
<section class="goal"><div class="goal-row"><span class="goal-k">Start, 11am</span><span>Empty repo with a plan file.</span></div>
<div class="goal-row"><span class="goal-k">Goal by 2pm</span><span>A Docker container that detects human-on-human violence or a person down, running on our edge nodes with cameras.</span></div>
<div class="goal-row"><span class="goal-k">Result</span><ul>
<li><b class="ok">Done</b> Container runs on the edge node (Raspberry Pi 5 + Hailo-8L) and keeps up with a live 4K camera stream at 6 fps.</li>
<li><b class="ok">Done</b> Man down: detects 76% of falls on held-out clips, false alerts on 8% of normal clips, alert in 1.3 s.</li>
<li><b class="part">Baseline</b> Violence: detects 39% of fights on held-out clips; zero false alerts on 4.9 min of our own camera footage.</li>
</ul></div></section>
<section class="gifs"><figure><img src="/sidequestsunday/1/s6_fall_left.gif" alt="Fall alert 0.3 s after impact, man-down alert at 5.7 s. Overhead CCTV at night (CAUCAFall)." loading="lazy">
<figcaption><span class="tag fall">fall</span>Fall alert 0.3 s after impact, man-down alert at 5.7 s. Overhead CCTV at night (CAUCAFall).</figcaption></figure><figure><img src="/sidequestsunday/1/s1_fall_03.gif" alt="Fall alert 1.0 s after the fall. Wall camera in a home (GMDCSA-24)." loading="lazy">
<figcaption><span class="tag fall">fall</span>Fall alert 1.0 s after the fall. Wall camera in a home (GMDCSA-24).</figcaption></figure><figure><img src="/sidequestsunday/1/s10_kneel.gif" alt="No alert: a person kneels and gets up. Same overhead camera as the first fall." loading="lazy">
<figcaption><span class="tag negative">negative</span>No alert: a person kneels and gets up. Same overhead camera as the first fall.</figcaption></figure></section>
<section class="kpis"><div class="kpi"><div class="task">Man down</div>
<div class="row"><span>Detection rate</span><b>76%</b></div>
<div class="row"><span>False alerts (normal clips)</span><b>8%</b></div>
<div class="row"><span>Time to alert (median)</span><b>1.3 s</b></div>
<div class="row"><span>Clips (event / normal)</span><span>49 / 50</span></div></div><div class="kpi"><div class="task">Violence</div>
<div class="row"><span>Detection rate</span><b>39%</b></div>
<div class="row"><span>False alerts (normal clips)</span><b>18%</b></div>
<div class="row"><span>Time to alert (median)</span><b>1.8 s</b></div>
<div class="row"><span>Clips (event / normal)</span><span>90 / 90</span></div></div></section>

<details><summary>Results per dataset</summary><div><div class="scroll"><table><thead><tr><th>task</th><th>dataset</th><th>clips</th><th>correct</th><th>accuracy</th></tr></thead><tbody><tr><td>violence</td><td>survfight</td><td>90</td><td>56</td><td>62%</td></tr><tr><td>violence</td><td>rwf2000</td><td>90</td><td>53</td><td>59%</td></tr><tr><td>man down</td><td>urfall</td><td>21</td><td>19</td><td>90%</td></tr><tr><td>man down</td><td>gmdcsa24</td><td>48</td><td>41</td><td>85%</td></tr><tr><td>man down</td><td>caucafall</td><td>28</td><td>22</td><td>79%</td></tr><tr><td>man down</td><td>unidata_fall</td><td>2</td><td>1</td><td>50%</td></tr></tbody></table></div>
<p class="note">Test split: 279 clips; thresholds were tuned on a separate dev split of 650 clips. A stricter split with unseen people and scenes gives similar results (see below). All footage is public research video, not yet from our cameras.</p></div></details>

<details><summary>On-device performance (Raspberry Pi 5 + Hailo-8L)</summary><div>
<div class="scroll"><table><thead><tr><th>measurement</th><th>value</th></tr></thead><tbody><tr><td>Input</td><td>3840x2160 H.264 at 6 fps (camera main-stream format), 48 s, up to 4 people</td></tr><tr><td>Keeps up with real time</td><td>0.99x (1.0 = live)</td></tr><tr><td>Processing per frame (detect + pose + rules)</td><td>160 ms</td></tr><tr><td>Container CPU</td><td>22% of the Pi on average (87% of one core), peak 42%</td></tr><tr><td>Container memory</td><td>422 MiB</td></tr><tr><td>Person detector on Hailo-8L, 4K frame (4 tiles)</td><td>101 ms</td></tr><tr><td>Pose model on Hailo-8L, per person</td><td>9.6 ms (batched), 17 ms single</td></tr><tr><td>Decision latency (rules)</td><td>man down: median 1.3 s after the event; violence: 1.2 s</td></tr></tbody></table></div>
<p class="note">Measured inside the violencedet container on the edge node (Raspberry Pi 5, Hailo-8L, PCIe Gen2 x1). One 4K camera at 6 fps fits; a second camera needs the production Hailo-8, the faster PCIe Gen3 link, or a lower frame rate. CPU includes software H.264 decode.</p></div></details><details><summary>Quantization check: edge vs laptop</summary><div>
<p>Same models, same rules and thresholds, same test clips (fall sets and the surveillance fight set); only the keypoints differ: int8 on the Hailo vs float on a laptop. Thresholds are tuned on the edge (quantized) output on purpose: an earlier CLIP model lost its calibration when moved from laptop to device.</p>
<div class="scroll"><table><thead><tr><th>task</th><th>metric</th><th>edge (Hailo-8L, int8)</th><th>laptop (float)</th></tr></thead><tbody><tr><td>man down</td><td>detection rate</td><td>76%</td><td>68%</td></tr><tr><td>man down</td><td>false alerts</td><td>8%</td><td>8%</td></tr><tr><td>violence</td><td>detection rate</td><td>40%</td><td>44%</td></tr><tr><td>violence</td><td>false alerts</td><td>20%</td><td>18%</td></tr></tbody></table></div></div></details><details><summary>False alerts on our own camera footage</summary><div>
<p>4.9 minutes of real Reolink recordings (4512x2512, 12 clips of people walking past the charger with bags, tools and phones; no fights or falls) streamed through the container. None of these clips were used for tuning. Most early false violence alerts came from one person being split into two boxes at the border between image tiles, which looked like two people close together.</p><div class="scroll"><table><thead><tr><th>version</th><th>what changed</th><th>violence false alerts / min</th><th>man-down false alerts / min</th><th>violence detection (test clips)</th></tr></thead><tbody><tr><td>first version</td><td>–</td><td>2.66</td><td>0.61</td><td>44%</td></tr><tr><td>+ seam fix</td><td>a person cut by a 4K tile border is merged back into one box</td><td>2.25</td><td>0.41</td><td>44%</td></tr><tr><td>+ size check</td><td>a &#x27;pair&#x27; must be two people of similar height (same distance from the camera)</td><td>0.20</td><td>0.41</td><td>32%</td></tr><tr><td>+ 3 s window, re-tuned (shipped)</td><td>violence needs 3 s of evidence instead of 1.5 s; thresholds re-tuned for it</td><td>0.00</td><td>0.41</td><td>39%</td></tr></tbody></table></div>
<p class="note">The size check trades some detection on public fight clips (44% to 32%, false alerts there 20% to 13%) for 13x fewer false alerts on our cameras, in line with the requirement of few false positives to start. A separate 2-minute set of our footage was used to choose the check. The remaining man-down false alerts (0.4/min) were people walking out of the bottom of the frame, whose cut-off box looks like a person lying down. Ignoring boxes at the frame edge removes them on our footage but also drops 13 to 19 points of fall detection on the public sets, where falls often end at the frame edge, so it is a per-camera setting to enable together with the ground-area calibration.</p></div></details><details><summary>Live camera stream benchmark (same method as the existing vandalism detector)</summary><div>
<p>One camera: Reolink recordings re-encoded to the main-stream format (H.264, 4512x2512, 6 fps) and served over RTSP, as in the the existing vandalism detector benchmark. 10.4 minutes.</p><div class="scroll"><table><thead><tr><th>measurement</th><th>violencedet</th><th>existing vandalism detector (same bench)</th></tr></thead><tbody><tr><td>Input</td><td>1 RTSP camera, H.264 4512x2512 at 6 fps (10 real Reolink clips, 12 s each, looped), 10.4 min</td><td>1 RTSP camera, H.264 4512x2512 at 6 fps (all 168 real Reolink clips)</td></tr><tr><td>Frames analysed</td><td>every frame (6 per second)</td><td>2 per second (MAX_FPS=2)</td></tr><tr><td>Keeps up with the live stream</td><td>yes: 3750 frames processed vs ~3726 delivered (1.0x), no backlog</td><td>yes</td></tr><tr><td>Processing speed (frames per second it could handle)</td><td>7.4 average, 7.1 typical, 6.0 slowest; below 6 in 1 of 125 readings</td><td>about 2 (its per-frame time fits the 0.5 s slot)</td></tr><tr><td>Processing time per frame (typical / busiest 5%)</td><td>141 ms / 165 ms</td><td>524 ms / 716 ms (stress run, every frame)</td></tr><tr><td>Container CPU, % of one core (typical / busiest 5%)</td><td>91% / 113% (average 91%, peak 127%)</td><td>74% / 111%</td></tr><tr><td>Container memory</td><td>493 MiB average, 514 MiB max</td><td>1.91 GiB average, 1.96 GiB busiest 5%</td></tr><tr><td>Chip temperature</td><td>54 °C average, 58 °C max</td><td>58 °C average, 63 °C max (13 h soak)</td></tr><tr><td>System load (load1, of 4 cores)</td><td>1.3 average, 2.1 max</td><td>1.6 average, 3.6 max (13 h soak)</td></tr><tr><td>Alerts delivered over HTTP</td><td>40 of 40 (100%)</td><td>690 of 690 (100%, via RabbitMQ)</td></tr><tr><td>Alerts raised</td><td>40 in 10.4 min (39 violence, 1 fall) on footage with no fighting</td><td>n/a (different task: weapon/tool risk)</td></tr></tbody></table></div>
<p class="note">Both measured on the same Raspberry Pi 5 + Hailo-8L edge node with the same RTSP setup (mediamtx, ffmpeg publisher, x264 fast CRF 16, 12 Mbit/s cap, 6 fps, native 4512x2512). violencedet looped a 2-minute cut of 10 people clips (walking, phone, keys, hammer, saw, bolt cutter); the existing vandalism detector streamed the full clip set and only analyses 2 of every 6 frames, so its CPU figure covers a third of the frames. Its temperature and load figures come from its 13 h soak. The violencedet alerts are false alarms: the footage shows people walking or carrying tools, with no fighting. The alerts in this run came from the first version, before the fixes in the section above.</p></div></details><details><summary>Unseen people and scenes (stricter split)</summary><div>
<p>To check that the scores do not come from recognising the same actors or rooms, the clips were re-split so that no subject, scene or source video appears in both the tuning and the test set, and thresholds were re-tuned on the tuning set only.</p><div class="scroll"><table><thead><tr><th>task</th><th>split</th><th>clips (event / normal)</th><th>detection rate</th><th>false alerts</th><th>precision</th><th>time to alert (median)</th></tr></thead><tbody><tr><td>man down</td><td>random</td><td>49 / 50</td><td>76%</td><td>8%</td><td>90%</td><td>1.3 s</td></tr><tr><td>man down</td><td>unseen people and scenes</td><td>53 / 50</td><td>87%</td><td>12%</td><td>88%</td><td>1.2 s</td></tr><tr><td>violence</td><td>random</td><td>90 / 90</td><td>44%</td><td>20%</td><td>69%</td><td>1.2 s</td></tr><tr><td>violence</td><td>unseen people and scenes</td><td>90 / 90</td><td>43%</td><td>23%</td><td>65%</td><td>1.3 s</td></tr></tbody></table></div>
<p class="note">Grouping is exact by subject or source video for the CAUCAFall, GMDCSA-24 and surveillance-fight sets, and approximate (by background similarity) for UR Fall and RWF-2000. With about 100 fall and 180 fight test clips, differences of a few points are within noise.</p></div></details><details><summary>Violence: rules vs learned classifier, and longer decision windows</summary><div>
<p>A small learned classifier (logistic regression over motion and proximity features of tracked people) was trained on the dev split and compared with the hand-tuned rules. Each was also run with a longer evidence window, trading time-to-alert for accuracy.</p><div class="scroll"><table><thead><tr><th>setting</th><th>evidence window</th><th>detection rate</th><th>false alerts</th><th>precision</th><th>time to alert (median)</th></tr></thead><tbody><tr><td>rules (shipped)</td><td>1.5 s</td><td>44%</td><td>20%</td><td>69%</td><td>1.2 s</td></tr><tr><td>rules</td><td>3 s</td><td>31%</td><td>12%</td><td>72%</td><td>1.8 s</td></tr><tr><td>rules</td><td>5 s</td><td>13%</td><td>2%</td><td>86%</td><td>–</td></tr><tr><td>learned classifier</td><td>1.5 s</td><td>42%</td><td>16%</td><td>73%</td><td>1.3 s</td></tr><tr><td>learned classifier</td><td>3 s</td><td>32%</td><td>16%</td><td>67%</td><td>2.0 s</td></tr><tr><td>learned classifier</td><td>5 s</td><td>22%</td><td>13%</td><td>62%</td><td>–</td></tr></tbody></table></div>
<p class="note">Test clips are 2 s (surveillance fight set) and 5 s (RWF-2000) long, so 3 s and 5 s windows often cannot finish before the clip ends; their lower detection rates mostly reflect clip length, not the method. The classifier is about level with the rules at 1.5 s with fewer false alerts; the rules stay the default until we have longer footage from our own cameras.</p></div></details><details><summary>Man down: longer confirmation time</summary><div>
<p>How long the person must stay down after the fall before the alert fires.</p><div class="scroll"><table><thead><tr><th>setting</th><th>evidence window</th><th>detection rate</th><th>false alerts</th><th>precision</th><th>time to alert (median)</th></tr></thead><tbody><tr><td>rules (shipped)</td><td>0.5 s</td><td>76%</td><td>8%</td><td>90%</td><td>1.3 s</td></tr><tr><td>rules</td><td>3 s</td><td>47%</td><td>6%</td><td>88%</td><td>3.0 s</td></tr><tr><td>rules</td><td>5 s</td><td>35%</td><td>6%</td><td>85%</td><td>3.3 s</td></tr></tbody></table></div>
<p class="note">Many public fall clips end 1 to 3 s after the fall, which cuts detection for longer confirmation. On the 9 test falls with at least 6 s of footage after the fall, detection stayed at 67% for 0.5, 3 and 5 s while false alerts fell from 8% to 6%. A 3 s confirmation is a good production setting; it still fits the 5 s alert budget.</p></div></details>
<details><summary>How it works and current limits</summary><div><ul>
<li>Person detector YOLOX-s and pose model MSPN (both Apache-2.0, Hailo Model Zoo) run int8 on the Hailo-8L; 4K frames are split into 4 tiles.</li>
<li>A tracker follows each person. <b>Man down</b> fires on a fast hip drop followed by a lying posture (0.5 s), or on lying still for a set time (10 s in production, 3.0 s on short test clips).</li>
<li><b>Violence</b> fires when two people within 1.4 body-heights of each other both show fast limb motion (over 0.5 body-heights/s) for most of a 3.0 s window, or three or more people do.</li>
<li>Limits: test footage is public research video (indoor falls, YouTube CCTV fights), not yet our cameras; no per-camera ground calibration yet; violence uses hand-tuned rules, a learned model needs our own footage.</li>
</ul></div></details>
<details><summary>Legally trainable footage found so far</summary><div>
<p>A scraper on our own hardware searched YouTube (CC BY only), Internet Archive (CC or public domain) and Wikimedia Commons (CC0, CC BY, CC BY-SA, public domain) for real falls and fights, checking each video&#x27;s license in code before download; it ran 17 of 121 planned searches before its time ran out, so no &#x27;normal activity&#x27; footage was collected. It kept 197 videos (6.9 hours, 3.3 GB): 173 for falls and 24 for fights; 2 carry non-commercial terms and must be excluded. Nobody has watched the clips yet, but going by titles and descriptions the scraper&#x27;s own end-of-run review judged about 120 of them off-topic (memes, product demos, tutorials, unrelated films) and found only about 23 minutes of genuine person falls or collapses, 5 to 10 minutes of real fighting, and under 5 minutes of fixed security-camera footage of either (the automatic &#x27;looks like CCTV&#x27; check below is loose; only about 10 to 12 of its 29 really are). A further 17 videos look like news, TV or film material re-uploaded under a free license by someone who may not own it, so their license cannot be trusted without checking the original source. Conclusion: free licensed footage from the public web can serve as a small test set, but not as training data; staged recordings on our own cameras and research datasets whose license allows commercial use have to be the main data source. A second pass had small vision models look at nine frames from every clip: 1 clip was clearly usable, 19 were maybes, and 100 of 197 carried a news, channel or agency watermark.</p><div class="scroll"><table><thead><tr><th>source</th><th>videos</th><th>hours</th><th>looks like CCTV</th></tr></thead><tbody><tr><td>YouTube (CC BY)</td><td>143</td><td>5.1</td><td>22</td></tr><tr><td>Wikimedia Commons</td><td>40</td><td>1.0</td><td>6</td></tr><tr><td>Internet Archive</td><td>14</td><td>0.8</td><td>1</td></tr><tr><td>Total</td><td>197</td><td>6.9</td><td>29</td></tr></tbody></table></div></div></details>
</div>
  </main>
</template>

<script setup>
// generated by violencedet/tools/portfolio_page.py from the evaluation outputs; edit there, not here
useHead({
  title: 'Side Quest Sunday #1: violence and man-down detection on the edge',
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@600&family=IBM+Plex+Sans:wght@400;600&display=swap' }],
});
</script>

<style scoped>

/* Layout: one narrow reading column; demo GIFs in a 2-up grid, headline numbers beside them, detail folded below. */
.sqs {
  --bg: #f3f4f2; --surface: #ffffff; --ink: #1b2025; --muted: #5d6670; --line: #d9ddd8;
  --rec: #c8321e; --ok: #2f7d4f; --warn: #a86a10;
  --display: "IBM Plex Sans Condensed", "Arial Narrow", system-ui, sans-serif;
  --body: "IBM Plex Sans", system-ui, -apple-system, sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;

  --bg: #14181b; --surface: #1c2226; --ink: #e6e9ea; --muted: #9aa4ac; --line: #2c343a;
  --rec: #ff6a52; --ok: #5cc28a; --warn: #e0a548;  }
.sqs { background: var(--bg); color: var(--ink); font: 15px/1.55 var(--body); }
.sqs .wrap { max-width: 980px; margin: 0 auto; padding-block: 28px 64px;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px));
  display: grid; gap: 28px; }
header { display: grid; gap: 6px; }
.eyebrow { font: 500 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted);
  display: flex; align-items: center; gap: 8px; }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--rec); }
h1 { font: 600 clamp(26px, 4.4vw, 38px)/1.1 var(--display); margin: 0; text-wrap: balance; }
h2 { font: 600 20px/1.2 var(--display); margin: 0; }
.lede { color: var(--muted); max-width: 68ch; margin: 0; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
.kpi { background: var(--surface); border: 1px solid var(--line); border-radius: 6px; padding: 14px 16px; display: grid; gap: 4px; }
.kpi .task { font: 500 12px/1 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.kpi .row { display: flex; justify-content: space-between; gap: 12px; font-variant-numeric: tabular-nums; }
.kpi .row b { font: 600 20px/1.2 var(--display); }
.kpi .row span { color: var(--muted); }
.gifs { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; }
figure { margin: 0; display: grid; gap: 6px; min-width: 0; }
figure img { width: 100%; border-radius: 4px; border: 1px solid var(--line); background: #000; display: block; }
figcaption { font-size: 13px; color: var(--muted); }
figcaption .tag { font: 600 11px/1 var(--mono); text-transform: uppercase; letter-spacing: .06em; padding: 3px 6px;
  border-radius: 3px; margin-right: 6px; color: var(--surface); background: var(--muted); }
.tag.fall, .tag.violence { background: var(--rec); }
.tag.negative { background: var(--ok); }
details { background: var(--surface); border: 1px solid var(--line); border-radius: 6px; }
summary { cursor: pointer; padding: 14px 16px; font: 600 16px/1.3 var(--display); }
summary:focus-visible { outline: 2px solid var(--rec); outline-offset: 2px; }
details > div { padding: 0 16px 16px; display: grid; gap: 12px; min-width: 0; }
.scroll { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: 13px; font-variant-numeric: tabular-nums; }
th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--line); white-space: nowrap; }
th { font: 600 12px/1.2 var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }
td.ok { color: var(--ok); } td.bad { color: var(--rec); }
pre { font: 12px/1.5 var(--mono); background: var(--bg); border: 1px solid var(--line); border-radius: 4px; padding: 10px; overflow-x: auto; margin: 0; }
p, ul { margin: 0; max-width: 72ch; }
.note { color: var(--muted); font-size: 13px; }

.sqs { min-height: 100vh; padding-top: 7rem; }
.sqs code { font-family: var(--mono); }

.goal { display: grid; gap: 10px; background: var(--surface); border: 1px solid var(--line); border-radius: 6px; padding: 16px; }
.goal-row { display: grid; grid-template-columns: 130px 1fr; gap: 12px; align-items: baseline; }
.goal-k { font: 500 12px/1.4 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.goal ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.goal b { font: 600 11px/1 var(--mono); text-transform: uppercase; letter-spacing: .06em; padding: 3px 6px; border-radius: 3px; margin-right: 8px; color: var(--bg); }
.goal b.ok { background: var(--ok); } .goal b.part { background: var(--warn); }
@media (max-width: 560px) { .goal-row { grid-template-columns: 1fr; gap: 4px; } }

</style>
