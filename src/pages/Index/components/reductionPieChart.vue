<template>
    <chart
        :ref="args.ref"
        :options="options"
        :auto-resize="true"
        @finished="finished"
    ></chart>
</template>

<script>
export default {
    name: "CategoryChart",
    data() {
        return {
            options: {
                color:['rgb(119,144,219)', 'rgb(64,178,125)', '#31e0f0'],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                     textStyle:{
                        fontSize: 16,
                        color: '#ffffff'
                    },
                },
                series: [
                    {
                        name: '节能减排',
                        type: 'pie',
                        radius: ['40%', '85%'],
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
            default: (_) => {},
        },
    },
    methods: {
        finished() {},
    },
    watch: {
        args: {
            deep: true,
            handler: function (args) {
                this.options.series[0].data = [
                    { value: parseFloat(args.data.coal), name: '累计煤炭(吨)' },
                    { value: parseFloat(args.data.co2), name: 'CO₂减排量(吨)' },
                    { value: parseFloat(args.data.tree)*20, name: 'tree(公顷)' }
                ]
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
