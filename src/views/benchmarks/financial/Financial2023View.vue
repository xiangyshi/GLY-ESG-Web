<template>
  <div>
    <Navbar />
    <div class="tab-container">
      <!-- Title -->
      <h1 class="title">Financial Systems Benchmark in China · 2023</h1>

      <!-- Menu with selectable categories -->
      <ul class="menu">
        <li 
          class="menu-item" 
          :class="{ selected: selectedTab === 'Rank' }" 
          @click="selectTab('Rank')"
        >
          Rank
        </li>
        <li 
          class="menu-item" 
          :class="{ selected: selectedTab === 'Companies' }" 
          @click="selectTab('Companies')"
        >
          Companies
        </li>
        <li 
          class="menu-item" 
          :class="{ selected: selectedTab === 'About' }" 
          @click="selectTab('About')"
        >
          About
        </li>
      </ul>

      <!-- Intro paragraph -->
      <div v-if="showIntro && selectedTab === 'Rank'" class="intro">
        Introduction text about companies in China...
      </div>

      <!-- Graphs and tables (only for Rank tab) -->
      <div v-if="selectedTab === 'Rank'" class="content">
        <ChartOne @companySelected="handleCompanySelection" :selectedCompanies="selectedCompanies" />
      </div>

      <!-- Download Button (only for Rank tab) -->
      <button v-if="selectedTab === 'Rank'" class="download-button" @click="downloadFiles">
        Download files
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../components/Navbar.vue';
import ChartOne from '../../../components/ChartOne.vue';

export default {
  components: {
    Navbar,
    ChartOne,
  },
  data() {
    return {
      selectedTab: 'Rank', // Default selected tab
      selectedCompanies: [],
      showIntro: true,
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    handleCompanySelection(companies) {
      if (companies.length === 0) {
        this.selectedCompanies = []; // Clear the selected companies
        this.$emit('clearCompanySelections'); // Emit event to reset checkboxes in ChartOne.vue
      } else {
        this.selectedCompanies = companies;
      }
    },
    downloadFiles() {
      // Handle download logic for chart and table images or data
    },
  },
};
</script>

<style>
.tab-container {
  height: 85vh;
}
.title {
  text-align: center;
  font-size: 1.8rem;
  margin: 1rem 0;
  color: #333;
}
.menu {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  background-color: #f4f4f4;
  list-style: none; /* Removes bullet points */
  margin: 0; /* Removes default margin of list */
  padding: 0; /* Removes default padding of list */
}
.menu-item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.menu-item:hover {
  background-color: #d9d9d9;
}
.menu-item.selected {
  text-decoration: underline;
  font-weight: bold;
}
.intro {
  padding: 1rem;
  background-color: #e0f7fa;
  text-align: center;
}
.download-button {
  margin: 1rem auto;
  display: block;
}
.content {
  padding: 1rem;
}
</style>