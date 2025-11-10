<template>
    <chart :ref="args.ref" :options="options" :auto-resize="true" @finished="finished"></chart>
</template>

<script>
import { lineColor, labelColor } from "@/assets/styles/echarts-dark.scss";

export default {
    name: "CategoryChart",
    data() {
        return {
            options: {
                color: ['rgb(119,144,219)', 'rgb(64,178,125)', '#31e0f0'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    textStyle: {
                        fontSize: 12,
                        color: labelColor,
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    // boundaryGap: [0, 0.01]
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: lineColor,
                            width: 1,
                            type: "dashed",
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: lineColor,
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: labelColor,
                        },
                    },
                },
                yAxis: {
                    type: 'category',
                    data: [`${this.$translate('累计煤炭')}(${this.$translate('吨')})`,`${this.$translate('CO₂减排量')}(${this.$translate('吨')})`, `${this.$translate('tree')}(${this.$translate('公顷')})`,],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: lineColor,
                            width: 1,
                            type: "dashed",
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: lineColor,
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: labelColor,
                        },
                    },
                },
                series: [
                    {
                        name:this.$translate('节能减排'),
                        type: 'bar',
                        color: [
                            '#dd6b66',
                            '#759aa0',
                            '#e69d87',
                        ],
                        data: [],
                        label: {
                            show: false,
                            position: 'center'
                        },
                    }
                ]
            }

        };
    },
    props: {
        args: {
            type: Object,
            default: (_) => { },
        },
    },
    methods: {
        finished() { },
    },
    watch: {
        args: {
            deep: true,
            handler: function (args) {
                setTimeout(() => {
                    this.options.series[0].data = [
                        { value: parseFloat(args.data.coal), name: '累计煤炭(吨)' },
                        { value: parseFloat(args.data.co2), name: 'CO₂减排量(吨)' },
                        { value: parseFloat(args.data.tree) * 20, name: 'tree(公顷)' }
                    ]
                }, 100);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 100%;
}
</style>
