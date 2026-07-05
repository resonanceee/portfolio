<template>
  <div class="container">
    <div class="bg"></div>
    <div class="fade-in-color" :style="{ opacity: fadeOpacity }"></div>
    <div class="fullscreen-container">
      <div class="heading-content">
  <div class="heading"><p class="heading-title">{{ projects.length }}</p></div>
        <div class="heading"><p class="heading-text">projects</p></div>
      </div>
      <div ref="scrollDownIndicator" class="scroll-down-indicator">
        <img
          src="/assets/icons/scroll-down-text.png"
          class="scroll-down-text"
          alt=""
          :style="{ opacity: 1 - fadeOpacity }"
          />
        <img
          src="/assets/icons/arrow-down-solid.svg"
          class="arrow-down"
          alt=""
          :style="{ opacity: 1 - fadeOpacity }"
        />
      </div>
    </div>
    <div class="projects">
      <Project
        v-for="(project, index) in projects"
        :key="index"
        :head="project.head"
        :type="project.type"
  :role="project.role"
  :org="project.org"
  :text="project.text"
  :link="project.link"
  :style="{ '--project-gap': computeGap(project.text) + 'px' }"
      />
    </div> 
  </div>
</template>

<script setup>
// (imports remain unchanged)
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Project from '../components/project.vue'; 
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';
// don't reference `projects` before it's declared; initialize with a safe default
let initialStripeSize = 5;
const maxStripeSize = 190;
const fadeOpacity = ref(0);
const scrollDirection = ref(0);
let lastScroll = typeof window !== 'undefined' ? window.scrollY : 0;


const projects = [
  {
    head: 'AtomHR',
    type: 'Startup',
    org: 'Independent',
    text: "AtomHR is a platform that leverages AI to slash Bureaucracy and streamline HR processes for Italian Startups and SMEs.",
    link: 'https://www.atomhr.it/'
  },
  {
    head: 'Automated Data Quality Monitoring Tool',
    type: 'Project',
    org: 'ODH',
    text: "The Open Data Hub Data Validation tool is an automated solution designed to ensure the accuracy and quality of data within the Open Data Hub. By implementing advanced validation techniques, it helps identify and rectify data inconsistencies, ultimately enhancing the reliability of the information provided to users.",
    link: 'https://github.com/noi-techpark/automated-data-quality-monitoring-tool/'
  },
  {
    head: 'EyeHide',
    type: 'Startup',
    org: 'Independent',
    text: "EyeHide is a startup that was founded to adress the deep concern about the growing trend of neglecting user privacy, especially with the rise of AI and large language models. We believe everyone deserves a secure digital experience without compromising their privacy. Our goal is to create user friendly hardware and software to safeguard the user's privacy and security.",
    link: 'https://eyehide.org'
  },
  {
    head: 'WaveLab Station',
    type: 'Project',
    org: 'WaveLab',
    text: 'This project enhances the EV charging experience for users and provides valuable analytics to vehicle manufacturers. Utilizing computer vision, we continuously analyze live feeds to monitor various factors, such as misuse of electric parking spots and user mood. This technology also enables personalized recommendations for nearby attractions. Due to confidentiality requested by WaveLab, further details cannot be disclosed.',
    link: 'private'
  },
  {
    head: 'ACS Emissions dashboard',
    type: 'Project',
    org: 'ACS',
    text: 'ACS Data Systems S.p.A. tasked us with creating a dashboard to track their mobility emissions. Despite successfully delivering the product, they ceased communication, citing their failure to acquire lack of API keys for dkvmobility as the reason.',
    link: 'https://github.com/SysWhiteDev/ACS-Challenge-2023'
  },
  {
    head: 'TrashTracer',
    type: 'Project',
    org: 'Independent',
    text: "This project started at the NOI Hackathon 2022, aiming to use large format displays to show a leaderboard for top recyclers to entcourage eco-friendly behaviour. It evolved for the Progetto Rocca competition, where we revamped the codebase and developed a new app to enhance user experience. The project won awards at both events.",
    link: 'https://github.com/trashtracer'
  },
  {
    head: 'Weather Component',
    type: 'Project',
    org: 'ODH',
    text: "Created during the ODH Bootcamp 2024, this project was created to visualize weather data from the Open Data Hub trough a modular web component. It features a dynamic map, data loading, nearby webcams search, live weather data, 3-hour forecast, daily forecast, component options, and dark/light mode. Highly praised at the conference, the Open Data Hub requested to feature our widget on their website.",
    link: 'https://weather.syswhite.dev/'
  },
];

initialStripeSize = projects.length || initialStripeSize;


function handleScroll() {
  if (typeof window === 'undefined') return;
  const currentScroll = window.scrollY;
  scrollDirection.value = currentScroll - lastScroll;
  lastScroll = currentScroll;
  
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = currentScroll / windowHeight;
  const newStripeSize = initialStripeSize + scrollPercentage * (maxStripeSize - initialStripeSize);
  updateBackgroundGradient(newStripeSize);
  updateFadeInOpacity(scrollPercentage);
}

// Calculate an item spacing (px) from the project's text length.
// Longer descriptions get more vertical breathing room.
function computeGap(text) {
  const len = text ? text.length : 0;
  // base gap in px, then scale with length and clamp
  const base = 48;
  const scaled = Math.round(base + len * 0.35);
  return Math.min(260, Math.max(24, scaled));
}

function updateBackgroundGradient(stripeSize) {
  const bgElement = document.querySelector(".bg");
  if (bgElement) {
    // ponytail: cap stripe so transparent band stays > 0, avoids solid-orange bg mid-scroll
    const clampedStripe = Math.min(stripeSize, 85);
    const transparentSize = Math.max(90 - clampedStripe, 5);
    bgElement.style.background = `repeating-linear-gradient(
      -45deg,
      #efa819,
      #efa819 ${clampedStripe}px,
      black 1px,
      transparent 4px,
      transparent ${transparentSize}px
    )`;
  }
}

function updateFadeInOpacity(scrollPercentage) {
  const fadeStart = 0;
  const fadeEnd = 0.1;
  // ponytail: cap at 0.6 so projects stay readable over the orange wash
  const maxOpacity = 0.6;
  if (scrollPercentage > fadeStart && scrollPercentage < fadeEnd) {
    const adjustedPercentage = (scrollPercentage - fadeStart) / (fadeEnd - fadeStart);
    fadeOpacity.value = Math.min(adjustedPercentage, 1) * maxOpacity;
  } else if (scrollPercentage >= fadeEnd) {
    fadeOpacity.value = maxOpacity;
  } else {
    fadeOpacity.value = 0;
  }
}

// Use IntersectionObserver to add "in-view" when the project enters the viewport,
// and add either .down (for scrolling down) or .up (for scrolling upward) when it's leaving.
useIntersectionObserver((entry) => {
  const el = entry.target;
  if (entry.isIntersecting) {
    // Clear exit states when re-entering
    el.classList.remove('leaving-up', 'leaving-down');

    // Set starting pose based on scroll direction, then transition to in-view
    if (scrollDirection.value < 0) {
      // Scrolling up: fall from the top
      el.classList.add('enter-from-above');
      el.classList.remove('enter-from-below');
    } else {
      // Scrolling down: rise from the bottom
      el.classList.add('enter-from-below');
      el.classList.remove('enter-from-above');
    }

    // Next frame: trigger the transition to in-view
    requestAnimationFrame(() => {
      el.classList.add('in-view');
    });

    // Cleanup the enter classes after the transition completes
    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
        el.classList.remove('enter-from-above', 'enter-from-below');
        el.removeEventListener('transitionend', onTransitionEnd);
      }
    };
    el.addEventListener('transitionend', onTransitionEnd);
  } else {
    el.classList.remove('in-view');
    // Mark the direction it left the viewport (kept for potential future styling)
    if (scrollDirection.value < 0) {
      el.classList.add('leaving-up');
      el.classList.remove('leaving-down');
    } else {
      el.classList.add('leaving-down');
      el.classList.remove('leaving-up');
    }
  }
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener("scroll", handleScroll);
  }
});
  
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style scoped>
:global(html, body) {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  /* Remove fixed height so body grows with content */
}

.fade-in-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #efa819;
  transition: opacity 0.5s ease;
  z-index: -1;
}

.container {
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  /* Remove overflow-x/overflow-y to avoid creating a nested scrollable area */
}

/* Keep the fullscreen section intact */
.fullscreen-container {
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
}

/* Background remains fixed so stripe animation is intact */
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    -45deg,
    #efa819,
    #efa819 5px,
    black 1px,
    transparent 4px,
    transparent 95px
  );
  transform: rotate(180deg);
  z-index: -10;
}

.bg::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  background: linear-gradient(to bottom right, #3c3f58 50%, transparent 50%);
  animation: revealStripes 1.2s forwards;
}

@keyframes revealStripes {
  0% {
    width: 200%;
    height: 200%;
  }
  100% {
    width: 0;
    height: 0;
  }
}

.heading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ponytail: real gap replaces negative margin so number and "projects" label never collide */
  gap: clamp(0.5rem, 2vh, 1.5rem);
}

.heading {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.heading-title {
  /* ponytail: hero number scales with viewport height, ~320px on 1080p laptop, ~560px on 1440p */
  font-size: clamp(18rem, 35vh, 32rem);
  font-weight: 700;
  animation: fadeInUp 1s ease-out forwards;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  line-height: 0.9;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.heading-text {
  font-size: clamp(2rem, 5vw, 5rem);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease-out forwards;
}

@media (max-width: 768px) {
  .heading-title {
    margin: 0;
    padding: 0;
    line-height: 0.9;
    font-size: clamp(12rem, 38vh, 18rem);
  }

  .heading-text {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  .scroll-down-text {
    animation: spin-slow 3s linear infinite;
    width: 100px;
  }

  .arrow-down {
    width: 25px;
  }
}

@media (max-width: 425px) {
  .heading-title {
    font-size: clamp(9rem, 32vh, 14rem);
  }

  .heading-text {
    font-size: clamp(1.25rem, 5vw, 2rem);
  }
}

.scroll-down-indicator {
  transition: opacity 0.5s ease-out;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -25%);
  opacity: 1;
}

.scroll-down-text {
  animation: spin-slow 3s linear infinite;
  width: 120px;
}

.arrow-down {
  width: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* gap is handled per-item using --project-gap */
  padding: 2rem 0;
}

.projects > * {
  width: 40%;
  opacity: 0; /* hidden until intersecting */
  will-change: transform, opacity;
  transition: opacity 700ms ease, transform 600ms ease;
  margin-bottom: var(--project-gap, 48px);
}

@media (max-width: 768px) {
  .projects > * {
    height: 55vh;
    width: 75%;
  }
  /* hack because text is too long for some devices and gets hidden after overflowing */
  .projects > div:last-child {
    margin-bottom: 0;
    padding-bottom: 10vh;
  }
}

@media (min-aspect-ratio: 21/9) {
  .projects > * {
    width: 30%;
  }
}

/* Direction-aware enter animations */
.projects > *.enter-from-below { transform: translateY(140px); opacity: 0; }
.projects > *.enter-from-above { transform: translateY(-140px); opacity: 0; }
.projects > *.in-view { opacity: 1; transform: translateY(0); }

/* Provide a tiny extra bottom breathing room on large screens to avoid elastic bounce
   when the last item is mid-transition (non-layout transform). */
@media (min-width: 769px) {
  .projects::after {
    content: "";
    display: block;
    height: 6vh;
  }
}
/* Animate out depending on scroll direction */
.projects > *.leaving-down {
  opacity: 0;
  transform: translateY(450px);
}
.projects > *.leaving-up {
  opacity: 0;
  transform: translateY(-450px);
}
</style>