<template>
  <div class="app-container">
    <Navbar />
    <div class="gradient-background">
      <div class="content">
        <Globe ref="globeComponent" />
        <div class="panels">
          <button @click="rotateGlobeToPosition1">Rotate to Position 1</button>
          <button @click="rotateGlobeToPosition2">Rotate to Position 2</button>
          <button @click="rotateGlobeToPosition3">Rotate to Position 3</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Globe from './components/Globe.vue';
import { ref } from 'vue';

const globeComponent = ref(null);

const rotateGlobeToPosition1 = () => {
  globeComponent.value.rotateToPosition1();
};

const rotateGlobeToPosition2 = () => {
  globeComponent.value.rotateToPosition2();
};

const rotateGlobeToPosition3 = () => {
  globeComponent.value.rotateToPosition3();
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.gradient-background {
  flex: 1; /* Adjusted to take up available space */
  background: linear-gradient(to left, #000000, #000751); /* Gradient colors */
  display: flex;
  align-items: center;
  justify-content: center; /* Center content horizontally and vertically */
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.globe-container {
  width: 400px;
  height: 400px;
}

.panels {
  margin-top: 230px; /* Spacing above buttons */
}
</style>
