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
    <div style="flex: 1; position: relative;">
      <img src="./components/Mountain.png" style="width: 100%; height: 100%; position: absolute;">
      
      <div class="content">
        <div class="button-container">
          <div v-for="(button, index) in buttons" :key="index" class="button-wrap">
            <button @mouseover="handleMouseEnter(index)" @mouseout="handleMouseLeave(index)"
            :class="['expand-button', { active: activeButton === index, other: activeButton !== null && activeButton !== index }]"
            @click="redirectTo(button.link)">
              {{ button.text }}
            </button>
            <div v-show="activeButton === index" class="expand-content">
              <div class="chart" style="background-color: red;">HQ Global Region</div>
              <div class="chart" style="background-color: blue;">Asia-Pacific</div>
              <div class="chart" style="background-color: green;">China</div>
            </div>
          </div>
        </div>

        <div v-show="!expandContent" class="text-container">
          <p style="color: white; font-size: 60px;">SDG</p>
          <p style="color: white; font-size: 36px;">Visual make a Better World.</p>
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

const buttons = ref([
{ text: 'Food and Agriculture', link: 'https://example.com' },
  { text: 'Digital Inclusion', link: 'https://example.com' },
  { text: 'Financial System', link: 'https://example.com' }
]);

const activeButton = ref(null);
const expandContent = ref(false);

const handleMouseEnter = (index) => {
  activeButton.value = index;
  expandContent.value = true;
};

const handleMouseLeave = (index) => {
  if (activeButton.value === index) {
    activeButton.value = null;
    expandContent.value = false;
  }
};

const redirectTo = (url) => {
  window.location.href = url;
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 200vh;
}

.gradient-background {
  flex: 1;
  background: linear-gradient(to left, #000000, #000751);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 50px;
  padding: 0 15%;
  position: absolute;
}

.globe-container {
  width: 400px;
  height: 400px;
}

.panels {
  margin-top: 230px;
}

.expand-button {
  transition: transform 0.3s ease;
  margin: 3vh 0;
  font-size: 20px;
  width: 30vw;
  height: 15vh;
  background-color: white;
  border: none;
}

.expand-button.active {
  transform: scale(1.2);
  height: 250px;
}

.expand-button.other {
  transform: scale(0.8);
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  position: absolute;
  padding-right: 25%;
}

.button-wrap {
  position: relative;
}

.text-container {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40%;
}

.expand-content {
  transition: width 0.5s ease;
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  height: 300px;
  background-color: white;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  pointer-events: none;
}

.chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 5px 0;
}
</style>
