<template>
    <div class="fullscreen-container">
        <div class="bg"></div>
        <div class="heading-content">
            <div class="heading"><p class="heading-title">5</p></div>
            <div class="heading"><p class="heading-text">projects</p></div>
        </div>
        <div ref="scrollDownIndicator" class="scroll-down-indicator">
            <img src="/assets/icons/scroll-down-text.png" class="scroll-down-text" alt="">
            <img src="/assets/icons/arrow-down-solid.svg" class="arrow-down" alt="">
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const scrollDownIndicator = ref(null);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        scrollDownIndicator.value.style.opacity = 0;
        // Optional: Remove the event listener if you want the indicator to only fade out once
        window.removeEventListener('scroll', handleScroll);
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      scrollDownIndicator,
    };
  },
};
</script>

<style scoped>
/*gotta add reactivity based on screen size*/ 

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
    height: 100vh;
    width: 100vw;
    background: repeating-linear-gradient(
        -45deg,
        rgba(255, 166, 0, 0.205),
        rgba(255, 166, 0, 0.425) 5px,
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
    content: '';
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
    animation: fadeInUp 1s ease-out forwards;;
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
</style>