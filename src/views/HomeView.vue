<script setup>
import Navbar from '../components/Navbar.vue';
import Globe from '../components/Globe.vue';
import ArcCanvas from '../components/ArcCanvas.vue';
import { ref, computed } from 'vue';

const globeComponent = ref(null);
const hoveredText = ref('');
const title = ref('');

const rotateGlobeToPosition1 = () => {
  globeComponent.value.rotateToPosition1();
  setText("Panel 1");
  setTitle(titles.value[0].text);
};

const rotateGlobeToPosition2 = () => {
  globeComponent.value.rotateToPosition2();
  setText("Panel 2");
  setTitle(titles.value[1].text);
};

const rotateGlobeToPosition3 = () => {
  globeComponent.value.rotateToPosition3();
  setText("Panel 3");
  setTitle(titles.value[2].text);
};

const setText = (text) => {
  hoveredText.value = text;
};

const setTitle = (text) => {
  title.value = text;
}

const titles = ref([
  { text: 'About Our Partnership'},
  { text: 'Meet Our Partnership'},
  { text: 'Join Our Partnership'},
])

const typeVisible = ref(false);
const hqVisible = ref(false);

const showTypeOptions = () => {
  typeVisible.value = true;
};

const hideTypeOptions = () => {
  typeVisible.value = false;
};

const showHQOptions = () => {
  hqVisible.value = true;
};

const hideHQOptions = () => {
  hqVisible.value = false;
};

const items = ref([
  { name: 'Company A', type: 'Private', hq: 'China', website: 'www.companya.com' },
  { name: 'Company B', type: 'NGO', hq: 'Hongkong China', website: 'www.companyb.com' },
  { name: 'Company C', type: 'Academia', hq: 'USA', website: 'www.companyc.com' },
]);

const typeOptions = ['All', 'Private', 'Academia', 'NGO', 'IGO'];
const hqOptions = ['All', 'China', 'Hongkong China'];

const selectedTypes = ref(['All']);
const selectedHQ = ref(['All']);

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const typeMatch = selectedTypes.value.includes('All') || selectedTypes.value.includes(item.type);
    const hqMatch = selectedHQ.value.includes('All') || selectedHQ.value.includes(item.hq);
    return typeMatch && hqMatch;
  });
});

const buttons = ref([
  { text: 'Food and Agriculture', link: '/agriculture' },
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
      <img src="../assets/Stars.jpg" style="width: 100%; height: 100%; position: absolute;">
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
            <button class="shrink" @click="rotateGlobeToPosition1"><h1> {{ titles[0].text }} </h1></button>
            <button class="indent" @click="rotateGlobeToPosition2"><h1> {{ titles[1].text }} </h1></button>
            <button class="shrink" @click="rotateGlobeToPosition3"><h1> {{ titles[2].text }} </h1></button>
          </div>
        </div>
        <!-- Partnership Text Box-->
        <div class="flex-text">
          <p style="color: white; font-size: 35px; text-align: center; font-family: Arial, sans-serif;">
            {{ title || '\u00A0' }}
          </p>
          <div v-if="title === titles[0].text || title === titles[2].text" class="text-box">
              <div v-if="title === titles[0].text">
                <h2>Private Sector</h2>
                <p>Texts for Private Sector. bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla. random text random text random text random text.</p>

                <h2>Academia</h2>
                <p>Texts for Academia.</p>

                <h2>NGO</h2>
                <p>Texts for NGO.</p>

                <h2>IGO</h2>
                <p>Texts for IGO.</p>

                <h2>Initiative</h2>
                <p>Texts for Initiative.</p>
              </div>
              <div v-if="title === titles[2].text">
                <p style="margin: 0;">Here's a paragraph introduction. bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla.</p>
              </div>
          </div>
          <div v-else class="text-box" style="background-color: transparent; overflow-y: hidden;">
            <div v-if="title === titles[1].text">
              <!-- First line: column names -->
              <div class="header">
                <div class="header-row">
                  <div>Namelist</div>
                  
                  <!-- Wrapper for Type* attribute and its filter options -->
                  <div class="hoverable-wrapper" @mouseover="showTypeOptions" @mouseleave="hideTypeOptions">
                    <div class="hoverable">Type*</div>
                    <div v-if="typeVisible" class="filter-options" @mouseover="showTypeOptions" @mouseleave="hideTypeOptions">
                      <div v-for="option in typeOptions" :key="option" class="filter-option">
                        <input type="checkbox" v-model="selectedTypes" :value="option" />
                        <label>{{ option }}</label> <!-- Ensure text is visible -->
                      </div>
                    </div>
                  </div>

                  <!-- Wrapper for HQ* attribute and its filter options -->
                  <div class="hoverable-wrapper" @mouseover="showHQOptions" @mouseleave="hideHQOptions">
                    <div class="hoverable">HQ*</div>
                    <div v-if="hqVisible" class="filter-options" @mouseover="showHQOptions" @mouseleave="hideHQOptions">
                      <div v-for="option in hqOptions" :key="option" class="filter-option">
                        <input type="checkbox" v-model="selectedHQ" :value="option" />
                        <label>{{ option }}</label> <!-- Ensure text is visible -->
                      </div>
                    </div>
                  </div>

                  <div>Website</div>
                </div>
                <p style="font-size: 12px; margin: 0; text-indent: 0;">* Mouse hover to filter.</p>
              </div>

              <!-- Filter Options for Type -->
              <div v-if="typeVisible" class="filter-options">
                <div v-for="option in typeOptions" :key="option" class="filter-option">
                  <input type="checkbox" v-model="selectedTypes" :value="option" />
                  <label>{{ option }}</label>
                </div>
              </div>

              <!-- Filter Options for HQ -->
              <div v-if="hqVisible" class="filter-options">
                <div v-for="option in hqOptions" :key="option" class="filter-option">
                  <input type="checkbox" v-model="selectedHQ" :value="option" />
                  <label>{{ option }}</label>
                </div>
              </div>

              <!-- Table for Data Display -->
              <div class="table-container">
                <div class="data-display">
                  <div v-for="item in filteredItems" :key="item.name" class="data-row">
                    <div>{{ item.name }}</div>
                    <div>{{ item.type }}</div>
                    <div>{{ item.hq }}</div>
                    <div>{{ item.website }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END GLOBE PAGE-->

    <!-- BEGIN MOUNTAIN PAGE -->
    <div style="flex: 1; position: relative;">
      <img src="../assets/Mountain.png" style="width: 100%; height: 100%; position: absolute;">
      
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
    <!-- END MOUNTAIN PAGE -->
  </div>
</template>

<style>
/* Entire Page Styling */
.app-container {
  display: flex;
  flex-direction: column;
  height: calc(200vh + 122.5px);
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
  margin-left: 22%;
  margin-top: -10%;
  height: 30%; 
  min-width: 400px;
  min-height: 400px;
}

.text-box {
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%; /* Use full width of its parent */
  max-width: 400px; /* Set a maximum width */
  height: calc(100% - 35px);
  z-index: 2;
  overflow-y: auto; /* Adds a scroll bar when content exceeds height */
  padding: 20px 20px; /* Adds some padding inside the box */
  box-sizing: border-box;
}

.text-box h2 {
  margin: 0; /* Remove default margin */
  font-size: 30px; /* Title font size */
  font-family: Arial, sans-serif;
}

.text-box p {
  margin: 0 0 10px 20px; /* Indent the text, add bottom margin for spacing */
  font-size: 20px; /* Indented text font size */
  text-indent: 20px; /* Additional indentation for the paragraph */
  font-family: Arial, sans-serif;
  display: block; /* Ensure the p tag behaves as a block element */
  width: 100%;
}

.text-box::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
}

.text-box::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5); /* Color of the scroll bar handle */
  border-radius: 10px; /* Rounded edges for scrollbar handle */
}

.text-box::-webkit-scrollbar-track {
  background-color: transparent; /* Color of the scroll track */
  margin: 10px 0; /* Margin at the top and bottom of the scrollbar */
}

/* Optional: Fixed height for the scrollbar track */
.text-box::-webkit-scrollbar-track {
  height: calc(100% - 40px); /* Fixed height for scrollbar track */
}

.header {
  color: white;
  margin-bottom: 10px; /* Reduced space between header and table */
}

.header-title {
  display: inline;
}

.data-display {
  display: flex;
  flex-direction: column;
}

.header-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  font-weight: bold;
  font-family: Times;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  background-color: rgba(255, 255, 255, 0.5); /* Light background for rows */
  transition: background-color 0.3s; /* Smooth transition */
  font-family: Times;
}

.data-row:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Highlight on hover */
}

.hoverable {
  cursor: pointer;
  text-decoration: none; /* Remove underline */
  position: relative;
}

.hoverable-wrapper {
  position: relative; /* Ensures filter options are positioned correctly */
}

.filter-options {
  position: absolute; /* Position them directly below the attribute */
  top: 100%; /* Aligns with the bottom of the attribute */
  left: 0; /* Aligns with the left edge of the attribute */
  background: white; /* Background for filter options */
  border-radius: 5px; /* Rounded edges */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Shadow for depth */
  z-index: 10; /* Ensure it appears above other elements */
}

.filter-option {
  display: flex;
  align-items: center;
  margin: 5px 5px; /* Space between options */
}

.filter-option label {
  margin-left: 5px; /* Spacing between checkbox and text */
  color: black;
  font-weight: normal;
}

.table-container {
  height: calc(100% - 50px); /* Adjust height for the table */
  overflow-y: auto; /* Adds a scroll bar when content exceeds height */
  padding: 10px 0; /* Space around the table */
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