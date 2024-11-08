<template>
    <div>
        <Bar :data="chartData" :options="options" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the necessary Chart.js components
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
    },
};
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 400px;
}
</style>
