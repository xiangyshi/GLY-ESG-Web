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
        <!-- 左侧的三个按钮 -->
        <div class="button-container">
          <div v-for="(button, index) in buttons" :key="index" class="button-wrap">
            <button @mouseover="handleMouseEnter(index)" @mouseout="handleMouseLeave(index)"
            :class="['expand-button', { active: activeButton === index, other: activeButton !== null && activeButton !== index }]"
            @click="redirectTo(button.link)">
              {{ button.text }}
            </button>
            <!-- 画卷内容 -->
            <div v-show="activeButton === index" class="expand-content">
              <div class="chart" style="background-color: red;">HQ Global Region</div>
              <div class="chart" style="background-color: blue;">Asia-Pacific</div>
              <div class="chart" style="background-color: green;">China</div>
            </div>
          </div>
        </div>

        <!-- 右侧的文字 -->
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
  flex: 1; /* Adjusted to take up available space */
  background: linear-gradient(to left, #000000, #000751); /* Gradient colors */
  display: flex;
  align-items: center;
  justify-content: center; /* Center content horizontally and vertically */
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
  margin-top: 230px; /* Spacing above buttons */
}

.expand-button {
  transition: transform 0.3s ease;
  margin: 3vh 0; /* 按钮间距增大 */
  font-size: 20px; /* 增大按钮大小 */
  width: 30vw;  /* 宽度为视口宽度的 10% */
  height: 15vh;  /* 高度为视口高度的 5% */
  background-color: white;
  border: none;
}

.expand-button.active {
  transform: scale(1.2); /* 横向放大1.2倍，纵向保持原样 */
  height: 250px; /* 纵向拉长到150px（可以调整为你需要的值） */
}

.expand-button.other {
  transform: scale(0.8); /* 非悬停按钮缩小 */
}

.button-container {
  display: flex;
  flex-direction: column; /* 纵向排列按钮 */
  justify-content: center;
  align-items: flex-start; /* 让按钮靠左对齐 */
  height: 100%;
  position: absolute;
  padding-right: 25%;
}

.button-wrap {
  position: relative;
}

.text-container {
  margin-left: 30px; /* 文字距按钮有一定间距 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40%;
}

.expand-content {
  transition: width 0.5s ease;
  position: absolute;
  left: 100%; /* 画卷展开位置在按钮的右侧 */
  top: 50%;
  transform: translateY(-50%);
  height: 300px;
  background-color: white;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 600px; /* 固定展开宽度 */
  pointer-events: none; /* 禁用鼠标事件，防止干扰悬停 */
}

.chart {
  width: 150px; /* 放大饼图大小 */
  height: 150px;
  border-radius: 50%;
  margin: 5px 0; /* 调整饼图之间的间距 */
}
</style>
