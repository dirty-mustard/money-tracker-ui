<template>
    <line-chart :height="height" :options="options" :chart-data="chartData"></line-chart>
</template>

<script>

    import LineChart from '../../../components/line-chart';

    export default {
        components: {LineChart},
        name: 'transactions-line-chart',
        props: ['height', 'transactions'],
        data: function () {
            return {
                chartData: {
                    labels: [],
                    datasets: []
                },
                options: {
                    scales: {
                        yAxes: [{
                            display: false,
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            display: false,
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    title: {
                        display: false
                    },
                    elements: {
                        line: {
                            borderWidth: 0,
                            fill: true,
                            pointBackgroundColor: 'black'
                        }
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        computed: {
            dateLabels: function () {
                const labels = _.uniq(this.transactions.map((t) => t.date));
                // If labels is empty, return 2 '', '' values so it will render a straight line
                return (labels.length > 0) ? labels : ['', ''];
            },
            dataPoints: function () {
                const points = _(this.transactions)
                    .groupBy('date')
                    .map(
                        (transaction, date) => ({
                                'date': date,
                                'amount': _.sumBy(transaction, 'amount')
                            }
                        )
                    )
                    .value()
                    .map((date) => date.amount);

                // If data point are empty, return 2 0, 0 values so it will render a straight line
                return (points.length > 0) ? points : [0, 0];
            }
        },
        watch: {
            transactions: function () {
                this.chartData = {
                    labels: this.dateLabels,
                    datasets: [
                        {
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'rgba(222, 224, 225, 0.4)',
                            borderColor: 'rgba(222, 224, 225, 0.4)',
                            borderWidth: 1,
                            pointRadius: 0,
                            lineTension: 1,
                            //Data to be represented on y-axis
                            data: this.dataPoints
                        }
                    ]
                };
            }
        },
        mounted() {
            this.chartData = {
                labels: this.dateLabels,
                datasets: [
                    {
                        backgroundColor: 'transparent',
                        pointBackgroundColor: 'rgba(222, 224, 225, 0.4)',
                        borderColor: 'rgba(222, 224, 225, 0.4)',
                        borderWidth: 1,
                        pointRadius: 0,
                        lineTension: 1,
                        //Data to be represented on y-axis
                        data: this.dataPoints
                    }
                ]
            };
        }
    }
</script>
