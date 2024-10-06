<script setup>
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';

// Sample data for the alumni avatars
const alumni = ref([
  { name: 'Hailan Sun', position: '...', email: '...', avatar: 'https://via.placeholder.com/80', comment: 'An exceptional software engineer blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.' },
  { name: 'Leo Shi', position: '...', email: '...', avatar: 'https://via.placeholder.com/80', comment: 'An exceptional software engineer blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.' },
  { name: 'Lorraine Xu', position: '...', email: '...', avatar: 'https://via.placeholder.com/80', comment: 'An exceptional software engineer blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.' },
  { name: 'Someone Else', position: '...', email: '...', avatar: 'https://via.placeholder.com/80', comment: 'An exceptional software engineer blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.' },
]);

const selectedAlumni = ref(null);

const handleAvatarClick = (alumnus) => {
  selectedAlumni.value = alumnus;
};
</script>

<template>
<div class="alum-container">
    <Navbar />
    <!-- Guided Area Section with Frame -->
    <div class="guided-area-frame">
    <div class="guided-area">
        <h2 style="margin-left: 15px;">Guided Area</h2>
        <div class="divider"></div>
        <div class="area-content">
        <!-- Left Area -->
        <div class="left-area">
            <div class="row">All People</div>
            <div class="divider"></div>
            <div class="row">Tech 4 Good</div>
            <div class="divider"></div>
        </div>

        <!-- Right Area -->
        <div class="right-area">
            <template v-if="selectedAlumni">
            <div class="selected-alumni-top">
                <img :src="selectedAlumni.avatar" alt="Enlarged Avatar" class="enlarged-avatar" />
                <div class="selected-alumni-info">
                <h3>{{ selectedAlumni.name }}</h3>
                <p>{{ selectedAlumni.comment }}</p>
                </div>
            </div>

            <div class="intro">
                <p>... His/Her Intro .................</p>
            </div>

            <ul class="bullet-points">
                <li style="margin-bottom: 30px;">Education Background: ...</li>
                <li style="margin-bottom: 30px;">Work Experience: ...</li>
                <li style="margin-bottom: 30px;">Internship Experience: ...</li>
                <li style="margin-bottom: 30px;">Extracurricular Activity: ...</li>
                <li style="margin-bottom: 30px;">Skill Certificate: ...</li>
            </ul>
            </template>
            <template v-else>
            <div class="outstanding-alumni">
                <span style="margin: 0 10px">🎉</span>
                <h3>Outstanding Alumni</h3>
                <span style="margin: 0 10px">🎉</span>
            </div>

            <div class="avatars">
                <div
                v-for="(alumnus, index) in alumni"
                :key="index"
                class="avatar"
                @click="handleAvatarClick(alumnus)"
                >
                <img :src="alumnus.avatar" alt="Avatar" class="avatar-image" />
                <p>{{ alumnus.name }}</p>
                <p>Position: {{ alumnus.position }}</p>
                <p>Email: {{ alumnus.email }}</p>
                </div>
            </div>
            </template>
        </div>
        </div>
    </div>
    </div>
</div>
</template>  

<style>
/* Entire Page Styling */
.alum-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Guided Area Frame Styling */
.guided-area-frame {
  border: 2px solid #000; /* Frame border */
  border-radius: 5px; /* Rounded corners for the frame */
  width: 80%; /* Set width to a smaller portion of the page */
  max-height: 60vh;
  margin: 20px auto; /* Center the frame horizontally */
  background-color: rgba(255, 255, 255, 0.9); /* Light background for readability */
  overflow: hidden;
}

/* Guided Area Styling */
.guided-area {
  position: relative; /* Relative to ensure it's layered over the background */
  z-index: 1; /* Make sure this content is above the background */
}

.divider {
  height: 2px; /* Line thickness */
  background-color: #000; /* Line color */
}

.area-content {
  display: flex;
}

.left-area {
  flex: 1; /* Takes 1/6 of the space */
  border-right: 2px solid #000; /* Optional divider */
}

.row {
  margin: 10px 0;
  margin-left: 15px;
}

.right-area {
  flex: 5; /* Takes 5/6 of the space */
  padding: 10px;
  overflow-y: auto;
  max-height: 50vh;
}

.outstanding-alumni {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.avatars {
  display: flex;
  flex-wrap: wrap; /* Allows avatars to wrap to the next line */
  justify-content: space-around;
}

.avatar {
  text-align: center;
  margin: 10px;
  cursor: pointer;
}

.avatar-image {
  width: 80px; /* Adjust size as necessary */
  height: 80px;
  border-radius: 50%; /* Makes the avatar circular */
}

.selected-alumni-top {
  display: flex;
  align-items: center;
  margin: 3% 0 3% 10%;
}

.enlarged-avatar {
  width: 130px; /* Adjust size for enlarged avatar */
  height: 130px; /* Adjust size for enlarged avatar */
  border-radius: 50%; /* Makes the avatar circular */
  margin-right: 50px; /* Space between avatar and info */
}

.selected-alumni-info {
  flex-grow: 1; /* Takes remaining space */
}

.intro {
  margin-left: 3%;
  margin-top: 20px; /* Space above the intro */
  margin-bottom: 30px;
}

.bullet-points {
  margin-left: 3%;
  margin-top: 10px; /* Space above the bullet points */
  padding-left: 20px; /* Indent the bullet points */
}

.selected-alumni {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>