<!--  -->
<template>
    <div :style="{ width: '100%', height: '100%' }" ref="mains"></div>
</template>

<script>
export default {
    props: ['data'],
    name: "",
    data() {
        return {

            chartInstance: null,

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
                    trigger: 'axis',

                },
                animation: false,
                xAxis: [
                    {

                        data: this.data.dataX,
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
                            // interval: 0,

                        },
                        // interval: 0,
                    },
                ],
                yAxis: {
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
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100,
                    },
                    {
                        start: 0,
                        end: 100
                    }, {
                        showDetail: false,
                    }
                ],
                series: [
                    {
                        // name: '注册总量',
                        type: 'line',
                        // smooth: true, //是否平滑曲线显示
                        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        smooth: true,
                        data: this.data.dataY,
                        lineStyle: {
                            normal: {
                                color: "rgba(0, 255, 231, 1)", // 线条颜色
                            },
                            borderColor: '#f0f'
                        },

                        itemStyle: {
                            normal: {
                                color: "rgba(255,255,255,1)",
                            }
                        },
                        tooltip: {
                            show: true
                        },
                        areaStyle: { //区域填充样式
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: this.fontSize(1),
                                    type: "linear",
                                    global: false,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(0, 255, 231, 1)"
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 231, 0)'
                                    }]
                                }
                            },
                        }
                    }],
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
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>