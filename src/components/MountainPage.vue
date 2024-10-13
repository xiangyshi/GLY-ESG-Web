<script setup>
  import { ref } from 'vue';

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
  <div class="mountain-background">
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
        <p style="color: white; font-size: 60px; text-align: center; font-family: Arial, sans-serif;">SDG</p>
        <p style="color: white; font-size: 36px; font-family: Arial, sans-serif;">Visual make a Better World.</p>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --vbox: 86vh;
}
.mountain-background {
  position: relative;
  height: var(--vbox);
  z-index: 0;
}
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
