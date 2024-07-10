<template>
    <div>
      <nav>
        <div class="menu">
          <p class="website_name"></p>
          <div class="menu_links">
            <nuxt-link to="/" class="link">home</nuxt-link>
            <nuxt-link to="/about" class="link">about</nuxt-link>
            <nuxt-link to="/projects" class="link">projects</nuxt-link>
            <nuxt-link to="/contact" class="link">contact me</nuxt-link>
          </div>
          <div class="menu_icon">
            <span class="icon"></span>
          </div>
        </div>
      </nav>
      <!-- navbar+links end-->
  
      <section class="spacer"></section>
      <h1>My Projects</h1>
      <section class="spacer"></section>
      <section class="staggered container">
        <section class="wrapper">
          <div id="scene" class="scene" data-hover-only="false">
            <div class="staggered_text">
              <!-- Project details go here -->
            </div>
          </div>
        </section>
      </section>
    </div>
</template>
  