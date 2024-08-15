<template>
  <div class="container">
    <div class="bg"></div>
    <div class="fade-in-color" :style="{ opacity: fadeOpacity }"></div>
    <div class="fullscreen-container">
      <div class="heading-content">
        <div class="heading"><p class="heading-title">5</p></div>
        <div class="heading"><p class="heading-text">projects</p></div>
      </div>
      <div ref="scrollDownIndicator" class="scroll-down-indicator">
        <img
          src="/assets/icons/scroll-down-text.png"
          class="scroll-down-text"
          alt=""
        />
        <img
          src="/assets/icons/arrow-down-solid.svg"
          class="arrow-down"
          alt=""
        />
      </div>
    </div>
    <div class="projects">
      <Project ref="scrollingGuy"
        v-for="(project, index) in projects"
        :key="index"
        :head="project.head"
        :type="project.type"
        :role="project.role"
        :text="project.text"
      />
    </div> 
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Project from '../components/project.vue'; 

const initialStripeSize = 5;
const maxStripeSize = 190;
const fadeOpacity = ref(0);

const projects = [
// placeholders
  {
    head: 'EyeHide',
    type: 'startup',
    role: 'co-founder',
    text: 'At EyeHide, we are deeply concerned about the growing trend of neglecting user privacy, especially with the rise of AI and large language models. We believe everyone deserves a secure digital experience without compromising their privacy.'
  },
  {
    head: 'EyeHide',
    type: 'startup',
    role: 'co-founder',
    text: 'At EyeHide, we are deeply concerned about the growing trend of neglecting user privacy, especially with the rise of AI and large language models. We believe everyone deserves a secure digital experience without compromising their privacy.'
  },
  {
    head: 'EyeHide',
    type: 'startup',
    role: 'co-founder',
    text: 'At EyeHide, we are deeply concerned about the growing trend of neglecting user privacy, especially with the rise of AI and large language models. We believe everyone deserves a secure digital experience without compromising their privacy.'
  },
  {
    head: 'EyeHide',
    type: 'startup',
    role: 'co-founder',
    text: 'At EyeHide, we are deeply concerned about the growing trend of neglecting user privacy, especially with the rise of AI and large language models. We believe everyone deserves a secure digital experience without compromising their privacy.'
  },
  {
    head: 'EyeHide',
    type: 'startup',
    role: 'co-founder',
    text: 'At EyeHide, we are deeply concerned about the growing trend of neglecting user privacy, especially with the rise of AI and large language models. We believe everyone deserves a secure digital experience without compromising their privacy.'
  },
];


function handleScroll() {
  const scrollPosition = window.scrollY;
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollPosition / windowHeight / 1.8; // final division is a hack to slow down scroll speed
  const newStripeSize = initialStripeSize + scrollPercentage * (maxStripeSize - initialStripeSize);
  updateBackgroundGradient(newStripeSize);
  updateFadeInOpacity(scrollPercentage);
  const scrollThreshold = window.innerHeight * 2;
  const currentScroll = window.scrollY;
  if (currentScroll > scrollThreshold) {
    if (!isHorizontalScroll.value) {
      isHorizontalScroll.value = true;
    }
    const horizontalScroll = currentScroll - scrollThreshold;
    document.querySelector(".horizontal-scroll-container").scrollLeft = horizontalScroll;
  } else {
    if (isHorizontalScroll.value) {
      isHorizontalScroll.value = false;
    }
  }
}

function updateBackgroundGradient(stripeSize) {
  const bgElement = document.querySelector(".bg");
  if (bgElement) {
    const transparentSize = Math.max(90 - stripeSize, 0);
    bgElement.style.background = `repeating-linear-gradient(
      -45deg,
      #efa819,
      #efa819 ${stripeSize}px,
      black 1px,
      transparent 4px,
      transparent ${transparentSize}px
    )`;
  }
}

function updateFadeInOpacity(scrollPercentage) {
  const fadeStart = 0;
  const fadeEnd = 0.1;
  if (scrollPercentage > fadeStart && scrollPercentage < fadeEnd) {
    const adjustedPercentage = (scrollPercentage - fadeStart) / (fadeEnd - fadeStart);
    fadeOpacity.value = Math.min(adjustedPercentage, 1);
  } else if (scrollPercentage >= fadeEnd) {
    fadeOpacity.value = 1;
  } else {
    fadeOpacity.value = 0;
  }
}
let scrollingGuy = ref();
let scrollingContent = ref();
let pageTitle = ref();
let pageTitleCont = ref();
let laptopImage = ref();
let backgroundEffect = ref();
let scrolledPercentage = ref(0);
let scrollDownIndicator = ref();
const scrollHandler = () => {
    if (!scrollingGuy.value) return;
    scrolledPercentage.value = (scrollingContent.value.getBoundingClientRect().top - scrollingGuy.value.getBoundingClientRect().top) / scrollingContent.value.getBoundingClientRect().height;
    pageTitle.value.style.backgroundImage = `linear-gradient(60deg, #623bb0 0%, #975cfb ${scrolledPercentage.value * 50}%, #623bb0 100%)`;
    pageTitle.value.style.opacity = `${scrolledPercentage.value * 1.4 + 0.5}`
    pageTitleCont.value.style.transform = `translateY(${Math.max(scrolledPercentage.value * scrollingContent.value.getBoundingClientRect().height / 2.5 * -1, -260)}px)`
    laptopImage.value.style.transform = `translateY(${Math.max(scrolledPercentage.value * -90 - 40, -110)}%)`
    laptopImage.value.style.scale = Math.min(scrolledPercentage.value * 2.25, 1.35);
    backgroundEffect.value.style.opacity = scrolledPercentage.value

    if (scrolledPercentage.value > 0.4) {
        scrollDownIndicator.value.style.opacity = 0;
    } else {
        scrollDownIndicator.value.style.opacity = 1;
    }
};

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const visibilityThreshold = 0.8;
    return (
        rect.top + rect.height * visibilityThreshold >= 0 &&
        rect.left + rect.width * visibilityThreshold >= 0 &&
        rect.bottom - rect.height * visibilityThreshold <= windowHeight &&
        rect.right - rect.width * visibilityThreshold <= windowWidth
    );
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  
  // fadein
  const interval = () => {
      const els = [...document.querySelectorAll(".fadein")];
      setInterval(() => {
          els.forEach((el) => {
            if (isInViewport(el)) {
                el.classList.add("fadein-active");
            } else {
            }
        });
    });
  }
  interval();
  // scroll
  scrollHandler();
  window.addEventListener("scroll", scrollHandler)
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>

<style scoped>
.fade-in-color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 600vh;
  background-color: #efa819;
  transition: opacity 0.5s ease;
  z-index: -1;
}

.container {
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  overflow-x: hidden;
}

.fullscreen-container {
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.bg {
  display: flex;
  height: 600vh;
  width: 100vw;
  background: repeating-linear-gradient(
    -45deg,
    #efa819,
    #efa819 5px,
    black 1px,
    transparent 4px,
    transparent 95px
  );
  position: absolute;
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
  background: linear-gradient(to bottom right, #4d2282 50%, transparent 50%);
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

.heading {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.heading-title {
  font-size: 35rem;
  font-weight: 700;
  margin-right: auto;
  animation: fadeInUp 1s ease-out forwards;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
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
  font-size: 5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateY(-110px) !important;
  animation: fadeInUp 1s ease-out forwards;
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

@media (max-width: 768px) {
  .heading-title {
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  .heading-title {
    font-size: 25rem;
  }

  .heading-text {
    font-size: 2rem;
    transform: translateY(-10px) !important;
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
    font-size: 20rem;
  }

  .heading-text {
    font-size: 2rem;
  }
}

.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500vh;
}
.projects > * {
  height: 40vh;
  margin-bottom: 50vh;
  width: 40%;
  animation: fadeInUp 1s ease-out forwards;
}
</style>
