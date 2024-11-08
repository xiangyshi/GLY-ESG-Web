<template>
  <div class="chart-layout">
    <!-- Sidebar with Toggle Buttons for Dataset Visibility -->
    <div class="sidebar">
      <button @click="toggleDataset('MA')">Toggle MA</button>
      <button @click="toggleDataset('MB')">Toggle MB</button>
      <button @click="toggleDataset('MC')">Toggle MC</button>
    </div>

    <!-- Chart Area -->
    <div class="chart-container">
      <BarChart :chartData="filteredChartData" :options="chartOptions" v-if="chartData" />
    </div>

    <!-- Table Area -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Total Score</th>
            <th>MA (RAW)</th>
            <th>MA (MBA)</th>
            <th>MB (RAW)</th>
            <th>MB (MBA)</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.Company }}</td>
            <td>{{ row.TotalScore }}</td>
            <td>{{ row.MA_RAW }}</td>
            <td>{{ row.MA_MBA }}</td>
            <td>{{ row.MB_RAW }}</td>
            <td>{{ row.MB_MBA }}</td>
            <td>{{ row.Average }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import Papa from 'papaparse';

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      visibleDatasets: {
        MA: true,
        MB: true,
        MC: true,
      },
    };
  },
  computed: {
    filteredChartData() {
      if (!this.chartData) return null;
      return {
        ...this.chartData,
        datasets: this.chartData.datasets.filter(dataset => this.visibleDatasets[dataset.label]),
      };
    },
  },
  methods: {
    loadCSVData() {
      Papa.parse('/data.csv', {
        download: true,
        header: true,
        complete: (result) => {
          const labels = [];
          const MAData = [];
          const MBData = [];
          const MCData = [];
          const tableData = [
            { Company: 'Company 1', TotalScore: 1, MA_RAW: 1, MA_MBA: 1, MB_RAW: 1, MB_MBA: 1, Average: 1 },
            { Company: 'Company 2', TotalScore: 1, MA_RAW: 1, MA_MBA: 1, MB_RAW: 1, MB_MBA: 1, Average: 1 },
            { Company: 'Company 3', TotalScore: 2, MA_RAW: 2, MA_MBA: 1, MB_RAW: 1, MB_MBA: 2, Average: 1.5 },
            { Company: 'Company 4', TotalScore: 3, MA_RAW: 3, MA_MBA: 2, MB_RAW: 2, MB_MBA: 3, Average: 2.5 },
            { Company: 'Company 5', TotalScore: 4, MA_RAW: 4, MA_MBA: 3, MB_RAW: 3, MB_MBA: 4, Average: 3.5 },
          ]
          this.tableData = tableData;
          
          result.data.forEach(row => {
            labels.push(row.Company);
            MAData.push(parseInt(row.MA, 10));
            MBData.push(parseInt(row.MB, 10));
            MCData.push(parseInt(row.MC, 10));
          });

          this.chartData = {
            labels: labels,
            datasets: [
              { label: 'MA', backgroundColor: '#42A5F5', data: MAData },
              { label: 'MB', backgroundColor: '#66BB6A', data: MBData },
              { label: 'MC', backgroundColor: '#FF0000', data: MCData },
            ],
          };
        },
      });
    },
    toggleDataset(datasetLabel) {
      this.visibleDatasets[datasetLabel] = !this.visibleDatasets[datasetLabel];
    },
  },
  mounted() {
    this.loadCSVData();
  },
};
</script>

<style scoped>
.chart-layout {
  display: flex;
  height: 700px;
  width: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f4f4f4;
  width: 15%;
}

.chart-container {
  display: flex;
  width: 50%;
  height: 100%;
  padding: 1rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ccc;
}
</style>
