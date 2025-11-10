<!--  -->
<template>
    <div :style="{ width: '100%', height: '100%' }" ref="mains"></div>
</template>

<script>
export default {
    props: ['data', 'dataX'],
    name: "",
    data() {
        return {

            chartInstance: null,
            screenWidth: '',
            screenHeight: ''

        }
    },
    created() {

    },
    mounted() {
        this.initEcharts();
        // window.addEventListener("resize", () => {
        //     this.chartInstance.resize();
        //     this.initEcharts();
        // });
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
                this.screenHeight = document.body.clientHeight;
            })();
        }
        },
            methods: {
            fontSize(res) {
                let clientWidth =
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth;
                if (!clientWidth) return;
                // 此处的3840 为设计稿的宽度，记得修改！
                let fontSize = clientWidth / 1920;
                return res * fontSize;
            },
            initEcharts() {
                this.chartInstance = this.$echarts.init(this.$refs.mains);
                this.chartInstance.setOption({
                    grid: {
                        left: this.fontSize(50),
                        bottom: this.fontSize(30),
                        top: this.fontSize(20),
                        right:this.fontSize(15),

                    },
                    tooltip: {
                        trigger: 'item',
                    },
                    animation: false,
                    xAxis: [
                        {
                            data: this.dataX,
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#384267",
                                    width: this.fontSize(1),
                                    type: "dashed"
                                },
                            },
                            axisLabel: {
                                color: "#c0c3cd",
                                fontSize: this.fontSize(8),
                                padding: [this.fontSize(5), 0, 0, 0],
                                interval: 0,
                            },
                        },
                    ],
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            color: "#c0c3cd",
                            fontSize: this.fontSize(10),
                            formatter: '{value}'

                        },

                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#384267",
                                type: "dashed"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#384267",
                                width: this.fontSize(1),
                                type: "dashed"
                            },
                            show: true
                        },
                        name: ""
                    },
                    series: [
                        {
                            name: '上部圆',
                            type: 'pictorialBar',
                            silent: true,
                            symbolSize: [this.fontSize(20), this.fontSize(10)],
                            symbolOffset: [0, this.fontSize(3)],
                            symbolPosition: 'end',
                            z: 12,
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         position: 'top',
                            //         fontSize: this.fontSize(12),
                            //         color: '#fff',
                            //     },
                            // },
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: this.fontSize(1),
                                type: "linear",
                                global: false,
                                colorStops: [{
                                    offset: 0,
                                    color: "#02FFEF"
                                }, {
                                    offset: 1,
                                    color: "#00FF91"
                                }]
                            },
                            data: this.data,
                        },
                        {
                            name: '底部圆',
                            type: 'pictorialBar',
                            silent: true,
                            symbolSize: [this.fontSize(20), this.fontSize(10)],
                            symbolOffset: [0, this.fontSize(3)],
                            z: 12,
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: this.fontSize(1),
                                type: "linear",
                                global: false,
                                colorStops: [{
                                    offset: 0,
                                    color: "#54FCFF"
                                }, {
                                    offset: 1,
                                    color: "#00B7FF"
                                }]
                            },
                            data: this.data,
                        },


                        {
                            name: '收益',
                            type: 'bar',
                            barWidth: this.fontSize(20),
                            // z: this.fontSize(12),
                            barGap: '-100%',
                            itemStyle: {
                                //lenged文本
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: this.fontSize(1),
                                    type: "linear",
                                    global: false,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 188, 0)'
                                    }, {
                                        offset: 1,
                                        color: "rgba(2, 250, 255, 0.7)"
                                    }],
                                    // opacity: 0.1
                                }
                            },

                            data: this.data,
                        },

                    ],
                })
                this.chartInstance.on('legendselectchanged', function (params) {
                    this.chartInstance.setOption({
                        legend: { selected: { [params.name]: true } },
                        animation: false
                    })
                    return null;
                });
            }

        },
        watch: {
            data: {
                handler: function (val) {
                    this.initEcharts();
                    this.chartInstance.resize();
                },
                immediate: true,
                    deep: true
            },
            screenWidth:{
                handler: function (val) {
                    // console.log(val,'scw');
                    this.initEcharts();

                },
                immediate: true,
                    deep: true
            },
        }
    }
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.a {
    color: rgba($color: #000000, $alpha: 1.0);
}
</style>