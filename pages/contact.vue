<template>
  <div class="wrapper" @mousemove="handleMouseMove">
    <div class="content-container">
      <div class="left-section">
        <div class="heading-container">
          <div class="heading">
            <p class="ltitle">GET IN TOUCH FOR PROJECT INQUIRIES.</p>
            <p class="lsubtitle">CURRENTLY AVAILABLE FOR FREELANCE PROJECTS.</p>
          </div>
        </div>
      </div>
      <div class="right-section">
        <div class="heading-container">
          <div class="heading">
            <p class="title">MAIL</p>
            <p class="content" @mouseover="showCopyBubble" @mouseleave="hideCopyBubble" @click="copyToClipboard">yaroslav.rivny@gmail.com</p>
            <p class="title">X</p>
            <a class="content" href="https://x.com/_resonanceee_">@_resonanceee_</a>
            <p class="title">GitHub</p>
            <a class="content" href="https://github.com/resonanceee">@resonanceee</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isMobile && !showCopy" class="bubble" :class="{ 'hovered': isHovered }" :style="bubbleStyle">
      <span v-if="isHovered">Click me!</span>
    </div>
    <div v-if="showCopy" class="bubble hovered" :style="bubbleStyle">
      <span>{{ bubbleText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const bubbleStyle = ref({
  left: '0px',
  top: '0px',
});

const isMobile = ref(false);
const isHovered = ref(false);
const showCopy = ref(false);
const bubbleText = ref('Click me!');

onMounted(() => {
  isMobile.value = /Mobi|Android/i.test(navigator.userAgent);
});

const handleMouseMove = (event) => {
  if (!isMobile.value) {
    const { clientX, clientY } = event;
    const targetX = clientX - 25;
    const targetY = clientY - 25;

    bubbleStyle.value = {
      left: `${targetX}px`,
      top: `${targetY}px`,
    };

    const elementUnderCursor = document.elementFromPoint(clientX, clientY);
    isHovered.value = elementUnderCursor && elementUnderCursor.tagName === 'A';
  }
};

const showCopyBubble = (event) => {
  if (!isMobile.value) {
    const { clientX, clientY } = event;
    const targetX = clientX - 25;
    const targetY = clientY - 25;

    bubbleStyle.value = {
      left: `${targetX}px`,
      top: `${targetY}px`,
    };

    showCopy.value = true;
  }
};

const hideCopyBubble = () => {
  if (!isMobile.value) {
    showCopy.value = false;
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText('yaroslav.rivny@gmail.com').then(() => {
    bubbleText.value = 'Copied!';
    setTimeout(() => {
      bubbleText.value = 'Click me!';
    }, 1000);
  });
};
</script>
<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c3f58;
  cursor: none;
}

.content-container {
  position: relative;
  display: flex;
  width: 90%;
  height: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.left-section {
  width: 55%;
  background-color: #6d4ab1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.right-section {
  width: 45%;
  background-color: #e4a82a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.heading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.heading {
  font-size: 1.5rem;
  color: #333;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.ltitle {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
}

.lsubtitle {
  font-size: 1.4rem;
  color: #fafafa;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 20px;
}

.content {
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-decoration: none;
  cursor: none;
  transition: text-decoration 0.3s ease;
}

.content:hover {
  text-decoration: underline;
}

.bubble {
  position: absolute;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  animation: bubble 5s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: black;
  transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease, transform 0.3s ease;
  cursor: none;
}

.bubble.hovered {
  width: 120px;
  height: 60px;
  border-radius: 20px 20px 20px 0;
  background: yellow;
  mix-blend-mode: normal;
  transform: scale(1.1);
  cursor: none;
}

@keyframes bubble {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .left-section {
    width: 100%;
    height: 45%;
  }

  .right-section {
    width: 100%;
    height: 55%;
    padding-left: 0;
  }

  .bubble {
    display: none;
  }
  .heading {
  font-size: 1rem;
  } 

  .title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .ltitle {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .lsubtitle {
    font-size: 1.2rem;
    margin-bottom: 20px;
    overflow-wrap: break-word;
    word-break: break-word;
    max-width: 90%;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
  }

  .content {
    margin-bottom: 10px;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>