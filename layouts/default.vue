<template>
  <div style="position: fixed; top: 0; z-index: 999; right: 0; left: 0;" class="nav">
    <div class="menu">
      <p class="website_name"></p>
      <div class="menu_links">
        <NuxtLink to="/" class="link">home</NuxtLink>
        <NuxtLink to="/work" class="link">work</NuxtLink>
        <NuxtLink to="/contact"class="link">contact me</NuxtLink>
      </div>
      <div class="menu_icon" :class="{ 'active': isVisible }" @click="toggleVisibility">
        <span class="icon"></span>
      </div>
      </div>
      <div v-if="isVisible" class="toggle-div" @click="toggleVisibility" ref="hamburgerTransition">
          <NuxtLink to="/" class="burgerlink">home</NuxtLink>
          <NuxtLink to="/work" class="burgerlink">work</NuxtLink>
          <NuxtLink to="/contact"class="burgerlink">contact me</NuxtLink>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
      
      if (this.isVisible) {
        this.$nextTick(() => {
          const hamburgerTransition = this.$refs.hamburgerTransition;
          hamburgerTransition.style.animation = 'hamburgerTransition 0.3s forwards';
        }); 
      }
    }
  }
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
.nav .menu {
  width: 100%;
  height: 80px;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  box-sizing: border-box;
  z-index: 3;
}
.nav .menu .website_name {
  width: 75px;
  height: 75px;
  z-index: 0;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 0px 30px;
  bottom: 0;
  right: 0;
}
.nav .menu .website_name:hover {
  opacity: 1;
}
.nav .menu .menu_links {
  transition: all 0.4s ease;
  opacity: 0.5;
}
.nav .menu .menu_links:hover {
  opacity: 1;
}
@media screen and (max-width: 799px) {
  .nav .menu .menu_links {
    display: none;
  }
}
.nav .menu .menu_links .link {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  margin-right: 50px;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s 0.2s ease;
}
.nav .menu .menu_links .link:last-child {
  margin-right: 0;
}
.nav .menu .menu_links .link:before {
  content: "";
  position: absolute;
  width: 0px;
  height: 4px;
  background: linear-gradient(90deg, #FFEDC0 0%, #FF9D87 100%);
  bottom: -10px;
  border-radius: 4px;
  transition: all 0.4s cubic-bezier(0.82, 0.02, 0.13, 1.26);
  left: 100%;
}
.nav .menu .menu_links .link:hover {
  opacity: 1;
  color: #FB8A8A;
}
.nav .menu .menu_links .link:hover:before {
  width: 40px;
  left: 0;
}
.nav .menu .menu_icon {
  width: 40px;
  height: 40px;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 7;
}
@media screen and (max-width: 799px) {
  .nav .menu .menu_icon {
    display: flex;
  }
}
.nav .menu .menu_icon .icon {
  width: 24px;
  height: 2px;
  background: white;
  position: absolute;
  transition: all 0.3s ease;
  z-index: 1000;
  cursor: pointer;
}

.nav .menu .menu_icon .icon:before, 
.nav .menu .menu_icon .icon:after {
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  position: absolute;
  transition: all 0.3s ease;
}

.nav .menu .menu_icon .icon:before {
  transform: translateY(-8px);
}

.nav .menu .menu_icon .icon:after {
  transform: translateY(8px);
}

.nav .menu .menu_icon:hover .icon,
.nav .menu .menu_icon:hover .icon:before,
.nav .menu .menu_icon:hover .icon:after {
  background: #FFEDC0;
}

.nav .menu .menu_icon.active .icon {
  transform: rotate(135deg);
  cursor: pointer;
}

.nav .menu .menu_icon.active .icon:before {
  top: 0;
  transform: rotate(90deg);
}

.nav .menu .menu_icon.active .icon:after {
  top: 0;
  transform: rotate(0);
}

.toggle-div {
  position: fixed;
  top: 0;
  left: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: 0px 0px,0px 0px,0px 0px,0px 0px,0px 0px;
  background-color: #3c3f58;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
  margin-right: 20px;
}

.toggle-div * {
  pointer-events: auto;
}

@keyframes hamburgerTransition {
  from { opacity: 0; }
  to { opacity: 1; }
}

.burgerlink {
  color: white;
  text-transform: uppercase;
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: 200;
  margin-right: 50px;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s 0.2s ease;
  padding-bottom: 25px;
  text-decoration: underline;

}
</style>
