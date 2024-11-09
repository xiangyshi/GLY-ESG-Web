<template>
  <div class="chart-layout">
    <!-- Sidebar with Toggle Buttons for Dataset Visibility -->
    <div class="sidebar">
      <button :class="{ checked: visibleDatasets['MA'] }" @click="toggleDataset('MA')">Toggle MA</button>
      <button :class="{ checked: visibleDatasets['MB'] }" @click="toggleDataset('MB')">Toggle MB</button>
      <button :class="{ checked: visibleDatasets['MC'] }" @click="toggleDataset('MC')">Toggle MC</button>
    </div>

    <!-- Chart Area -->
    <div class="chart-container">
      <BarChart v-if="chartData" :chartData="filteredChartData" :options="chartOptions" />
    </div>

    <!-- Table Area -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th rowspan="2">Company</th>
            <th rowspan="2">Total Score</th>
            <th colspan="2">MA</th>
            <th colspan="2">MB</th>
            <th rowspan="2">Average</th>
          </tr>
          <tr>
            <th>RAW</th>
            <th>MBA</th>
            <th>RAW</th>
            <th>MBA</th>
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
      tableData: [
        { Company: 'Company 1', TotalScore: 1, MA_RAW: 1, MA_MBA: 1, MB_RAW: 1, MB_MBA: 1, Average: 1 },
        { Company: 'Company 2', TotalScore: 1, MA_RAW: 1, MA_MBA: 1, MB_RAW: 1, MB_MBA: 1, Average: 1 },
        { Company: 'Company 3', TotalScore: 2, MA_RAW: 2, MA_MBA: 1, MB_RAW: 1, MB_MBA: 2, Average: 1.5 },
        { Company: 'Company 4', TotalScore: 3, MA_RAW: 3, MA_MBA: 2, MB_RAW: 2, MB_MBA: 3, Average: 2.5 },
        { Company: 'Company 5', TotalScore: 4, MA_RAW: 4, MA_MBA: 3, MB_RAW: 3, MB_MBA: 4, Average: 3.5 },
      ],
    };
  },
  computed: {
    filteredChartData() {
      if (!this.chartData) return null;
      return {
        ...this.chartData,
        datasets: this.chartData.datasets.filter((dataset) => this.visibleDatasets[dataset.label]),
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

          result.data.forEach((row) => {
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

.chart-container {
  width: 50%;
  padding: 1rem;
}

.table-container {
  width: 35%;
  padding: 1rem;
  overflow-x: auto;
}

/* Sidebar styling */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f4f4f4;
  width: 15%;
}

/* Checkbox styling for the button */
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #e0e0e0;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  font-weight: bold;
}

button.checked {
  background-color: #66bb6a; /* Checked color */
  border-color: #66bb6a;
  color: white;
}

button::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 2px;
  background-color: transparent;
  transition: background-color 0.3s;
}

button.checked::before {
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
