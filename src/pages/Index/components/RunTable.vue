<!--  -->
<template>
    <el-table :data="tableData" :row-style="rowStyle" :border=false height="10.416667rem" ref="scrollTable"
        @mouseenter.native="autoScroll(true)" @mouseleave.native="autoScroll(false)">
        <el-table-column prop="deviceName" label="设备类型" align="center">
        </el-table-column>
        <el-table-column prop="priorName" label="告警等级" align="center">
        </el-table-column>
        <el-table-column prop="desc" label="告警描述" align="center">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" align="center">
        </el-table-column>
        <!-- <el-table-column prop="grid" label="并网点" align="center">
        </el-table-column> -->
        <el-table-column prop="plantName" label="电站名称" align="center">
        </el-table-column>
        <el-table-column prop="beginS" label="开始时间" align="center">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:['tableData'],
    name: "",
    data() {
        return {
            // 党员信息（调用接口为userInfo赋值，这里不再展示）
            alarmTable: [{
                type: '2016-05-02',
                level: '王小虎',
                desc: '上海市普陀',
                name: '1111',
                grid: '112',
                plantName: '1213',
                start: '2016-05-02'
            }, {
                type: '2016-05-02',
                level: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                name: '1111',
                grid: '112',
                plantName: '1213',
                start: '2016-05-02'
            }, {
                type: '2016-05-02',
                level: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                name: '1111',
                grid: '112',
                plantName: '1213',
                start: '2016-05-02'
            }, {
                type: '2016-05-02',
                level: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                name: '1111',
                grid: '112',
                plantName: '1213',
                start: '2016-05-02'
            }],
            // 自动滚动的定时任务
            scrolltimer: "",
        }
    },
    created() {

    },

    beforeDestroy() {
        this.autoScroll(true)
    },
    mounted() {

        this.autoScroll()

    },
    methods: {
        // 设置table自动滚动
        autoScroll(stop) {
            var table = this.$refs.scrollTable
            var div = table.$refs.bodyWrapper
            // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
            if (stop) {
                //再通过事件监听，监听到 组件销毁 后，再执行关闭计时器。
                window.clearInterval(this.scrolltimer)
            } else {
                this.scrolltimer = window.setInterval(() => {
                    // 元素自增距离顶部1像素
                    div.scrollTop += 1
                    // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
                    if (div.clientHeight + div.scrollTop >= div.scrollHeight) {
                        // 重置table距离顶部距离
                        div.scrollTop = 0
                    }
                }, 50) // 滚动速度
            }
        },
        rowStyle({ row, rowIndex }) {
            // 根据行数据或行索引返回样式对象
            return { background: 'radial-gradient( 2489% 70% at 50% 50%, #223444 0%, #3A505F 100%) !important' };
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.el-table {
    /deep/ .el-table__row {
        background: radial-gradient(2489% 70% at 50% 50%, #223444 0%, #3A505F 100%) !important;
    }

    /deep/ .el-table__header {
        background: #223444 !important;
   
    }
}

.el-table tr th,
.el-table tr td {
    border-left: 0px solid #fff !important;
}

.el-table tr th:last-child,
.el-table tr td:last-child {
    border-right: 0px solid #999;
}
</style>