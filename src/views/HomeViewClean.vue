<script setup>
    import Navbar from '../components/Navbar.vue';
    import GlobePage from '@/components/GlobePage.vue';
    import MountainPage from '@/components/MountainPage.vue';
    import { ref } from 'vue';

    const components = [GlobePage, MountainPage];

    const currentIndex = ref(0);

    const nextComponent = () => {
        currentIndex.value = (currentIndex.value + 1) % components.length;
        console.log(currentIndex.value);
    };

    const prevComponent = () => {
        currentIndex.value = (currentIndex.value - 1 + components.length) % components.length;
        console.log(currentIndex.value);
    };
</script>

<template>
  <Navbar class="navbar" />
  <div id="app">
    <!-- Transition for sliding effect -->
    <transition name="smooth-slide">
      <component :is="components[currentIndex]" />
    </transition>

    <!-- Navigation buttons -->
    <div class="navigation-buttons">
      <button @click="prevComponent">Previous</button>
      <button @click="nextComponent">Next</button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
    width: 100%;
    position: relative;
    top: -2px;
}

.globe-background {
    background-image: url("../assets/stars.jpg");
}

.mountain-background {
    background-image: url("../assets/Mountain.png");
    background-size: cover;
    background-position: center;
}

.navigation-buttons {
    position: relative;
    display: flex;
    justify-content: center;
    max-height: 30px;
}

.navigation-buttons button {
    position: relative;
    bottom: 30px;
    color: white;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
}

/* Smoother sliding animation */
.smooth-slide-enter-active, .smooth-slide-leave-active {
    transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
    z-index: -1;
}

.smooth-slide-enter, .smooth-slide-leave-to {
    transform: translateY(-100%);
    opacity: 1;
}

.smooth-slide-leave, .smooth-slide-enter-to {
    transform: translateY(-100%);
    opacity: 1;
}
</style>