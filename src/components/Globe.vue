<template>
  <div class="globe-container">
    <div ref="globeBox" class="globe-box"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineExpose, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const globeBox = ref(null); // Reference to the globe container
let globe = null; // Globe mesh
let camera = null; // Camera reference
let renderer = null; // Renderer reference
let rotate_offset = 0.001;

const initGlobe = () => {
  // Set up the scene
  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(800, 800); // Fixed square size
  globeBox.value.appendChild(renderer.domElement);

  // Create the sphere (globe)
  const geometry = new THREE.SphereGeometry(7, 32, 32);
  const texture = new THREE.TextureLoader().load('/assets/dark-globe.gif');
  const material = new THREE.MeshBasicMaterial({ map: texture });

  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  globe = new THREE.Mesh(geometry, material); // Save globe reference
  scene.add(globe);

  // Position camera
  camera.position.z = 15;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    globe.rotation.y += rotate_offset;
    renderer.render(scene, camera);
  };
  animate();

  // Handle resizing
  const onWindowResize = () => {
    const width = 300;
    const height = 300;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onWindowResize);

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize);
  });
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function rotateToPosition1() {
  if (globe) {
    rotate_offset = 0;
    let dx = (Math.PI * (1/7) - globe.rotation.x) / 100;
    let dy = (-globe.rotation.y) / 100;
    let dz = (-globe.rotation.z) / 100;

    for (let i = 0; i < 100; i++) {
      await sleep(5);
      globe.rotation.set(globe.rotation.x + dx, globe.rotation.y + dy, globe.rotation.z + dz);
    }
  }
};

async function rotateToPosition2() {
  if (globe) {
    rotate_offset = 0;
    let dx = (Math.PI * (1/7) - globe.rotation.x) / 100;
    let dy = (Math.PI * (6/7) - globe.rotation.y) / 100;
    let dz = (-globe.rotation.z) / 100;

    for (let i = 0; i < 100; i++) {
      await sleep(5);
      globe.rotation.set(globe.rotation.x + dx, globe.rotation.y + dy, globe.rotation.z + dz);
    }
  }
};

async function rotateToPosition3() {
  if (globe) {
    rotate_offset = 0;
    let dx = (Math.PI * (1/14) - globe.rotation.x) / 100;
    let dy = (Math.PI * (10/7) -globe.rotation.y) / 100;
    let dz = (-globe.rotation.z) / 100;

    for (let i = 0; i < 100; i++) {
      await sleep(5);
      globe.rotation.set(globe.rotation.x + dx, globe.rotation.y + dy, globe.rotation.z + dz);
    }
  }
};

defineExpose({
  rotateToPosition1,
  rotateToPosition2,
  rotateToPosition3
});

onMounted(() => {
  initGlobe();
});
</script>

<style scoped>
.globe-container {
  position: absolute;
  left: 2%; /* 25% from the left side of the screen */
  top: 45%; /* Center vertically */
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
}

.globe-box {
  width: 100%;
  height: 100%;
}
</style>
