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
    globe.rotation.y += rotate_offset; // Rotate globe
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

const rotateToPosition1 = () => {
  if (globe) {
    rotate_offset = 0;
    globe.rotation.set(Math.PI * (1/7), 0, 0); // Rotation position 1 (default front view)
  }
};

const rotateToPosition2 = () => {
  if (globe) {
    rotate_offset = 0;
    globe.rotation.set(Math.PI * (1/7), Math.PI * (6/7), 0); // Rotation position 2 (tilted)
  }
};

const rotateToPosition3 = () => {
  if (globe) {
    rotate_offset = 0;
    globe.rotation.set(Math.PI * (1/14), Math.PI * (10/7), 0); // Rotation position 3 (back view)
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
  left: 0%; /* 25% from the left side of the screen */
  top: 30%; /* Center vertically */
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
}

.globe-box {
  width: 100%;
  height: 100%;
}
</style>
