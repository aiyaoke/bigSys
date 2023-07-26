<!--  -->
<template>
    <div class="intervalData">
        <div class="queryTitl">
            <el-date-picker v-model="date" type="date"  size="mini" @change="dateChange" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-cascader 
                :options="options"
                @change="queryData" 
                size="mini" 
                collapse-tags 
                placeholder="选择设备"
                v-model="selectedDevices"
            />
            <ExportExcel :header="getExcelParams.header" :title="getExcelParams.title" :fields="getExcelParams.fields"
                :data="excelData" />
        </div>
        <div class="tag" v-if="dynamicTags&&dynamicTags.length>0">
            <el-tag :key="index" v-for="(tag, index) in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)" :style="{ 'color': alleCharData.colors[index] }">
                {{ tag }}
            </el-tag>
        </div>
        <div class="chart-content">
            <ChartTitle :title="$translate('区间数据')" />
            <div class="chart">
                <MoreY :args="chartArgs" />
            </div>
        </div>
        <!-- <Table :tableData="tableData" class="margin-t"  :columns="columns" /> -->
    </div>
</template>

<script>
import { apigetDeviceStructure, apigetDataComparisonInfo } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
import { nowTime, momentFormate, showMessage } from "@/common/utils";

const {
    mapGetters: device_getters,
    mapMutations: device_mutations,
    mapActions: device_actions,
} = createNamespacedHelpers("device");
import { lineColor, labelColor } from "@/assets/styles/echarts-dark.scss";
import { deepClone } from "@/common/utils";

export default {
    name: "IntervalData",
    data() {

        return {
            selectedDevices: [],
            showXAxisList: [
                "00:00:00",
                "01:00:00",
                "02:00:00",
                "03:00:00",
                "04:00:00",
                "05:00:00",
                "06:00:00",
                "07:00:00",
                "08:00:00",
                "09:00:00",
                "10:00:00",
                "11:00:00",
                "12:00:00",
                "13:00:00",
                "14:00:00",
                "15:00:00",
                "16:00:00",
                "17:00:00",
                "18:00:00",
                "19:00:00",
                "20:00:00",
                "21:00:00",
                "22:00:00",
                "23:00:00",
                "23:55:00"
            ],
            props: { multiple: true },
            date:  nowTime(0, "YYYY-MM-DD "),
            optionVal: "",
            options: [],
            excelData: [],
            currentData: '',
            httpData: { list: [] },
            httpTag:[],
            dynamicTags: [],
            alleCharData: {
                colors: ['#5470C6', '#91CC75', '#EE6666', '#FFD700', '#9370DB'],
                position: ['left', 'left', 'left', 'right', 'right'],
                offset: [0, 60, 120, 0, 60]
            },
            getExcelParams: {
                header: '',
                title: '电站区间数据',
                fields: {}
            },
            chartArgs: {
                ref: "intervalData",
                color: [],
                options: {
                    grid: {
                        bottom: 80
                    },
                    legend: {
                        data: []
                    },
                    xAxis: {
                        data: [],
                        splitNumber: 24,
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: lineColor,
                            width: 1,
                            type: "dashed",
                        },
                        },
                        boundaryGap: false,
                        axisLabel:{
                            rotate: 30,
                            formatter(value){
                                const dataArr = value.split(' ')
                                const YMD = dataArr[0];
                                const SMM = dataArr[1];
                                return `${SMM}`
                            }
                        }
                    },
                    yAxis: [],
                    series: [
                        { name: '', type: 'line', data: [] },
                    ],
                    dataZoom: [
                        {
                            show: false
                        }
                    ]
                },
            },
            loading: {

            },
            columns: [{
                // key:'time',
                // label:'Time'
            }],
            tableData: [{
            },],
        }
    },
    created() {

    },
    computed: {
        ...device_getters(["allDevices"])
    },
    methods: {
        dateChange(val) {
            this.getQueryData();
        },
        handleClose(tag) {
            if (this.dynamicTags.length==this.columns.length-1) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            // return;
            this.httpData.list.splice(this.httpData.list.indexOf(tag), 1);
            this.chartArgs.options.series.splice(this.chartArgs.options.series.indexOf(tag), 1);
            // this.chartArgs.options.yAxis.splice(this.httpData.list.indexOf(tag), 1);
            this.chartArgs.color.splice(this.httpData.list.indexOf(tag), 1);
            this.columns.splice(this.dynamicTags.indexOf(tag), 1);
            this.getQueryData();
            }
          
        },
        async queryData(val) {
            this.columns[0]={
                key:'time',
                label:'Time',
            };
            this.options.forEach((item) => {
                let flag = item.children.findIndex((it) => {
                    if (val[1] === it["value"]) {
                        return it["value"]
                    }
                });
                if (flag !== -1) {
                    val[0] = item.children[flag].label;
                    this.chartArgs.options.series.name = val[0];
                    let index = item.children[flag].children.findIndex(i => i.value === val[2]);
                    if (this.httpData.list.length > 4) {
                        showMessage("warning", "最多添加5个对象")
                    } else if (this.dynamicTags.indexOf(`${item.label}/${val[0]}/${item.children[flag].children[index].label}`) == -1) {
                        let tag=`${item.label}/${val[0]}/${item.children[flag].children[index].label}`;
                        this.httpData.list.push(val);
                        this.httpTag.push(tag);
                        this.dynamicTags.push(tag);
                        this.columns.push({
                            key:tag,
                            label:tag,
                        });
                        this.chartArgs.options.legend.data = this.dynamicTags;
                        this.chartArgs.options.yAxis.push({
                            type: 'value',
                            position: this.alleCharData.position[this.dynamicTags.length - 1],
                            alignTicks: true,
                            offset: this.alleCharData.offset[this.dynamicTags.length - 1],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: this.alleCharData.colors[this.dynamicTags.length - 1]
                                }
                            }, 
                            axisLabel: {
                                    formatter: '{value}',
                                    show: true,
                            }
                        });
                        this.chartArgs.color.push(this.alleCharData.colors[this.dynamicTags.length - 1]);
            this.getQueryData();
                    } else {
                        showMessage("warning", "已经选择该对象")
                    }
                }
            });
            
        },
        async getQueryData() {
            this.chartArgs.options.series = []
            this.httpData.endDate = this.date || '';
            this.httpData.startDate = this.date || '';
            // console.log( this.httpData);
            let { data } = await apigetDataComparisonInfo(this.httpData);
            data.forEach((it,index) => {
                let xData = [];
                let yData = [];
                it.list.forEach((item) => {
                    if(this.showXAxisList.includes(momentFormate(item.time, "HH:mm:ss"))){
                        xData.push(momentFormate(item.time, "YYYY-MM-DD HH:mm:ss"));
                        yData.push(item.value);
                    } 
                });
                if (xData.length!==0) {
                this.chartArgs.options.xAxis.data = xData;
                }
                this.chartArgs.options.series.push({ name: this.dynamicTags[index], type: 'line', data: yData,smooth: true , yAxisIndex:index ,},)

            });
            this.getTableData(data);
        },
        async getDeviceStructure() {
            let { BMC, BMS, PCS } = await apigetDeviceStructure({ plantId: this.allDevices[0].plantId });
            this.options = [
                { 
                    value: 1,
                    label: "BMC",
                    children: BMC
                },
                {
                    value: 2,
                    label: "BMS",
                    children: BMS
                },
                {
                    value: 3,
                    label: "PCS",
                    children: PCS
                }
            ];
            // 默认请求第一个数据
            let initQuery = [];
            const deepOption = deepClone(this.options);
            const getInitQuery = (option) => {
                if(option[0]&&option[0].value){
                    initQuery.push(option[0].value);
                }
                if(option[0].children&&Array.isArray(option[0].children)){
                    getInitQuery(option[0].children)
                }
            }
            this.selectedDevices = initQuery;
            getInitQuery(deepOption)
            this.queryData(deepClone(initQuery));
        },
      
        getTableData(data){
            data.forEach((item,ii)=>{
                item.list.forEach((it,index)=>{

                    this.tableData[index]={
                        ...this.tableData[index],
                        time:momentFormate(it.time, "YYYY-MM-DD HH:mm:ss"),
                        [this.dynamicTags[ii]]:it.value ,
                    }
                })
               this.getExcelParams.fields={
                "time":"time",
                [this.dynamicTags[ii]]:this.dynamicTags[ii],
                ...this.getExcelParams.fields
               }

            })
                this.excelData=this.tableData;
        }
    },
    mounted() {
        this.getDeviceStructure();
    },
    components: {
        PlaneBox: (_) => import("@/components/PlaneBox"),
        MoreY: (_) => import("@/components/Chart/MoreY"),
        ExportExcel: (_) => import("@/components/ExportExcel"),
        Table:(_)=> import("@/components/TableNew"),
        ChartTitle: (_) => import("@/components/ChartTitle"),
    }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.queryTitl {
    display: flex;
    width: 500px;
    justify-content: space-between;
}

.el-tag+.el-tag {
    margin-left: 10px;
    background-color: '#a3a3a3';
}
.margin-t{
    margin-top: 50px;
}

.tag{
    margin-top: 10px;
}

.chart-content{
    @include bg-color("2");
    margin-top: 10px;
    padding: 5px;
}

.chart{
    width: 100%;
    height: calc(100vh - 240px);
}
</style>