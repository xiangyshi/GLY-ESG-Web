<template>
  <div class="app-container">
    <Navbar />
    <!-- BEGIN GLOBE PAGE -->
    <div class="gradient-background">
      <ArcCanvas class="arc"/>
      <div class="content">
        <div class="globe-and-tags">
          <!-- Globe Component -->
          <Globe ref="globeComponent" />
          <!-- Buttons for rotating the globe -->
          <div class="tags">
            <ul>
              <li><button @click="rotateGlobeToPosition1"><h1> About Our Partnership </h1></button></li>
              <li><button class="indent" @click="rotateGlobeToPosition2"><h1> Meet Our Partnership </h1></button></li>
              <li><button @click="rotateGlobeToPosition3"><h1> Join Our Partnership </h1></button></li>
            </ul>
          </div>
        </div>
        <!-- Text box for displaying hovered text -->
        <div class="text-box">
          {{ hoveredText }}
        </div>
      </div>
    </div>
    <!-- END GLOBE PAGE-->

    <!-- BEGIN MOUNTAIN PAGE -->
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
          <p style="color: white; font-size: 60px; text-align: center;">SDG</p>
          <p style="color: white; font-size: 36px;">Visual make a Better World.</p>
        </div>
      </div>
    </div>
    <!-- END MOUNTAIN PAGE -->
  </div>
</template>

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

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 200vh;
}

/* Globe Page Styling */

.gradient-background {
  flex: 1;
  background-image: url("assets/stars.jpg"); /* Gradient background */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between the globe and the text box */
  width: 100%;
  height: 100%;
  z-index: 0;
}

.globe-and-tags {
  display: flex;
  flex-direction: column; /* Stack globe and tags vertically */
  align-items: center;
}

.globe-container {
  width: 400px;
  height: 400px;
}

.tags {
  margin-top: 40px;
}

.tags ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}


.tags button {
  background-color: rgb(0, 17, 88);
  color: #ffffff;
  padding: 15px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 15px;
  font-size: 16px;
  margin-left: 200%;
  margin-bottom: 50px;
  z-index: 1;
}

.tags .indent {
  margin-left: 215%;
}

.tags button:hover {
  background: linear-gradient(to left, #000528, #000540);
}

.text-box {
  background-color: rgba(0, 2, 129, 0.8);
  color: white;
  padding: 20px;
  width: 700px; /* Adjust width as needed */
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 40px;
}

.arc {
  position: absolute;
}

/* Mountain Page Styling */

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