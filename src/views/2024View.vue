<template>
    <div>
      <Navbar />
      <div class="tab-container">
        <!-- Tabs -->
        <div class="tabs">
          <button v-for="(tab, index) in tabs" 
                  :key="index" 
                  @click="activeTab = index">
            {{ tab.name }}
          </button>
        </div>
  
        <!-- Graphs -->
        <div class="graph-container">
          <ChartOne v-if="activeTab === 0" />
          <ChartTwo v-if="activeTab === 1" />
          <ChartThree v-if="activeTab === 2" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import ChartOne from '../components/ChartOne.vue';
  import ChartTwo from '../components/ChartTwo.vue';
  import ChartThree from '../components/ChartThree.vue';
  
  export default {
    components: {
      Navbar,
      ChartOne,
      ChartTwo,
      ChartThree,
    },
    data() {
      return {
        activeTab: 0,
        tabs: [
          { name: 'Chart 1' },
          { name: 'Chart 2' },
          { name: 'Chart 3' },
        ],
      };
    },
  };
  </script>
  
<style>
  .tab-container {
    min-width: 100%;
    min-height: 100%;
    height: 85vh;
  }
  
  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  button {
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .graph-container {
    display: flex;
    justify-content: center;
    height: 100%;
  }
</style>
  