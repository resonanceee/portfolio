<template>
  <div class="wrapper">
    <div class="content-container">
      <div class="left-section">
        <div class="heading-container">
          <div class="heading">
            <p class="title">GET IN TOUCH FOR PROJECT INQUIRIES.</p>
            <p class="subtitle">CURRENTLY AVAILABLE FOR FREELANCE PROJECTS.</p>
          </div>
        </div>
      </div>
      <div class="right-section">
        <div class="heading-container">
          <div class="heading">
            <p class="title">MAIL</p>
            <p class="content">yaroslav.rivny@gmail.com</p>
            <p class="title">X</p>
            <a class="content" href="https://x.com/_resonanceee_">@_resonanceee_</a>
            <p class="title">GitHub</p>
            <a class="content" href="https://github.com/resonanceee">@resonanceee</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*gotta fiddle around with background colors*/
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #50879a;
}

.content-container {
  display: flex;
  width: 90%;
  height: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.left-section {
  width: 55%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.right-section {
  width: 45%;
  background-color: #ffc531;
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

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.content {
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-decoration: none;
}

.content:hover {
  text-decoration: underline;
}
</style>