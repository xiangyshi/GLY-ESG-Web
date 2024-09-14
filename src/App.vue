<template>
  <div class="app-container">
    <Navbar />
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
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

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

</style>