<template>
  <div class="wrapper">
    <div class="title">
      <div class="heading-container">
        <h1 class="heading">{{ head }}</h1>
        <a   :href="link" 
          target="_blank" 
          class="check-it-out" 
          :class="{ 'disabled-link': isPrivate }"
          @click="isPrivate && $event.preventDefault()">
          <span v-if="link.includes('github')">
            Check it out <img src="assets/icons/github-mark.png" alt="GitHub" class="icon"/>
          </span>
          <span v-else-if="!isPrivate">
            Check it out 🌐
          </span>
          <span span v-if="isPrivate" class="private">
            Private 🔒
          </span>
        </a>
      </div>
      <div class="specs">
        <p class="type">{{ type }}</p>
        <span v-if="type && (role || org)" class="separator"></span>
        <p class="role">{{ role }}</p>
        <span v-if="role && org" class="separator"></span>
        <p class="org">{{ org }}</p>
      </div>
      <p class="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',
  props: {
    head: String,
    type: String,
    role: String,
    org: String,
    text: String,
    link: {
      type: String,
      default: ''
    }
  },
  computed: {
    isPrivate() {
      return this.link && this.link.includes('private');
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: transparent;
  width: 60vw;
  height: 80vh;
  position: relative;
}
.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading {
  font-size: 3rem;
  color: #333;
  padding-bottom: 0.5%;
}
.specs {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1vh;
}
.specs p {
  margin: 0 10px;
  line-height: 1.6rem;
  font-size: 1.5rem;
  font-weight: 500;
}
.type {
  color: #6315c2;
}
.separator {
  border-left: 1px solid #000;
  height: 20px;
  margin: 0 10px;
}
.title {
  padding: 20px;
}
.text {
  font-size: 1.5rem;
  color: #333;
}
.check-it-out {
  text-decoration: none;
  font-size: 1.5rem;
  color: #9b59b6;
  display: flex;
  align-items: center;
  font-weight: 600;
  border-radius: 30px;
  border: 1px solid #9b59b6;
  padding: 5px 10px;
  white-space: nowrap;
}
.check-it-out:hover {
  background-color: #6433c5;
  color: #efa819;
}
.check-it-out:hover .icon {
  content: url('assets/icons/github-mark-white.png');
}
.check-it-out.disabled-link {
  background-color: #6433c5;
  color: #efa819;
  cursor: not-allowed !important;
}
.check-it-out.disabled-link:hover {
  cursor: not-allowed !important;
}
.icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
@media (max-width: 768px) {
  .specs {
    flex-direction: row;
  }
  .heading-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .heading {
    font-size: 2rem;
    margin-bottom: 1vh;
  }
  .specs p {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 0.5vh;
    margin: 0;
  }
  .text {
    font-size: 1rem;
    color: #333;
  }
  .check-it-out {
    font-size: 1rem;
    padding: 3px 7px;
  }
  .icon {
    width: 15px;
    height: 15px;
  }
}
</style>