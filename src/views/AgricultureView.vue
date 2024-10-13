<script setup>
import Navbar from '../components/Navbar.vue';
import { ref, onMounted, onUnmounted } from 'vue';

// Define reactive variables for the second, third, and fourth image text visibility
const showSecondImageText = ref(false);
const showThirdImageText = ref(false);
const showFourthImageText = ref(false);

onMounted(() => {
  // Intersection Observer for detecting when the first image is out of view (for second image)
  const observerFirstImage = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) { // Check if the first image is out of view
        showSecondImageText.value = true; // Show text for second image
      } else {
        showSecondImageText.value = false; // Hide text when the first image is back in view
      }
    });
  });

  // Intersection Observer for detecting when the second image is out of view (for third image)
  const observerSecondImage = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) { // Check if the second image is out of view
        showThirdImageText.value = true; // Show text for third image
      } else {
        showThirdImageText.value = false; // Hide text when the second image is back in view
      }
    });
  });

  // Intersection Observer for detecting when the third image is out of view (for fourth image)
  const observerThirdImage = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) { // Check if the third image is out of view
        showFourthImageText.value = true; // Show text for fourth image
      } else {
        showFourthImageText.value = false; // Hide text when the third image is back in view
      }
    });
  });

  const firstImage = document.querySelector('.first-image'); // Target the first image
  const secondImage = document.querySelector('.second-image'); // Target the second image
  const thirdImage = document.querySelector('.third-image'); // Target the third image

  if (firstImage) {
    observerFirstImage.observe(firstImage); // Observe the first image
  }

  if (secondImage) {
    observerSecondImage.observe(secondImage); // Observe the second image
  }

  if (thirdImage) {
    observerThirdImage.observe(thirdImage); // Observe the third image
  }

  // Cleanup on unmount
  onUnmounted(() => {
    observerFirstImage.disconnect();
    observerSecondImage.disconnect();
    observerThirdImage.disconnect();
  });
});
</script>

<template>
  <div class="agriculture-container">
    <Navbar />

    <!-- First Image -->
    <div class="image-container first-image">
      <img src="../assets/Agriculture.png" style="width: 100%; height: 100%; position: absolute;">
      <div class="centered-text">
        Food and Agriculture
      </div>
      <div class="bottom-right-text">
        Benchmark in China
      </div>
    </div>

    <!-- Second Image -->
    <div class="image-container second-image">
      <img src="../assets/Stars.jpg" style="width: 100%; height: 100%; position: absolute;">
      <div class="second-title" :class="{ 'fade-in': showSecondImageText }">
        Project Introduction
      </div>
      <div class="second-text" :class="{ 'fade-in': showSecondImageText }">
        Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
      </div>
    </div>

    <!-- Third Image -->
    <div class="image-container third-image">
      <img src="../assets/Stars.jpg" style="width: 100%; height: 100%; position: absolute;">
      <div class="third-title" :class="{ 'fade-in': showThirdImageText }">
        How do youth promote<br>corporate behavior change?
      </div>
      <div class="third-text" :class="{ 'fade-in': showThirdImageText }">
        Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
      </div>
    </div>

    <!-- Fourth Image -->
    <div class="image-container fourth-image">
      <img src="../assets/Stars.jpg" style="width: 100%; height: 100%; position: absolute;">
      <div class="fourth-title first" :class="{ 'fade-in': showFourthImageText }">
        Food and Agriculture, China
      </div>
      <div class="fourth-title second" :class="{ 'fade-in': showFourthImageText }">
        <a href="https://example.com/2013" target="_blank">2013 ←</a>
      </div>
      <div class="fourth-title third" :class="{ 'fade-in': showFourthImageText }">
        <a href="https://example.com/2014" target="_blank">2014 ←</a>
      </div>
    </div>
  </div>
</template>

<style>
/* Entire Page Styling */
.agriculture-container {
  display: flex;
  flex-direction: column;
  height: calc(400vh + 122.5px); /* Ensure enough space for scrolling with four images */
}

/* Image container styling */
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  position: relative;
}

/* Centered text styling */
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  color: white;
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 2s forwards;
  white-space: nowrap;
}

/* Bottom right text styling */
.bottom-right-text {
  position: absolute;
  bottom: 25%;
  right: 20%;
  font-size: 2rem;
  color: white;
  opacity: 0;
  animation: fadeIn 4s forwards;
}

/* Fade-in animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Fade-in class for image text */
.fade-in {
  opacity: 1;
  transition: opacity 1.5s ease-in-out; /* Smooth transition for visibility */
}

/* Second and third image titles */
.second-title,
.third-title {
  position: absolute;
  top: 20%;
  left: 15%;
  font-size: 3rem;
  color: white;
  opacity: 0;
}

.third-title {
  line-height: 1.2;
}

/* Second and third image texts */
.second-text,
.third-text {
  position: absolute;
  right: 15%;
  top: 50%;
  font-size: 1.5rem;
  width: 300px;
  color: white;
  opacity: 0;
}

/* Fourth image titles */
.fourth-title {
  position: absolute;
  font-size: 3rem;
  color: white;
  opacity: 0; /* Initial opacity set to 0 */
  left: 15%;
  transition: transform 0.3s ease, font-size 0.3s ease, opacity 1.5s ease-in-out; /* Fade-in effect */
}

.fourth-title.first {
  top: 20%;
}

.fourth-title.second {
  top: 50%;
}

.fourth-title.third {
  top: 80%;
}

.fourth-title a {
  color: white;
  text-decoration: none;
}

.fourth-title a:hover {
  font-size: 3.5rem; /* Increase size on hover */
  transform: scale(1.1); /* Subtle grow effect */
}

/* Make the text visible on fade-in */
.fade-in.second-title,
.fade-in.second-text,
.fade-in.third-title,
.fade-in.third-text,
.fade-in.fourth-title {
  opacity: 1;
}
</style>
