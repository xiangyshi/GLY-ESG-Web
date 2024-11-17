<template>
    <div class="chart-layout">
      <!-- Sidebar with Company and Metric Selection -->
      <div class="sidebar">
        <div>
          <label>Company Name</label>
          <div
            class="dropdown"
            @click="toggleCompanyDropdown"
            :class="{ active: companyDropdownVisible }"
            ref="companyDropdown"
          >
            ▼
          </div>
          <ul v-if="companyDropdownVisible" class="dropdown-menu" @click.stop>
            <li
              v-for="(company, index) in companies"
              :key="index"
              @click="toggleCompanySelection(company)"
            >
              <input type="checkbox" :checked="selectedCompanies.includes(company)" /> {{ company }}
            </li>
          </ul>
          <div v-if="selectedMetrics.length > 0 && selectedCompanies.length === 0" class="error">
            *Please select one company at least
          </div>
        </div>
  
        <div>
          <div v-for="metric in metrics" :key="metric">
            <input type="checkbox" :value="metric" v-model="selectedMetrics" /> {{ metric }}
          </div>
        </div>
  
        <div v-if="selectedMetrics.length > 1">
            <label style="color: red;">*Please select the front rank mark first </label>
            <div
                class="dropdown"
                @click="toggleRankDropdown"
                :class="{ active: rankDropdownVisible }"
                style="color: red;"
                ref="rankDropdown"
            >
                ▼
            </div>
            <ul v-if="rankDropdownVisible" class="dropdown-menu" @click.stop>
                <li
                v-for="metric in selectedMetrics"
                :key="metric"
                @click="setRankMark(metric)"
                :class="{'selected': rankMark === metric}">
                >
                {{ metric }}
                </li>
            </ul>
        </div>
        </div>
  
      <!-- Bar Chart Area (on the right) -->
      <div class="chart-container">
        <div v-if="chartData" class="chart-options">
            <div
                class="dropdown"
                @click="toggleAverageLineDropdown"
                :class="{ active: averageLineDropdownVisible }"
                ref="averageLineDropdown"
            >
                --- Select to Show Average Line ▼ 
            </div>
            <ul v-if="averageLineDropdownVisible" class="dropdown-menu" @click.stop>
                <li
                v-for="metric in selectedMetrics"
                :key="metric"
                @click="setAverageLineMetric(metric)"
                :class="{'selected': averageLineMetric === metric}">
                >
                {{ metric }}
                </li>
            </ul>
        </div>
        <BarChart
        v-if="chartData && selectedCompanies.length > 0 && selectedMetrics.length > 0"
        :chartData="filteredChartData"
        :options="chartOptions"
        :averageLineData="averageLineData"
        />
      </div>
    </div>
  
    <!-- Table Area (below the chart and metrics) -->
    <div class="table-container" v-if="selectedCompanies.length > 0 && selectedMetrics.length > 0">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th v-for="metric in selectedMetrics" :key="metric">{{ metric }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredTableData" :key="index">
            <td>{{ row.Company }}</td>
            <td v-for="metric in selectedMetrics" :key="metric">{{ row[metric] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import Papa from 'papaparse';
import BarChart from './BarChart.vue';

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      companies: [],
      selectedCompanies: [],
      selectedMetrics: [],
      metrics: ['Total Score', 'MA', 'MB', 'MC', 'MD'], // These will be read from CSV
      rankMark: null,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800, // Smooth animation duration in milliseconds
            easing: 'easeInOutQuad', // Smooth easing effect
        },
        plugins: {
            title: {
            display: true,
            text: () => `Ranked by ${this.rankMark || 'Total Score'}`,
            },
            annotation: {
            annotations: {
                globalAverageLine: {
                type: 'line',
                yMin: this.globalAverage, // Position of the global average line
                yMax: this.globalAverage,
                borderColor: 'red',
                borderDash: [5, 5],
                borderWidth: 2,
                label: {
                    content: 'Global',
                    enabled: true,
                    position: 'end',
                    backgroundColor: 'transparent',
                    color: 'red',
                    font: {
                    size: 12,
                    weight: 'bold',
                    },
                },
                },
            },
            },
        },
      },
      tableData: [],
      companyDropdownVisible: false,
      rankDropdownVisible: false,
      averageLineDropdownVisible: false,
      showAverageLine: false,
      averageLineMetric: null, // Store the selected metric for average line
      averageLineData: null,
    };
  },
  computed: {
    filteredChartData() {
      if (!this.chartData) return null;
      return {
        ...this.chartData,
        datasets: this.chartData.datasets.filter((dataset) =>
          this.selectedMetrics.includes(dataset.label)
        ),
      };
    },
    filteredTableData() {
      return this.tableData.filter(row => this.selectedCompanies.includes(row.Company));
    },
  },
  methods: {
    toggleCompanyDropdown() {
      this.companyDropdownVisible = !this.companyDropdownVisible;
      console.log('Rank Dropdown Visible:', this.rankDropdownVisible);
      this.rankDropdownVisible = false; // Hide rank dropdown if visible
      this.averageLineDropdownVisible = false;
    },
    toggleRankDropdown() {
      this.rankDropdownVisible = !this.rankDropdownVisible;
      this.companyDropdownVisible = false; // Hide company dropdown if visible
      this.averageLineDropdownVisible = false;
    },
    toggleAverageLineDropdown() {
      this.averageLineDropdownVisible = !this.averageLineDropdownVisible;
      console.log('Rank Dropdown Visible:', this.rankDropdownVisible);
      this.companyDropdownVisible = false; // Hide company dropdown if visible
      this.rankDropdownVisible = false; // Hide rank dropdown if visible
    },
    toggleCompanySelection(company) {
      const index = this.selectedCompanies.indexOf(company);
      if (index === -1) {
        this.selectedCompanies.push(company);
      } else {
        this.selectedCompanies.splice(index, 1);
      }
      this.$emit('companySelected', this.selectedCompanies);
    },
    setRankMark(metric) {
      console.log('Rank Mark Selected:', metric);
      this.rankMark = metric;
    },
    loadChartData() {
        if (this.selectedCompanies.length === 0 || this.selectedMetrics.length === 0) {
      this.chartData = null;
      this.globalAverage = null; // Reset global average
      return;
    }

    // Calculate global averages for each selected metric
    const averagesPerMetric = this.selectedMetrics.map((metric) => {
      const total = this.selectedCompanies.reduce((sum, company) => {
        const companyData = this.companies.find((c) => c.Company === company);
        return sum + (companyData ? companyData[metric] : 0);
      }, 0);
      const average = total / this.selectedCompanies.length; // Average for this metric
      console.log(`Average for ${metric}:`, average);
      return average;
    });

    // Log averages for each selected metric
    console.log('Averages for each Metric:', averagesPerMetric);

    // Sort companies dynamically based on rank mark
    if (this.rankMark) {
      this.selectedCompanies.sort((a, b) => {
        const companyA = this.companies.find((c) => c.Company === a);
        const companyB = this.companies.find((c) => c.Company === b);
        const scoreA = companyA ? companyA[this.rankMark] || 0 : 0;
        const scoreB = companyB ? companyB[this.rankMark] || 0 : 0;
        return scoreB - scoreA; // Descending order
      });
    }

    // Populate chart data
    this.chartData = {
      labels: this.selectedCompanies,
      datasets: this.selectedMetrics.map((metric, index) => ({
        label: metric,
        data: this.selectedCompanies.map((company) => {
          const companyData = this.companies.find((c) => c.Company === company);
          return companyData ? companyData[metric] : Math.floor(Math.random() * 100);
        }),
        backgroundColor: this.getMetricColor(index),
      })),
    };

    if (this.averageLineMetric) {
    this.calculateAverageLine();
  }
  },
  setAverageLineMetric(metric) {
      console.log('Average Line Metric Selected:', metric);
      this.averageLineMetric = metric;
      this.calculateAverageLine(); // Recalculate average line when the metric changes
    },
    calculateAverageLine(averagesPerMetric) {
      console.log('Calculating average line for metrics:', this.selectedMetrics);
      if (this.averageLineMetric  && Array.isArray(this.selectedMetrics) && this.selectedMetrics.length > 0) {
        averagesPerMetric.reduce((sum, value) => sum + value, 0) / averagesPerMetric.length;
      console.log('Calculated Average for Line:', average);
        this.averageLineData = {
          label: 'Average',
          data: new Array(this.selectedCompanies.length).fill(average),
          borderColor: 'red',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
        };

        console.log('Average Line Data:', this.averageLineData);
      }
    },
    generateData(metric) {
      return this.selectedCompanies.map(() => Math.floor(Math.random() * 100));
    },
    getMetricColor(index) {
      const colors = ['#42A5F5', '#66BB6A', '#FF0000', '#FFA726', '#8E24AA'];
      return colors[index % colors.length];
    },
    // Close dropdown when clicking outside of it
    handleClickOutside(event) {
    const companyDropdown = this.$refs.companyDropdown;
    const rankDropdown = this.$refs.rankDropdown;
    const averageLineDropdown = this.$refs.averageLineDropdown;

    // Only close dropdowns when clicking outside of them (excluding the dropdown items)
    if (companyDropdown && !companyDropdown.contains(event.target)) {
        this.companyDropdownVisible = false;
    }

    if (rankDropdown && !rankDropdown.contains(event.target) && !rankDropdown.contains(event.target.closest('.dropdown-menu'))) {
        this.rankDropdownVisible = false;
    }

    if (averageLineDropdown && !averageLineDropdown.contains(event.target) && !averageLineDropdown.contains(event.target.closest('.dropdown-menu'))) {
        this.averageLineDropdownVisible = false;
    }
    },
    async loadCSVData() {
    try {
      // Fetch the CSV file as text
      const response = await fetch('/raw.csv');
      const csvText = await response.text();  // Read CSV as text

      console.log("Raw CSV Data:", csvText);  // Log the raw CSV data

      // Now, parse the CSV text with Papa.parse
      Papa.parse(csvText, {
        header: true,         // Treat first row as headers
        dynamicTyping: true,  // Automatically typecast values
        delimiter: ',',       // Specify the delimiter if necessary
        complete: (result) => {
          // Log the parsed result to check the structure
          console.log('Parsed CSV Data:', result.data);
          
          // Check if the CSV has valid data
          if (result.data && Array.isArray(result.data)) {
            // Map the company names (adjust the column name if necessary)
            this.companies = result.data.map(row => row['Company']); // Ensure 'Company' matches the header
            this.tableData = result.data;
            console.log('Loaded Companies:', this.companies);
          } else {
            console.error('Invalid CSV data:', result.data);
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error.message);
        },
      });
    } catch (error) {
      console.error('Error loading CSV:', error.message);
    }
  },
  },
  mounted() {
    this.loadCSVData();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  watch: {
    rankMark() {
      this.loadChartData(); // Reload chart data dynamically when the rank mark changes
    },
    selectedCompanies() {
      this.loadChartData();
    },
    selectedMetrics() {
      this.loadChartData();
    },
  },
};
</script>
  
  <style scoped>
  .chart-layout {
    display: flex;
    flex-direction: row; /* Align sidebar and chart horizontally */
    gap: 2rem; /* Add space between the sidebar and chart */
    padding: 1rem;
    justify-content: space-between;
  }
  
  .sidebar {
    width: 30%; /* Sidebar takes 30% of the width */
    background-color: #f4f4f4;
    padding: 1rem;
  }
  
  .chart-container {
    width: 65%; /* Chart takes 65% of the width */
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff; /* Ensure chart area is visible */
  }
  
  .table-container {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f9f9f9;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center; /* Center text horizontally */
  }
  
  th, td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    vertical-align: middle; /* Center text vertically */
  }
  
  .error {
    color: red;
  }
  
  .dropdown {
    cursor: pointer;
    font-size: 15px;
    display: inline-block;
    padding: 0;
    background: none;
    border: none;
    color: #333;
  }
  
  .dropdown.active {
    background-color: #f0f0f0;
  }
  
  .dropdown-menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin: 0;
    z-index: 1000;
  }
  
  .dropdown-menu li {
    padding: 0.5rem;
    cursor: pointer;
  }

  .chart-options {
    display: flex;
    justify-content: flex-end;
    }

    .chart-options .dropdown {
    margin-left: 10px;
    color: black;
    }

  .selected {
    background-color: grey;
    color: white;
  }
  </style>
  