<template>
  <div class="wrapper">
    <div class="title">
      <div class="heading-container">
        <h1 class="heading">{{ head }}</h1>
        <a v-if="link" :href="link" target="_blank" class="check-it-out">
          <span v-if="link.includes('github')">
            Check it out <img src="assets/icons/github-mark.png" alt="GitHub" class="icon"/>
          </span>
          <span v-else>
            Check it out 🌐
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
};
</script>

<style scoped>
.wrapper {
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
  font-size: 1.7rem;
  font-weight: 400;
}
.type {
  color: #4c217e;
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
  font-size: 2rem;
  color: #333;
}
.check-it-out {
  text-decoration: none;
  font-size: 1.5rem;
  color: #6433c5;
  display: flex;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #6433c5;
  padding: 5px 10px;
}
.check-it-out:hover {
  background-color: #6433c5;
  color: #efa819;
}
.check-it-out:hover .icon {
  content: url('assets/icons/github-mark-white.png');
}
.icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
@media (max-width: 768px) {
  .specs {
    flex-direction: column;
  }
  .heading-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .heading {
    margin-bottom: 1vh;
  }
  .type, .role, .org {
    margin-bottom: 1vh;
  }
  .text {
    font-size: 1.5rem;
    color: #333;
  }
}
</style>