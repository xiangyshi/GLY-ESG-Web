<template>
    <div ref="plotlyPlot" style="width: 100%; height: 100%;"></div>
</template>

<script>
import Plotly from 'plotly.js/dist/plotly.min.js';

export default {
    name: 'MyPlotComponent',
    mounted() {
        this.createPlot();
    },
    methods: {
        createPlot() {
            const trace1 = {
                x: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                y: [1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 1],
                mode: 'lines+markers',
                type: 'scatter',
                name: 'Line Plot',
            };

            const data = [trace1];

            const layout = {
                title: 'Visit History',
                xaxis: {
                    title: 'X Axis',
                },
                yaxis: {
                    title: 'Y Axis',
                },
            };

            Plotly.newPlot(this.$refs.plotlyPlot, data, layout);
        },
    },
};
</script>

<style>

</style>
