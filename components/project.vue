<template>
    <div class="wrapper">
        <div class="title">
            <h1 class="heading">{{ head }}</h1>
            <div class="specs">
                <p class="type">{{ type }}</p>
                <p class="role">{{ role }}</p>
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
    text: String,
  },
};
</script>

<style scoped>
.wrapper {
    width: 60vw;
    height: 80vh;
}
.heading {
    font-size: 3rem;
    color: #333;
    padding-bottom: 0.5%;
}
.specs {
    display: flex;
    flex-direction: row ;
}
.title {
    padding: 20px;
}
.text {
    font-size: 1.5rem;
    color: #333;
}
.type {
    font-size: 1.6rem;
    color: #6315c2;
    padding-right: 1%;
    font-weight: 700;

}
.role {
    font-size: 1.6rem;
    color: #444444;
    padding-bottom: 1%;
    font-weight: 600;
}
@media (max-width: 768px) {
    .specs {
        flex-direction: column;
    }
    .heading{
        margin-bottom: 1vh;
    }
    .type{
        margin-bottom: 1vh;
    }
    .role {
        margin-bottom: 1vh;
    }
    .text {
        font-size: 1.1rem;
        color: #333;
    }
}
</style>