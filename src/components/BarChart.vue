<template>
    <div class="chart-container">
      <Bar :data="updatedChartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  // Register necessary components
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    name: 'BarChart',
    components: {
      Bar,
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
      averageLineData: {
        type: Object,
        default: null,
      },
    },
    computed: {
      updatedChartData() {
        const updatedData = { ...this.chartData };

        // If averageLineData is passed, add it as a line dataset
        if (this.averageLineData) {
            updatedData.datasets.push({
            type: 'line', // Ensure it's rendered as a line
            label: 'Average',
            data: this.averageLineData.data,
            borderColor: this.averageLineData.borderColor || 'red',
            borderDash: this.averageLineData.borderDash || [5, 5], // Dashed line style
            borderWidth: this.averageLineData.borderWidth || 2,
            fill: false, // Prevent filling under the line
            pointRadius: 0, // No points on the line
            });
        }
        return updatedData;
      },
    },
    methods: {
        updateChart() {
            if (this.$refs.chart) {
            this.$refs.chart.render(); // Re-render the chart for smooth transitions
            }
        },
    },
    watch: {
        globalAverage(newVal) {
            this.updateChart(); // Update chart when the global average is recalculated
        },
        chartData: {
            handler() {
            this.updateChart(); // Trigger chart update with animation when data changes
            },
            deep: true, // Ensure deep watcher for nested objects
        },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
  }
  </style>
  