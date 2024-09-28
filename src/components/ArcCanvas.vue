<template>
    <div class="canvas-container">
      <canvas ref="canvas" width="500" height="700"></canvas>
    </div>
  </template>
  
<script setup>
import { onMounted, ref } from 'vue';

const canvas = ref(null);

onMounted(() => {
const ctx = canvas.value.getContext('2d');

// Clear the canvas
ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

// Draw a custom arc
ctx.beginPath();
ctx.arc(-100, 350, 450, -Math.PI / 2, Math.PI / 2, false);
ctx.stroke();

ctx.lineWidth = 3;
ctx.strokeStyle = 'white';
ctx.stroke();
});
</script>
  
<style scoped>
.canvas-container {
  display: absolute;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
</style>
  