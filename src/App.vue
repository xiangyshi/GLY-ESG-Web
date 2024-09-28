<script setup>
import Navbar from './components/Navbar.vue';
import Globe from './components/Globe.vue';
import ArcCanvas from './components/ArcCanvas.vue';
import { ref } from 'vue';

const globeComponent = ref(null);
const hoveredText = ref('');

const rotateGlobeToPosition1 = () => {
  globeComponent.value.rotateToPosition1();
  setText("Panel 1");
};

const rotateGlobeToPosition2 = () => {
  globeComponent.value.rotateToPosition2();
  setText("Panel 2");
};

const rotateGlobeToPosition3 = () => {
  globeComponent.value.rotateToPosition3();
  setText("Panel 3");
};

const setText = (text) => {
  hoveredText.value = text;
};

const clearText = () => {
  hoveredText.value = "";
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

<template>
  <div class="app-container">
    <Navbar />
    <!-- BEGIN GLOBE PAGE -->
    <div class="globe-background" style="flex: 1; position: relative;">
      <img src="./assets/stars.jpg" style="width: 100%; height: 100%; position: absolute;">
      <div class="globe-page">
        <!-- Globe Box-->
        <div class="flex-globe">
          <Globe ref="globeComponent" />
        </div>
        <!-- Arc Box-->
        <div class="flex-arc">
          <ArcCanvas class="arc"/>
        </div>
        <!-- Partnership Labels -->
        <div class="flex-label">
          <div class="flex-label-container">
            <button class="shrink" @click="rotateGlobeToPosition1"><h1> About Our Partnership </h1></button>
            <button class="indent" @click="rotateGlobeToPosition2"><h1> Meet Our Partnership </h1></button>
            <button class="shrink" @click="rotateGlobeToPosition3"><h1> Join Our Partnership </h1></button>
          </div>
        </div>
        <!-- Partnership Text Box-->
        <div class="flex-text">
          <div class="text-box">
            {{ hoveredText }}
          </div>
        </div>

        
      </div>
    </div>
    <!-- END GLOBE PAGE-->

    <!-- BEGIN MOUNTAIN PAGE -->
    <div style="flex: 1; position: relative;">
      <img src="./assets/Mountain.png" style="width: 100%; height: 100%; position: absolute;">
      
      <div class="mountain-page">
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
          <p style="color: white; font-size: 60px; text-align: center;">SDG</p>
          <p style="color: white; font-size: 36px;">Visual make a Better World.</p>
        </div>
      </div>
    </div>
    <!-- END MOUNTAIN PAGE -->
  </div>
</template>

<style>
/* Entire Page Styling */
.app-container {
  display: flex;
  flex-direction: column;
  height: 200vh;
}

/* Globe Page Styling */
.globe-background {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.globe-page {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
}

.flex-globe {
  width: 800px;
  height: 800px;
}

.flex-arc {
  position: absolute;
  padding-left: 30%;
  max-width: 300px;
  flex-grow: 0.5;
}

.flex-label {
  position: absolute;
  height: 100%;
  padding-left: 40%;
  max-width: 300px;
  flex-grow: 0.5;
}

.flex-label-container{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.flex-text {
  z-index: 1;
  margin-left: 25%;
  height: 40%;
  min-width: 400px;
  min-height: 400px;
}

.text-box {
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.shrink {
  position: relative;
  margin-right: 40px;
}

.indent {
  position: relative;
  margin-left: 40px;
}

/* Mountain Page Styling */
.mountain-page {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
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
  margin-left: 20%;
  z-index: 2;
}

.button-wrap {
  position: relative;
}

.text-container {
  position: relative;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60%;
  z-index: 1;
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