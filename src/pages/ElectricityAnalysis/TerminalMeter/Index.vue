<template>
    <div class="terminalMeter">
        <div class="search-wrapper">
            <!-- <el-button
                v-for="item in btns"
                :key="item.value"
                :type="item.value === type ? 'primary' : ''"
                size="mini"
                @click="changeType(item.value)"
            >
                {{ $translate(item.label) }}
            </el-button> -->
            <DatePick
                :defaultDate="date"
                type="daterange"
                :disabledDate="disabledDate"
                @change="changeDate"
            ></DatePick>
            <el-dropdown size="mini">
                <el-button size="mini" type="warning" icon="el-icon-download"
                    >Excel
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <ExportExcel
                            :header="getExcelParams.charge.header"
                            :title="getExcelParams.charge.title"
                            :fields="getExcelParams.charge.fields"
                            :data="chargeExcelData"
                            :buttonText="$translate('充电统计')"
                        />
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <ExportExcel
                            :header="getExcelParams.discharge.header"
                            :title="getExcelParams.discharge.title"
                            :fields="getExcelParams.discharge.fields"
                            :data="dischargeExcelData"
                            :buttonText="$translate('放电统计')"
                        />
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <ExportExcel
                            :header="getExcelParams.elecTotal.header"
                            :title="getExcelParams.elecTotal.title"
                            :fields="getExcelParams.elecTotal.fields"
                            :data="elecTotalExcelData"
                            :buttonText="$translate('电量统计')"
                        />
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <ExportExcel
                            :header="getExcelParams.chargeDischarge.header"
                            :title="getExcelParams.chargeDischarge.title"
                            :fields="getExcelParams.chargeDischarge.fields"
                            :data="chargeDischargeExcelData"
                            :buttonText="$translate('充放电效率')"
                        /> 
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>
                        <ExportExcel
                        :header="getExcelParams.helpMeter.header"
                        :title="getExcelParams.helpMeter.title"
                        :fields="getExcelParams.helpMeter.fields"
                        :data="helpMeterExcelData"
                        :buttonText="$translate('辅源侧电表')"
                        />
                    </el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
        </div>

       <div class="chart">
          <PlaneChart :args="chargeStatistics" :showInfoData="true"></PlaneChart>
          <PlaneChart :args="dischargeStatistics" :showInfoData="true"></PlaneChart>
          <ElectricityChart :date="date" @changeDownloadExcelData="changeDownloadExcelData" />
          <PlaneChart :args="chargeDischargeCurve" :showInfoData="false"></PlaneChart>
       </div>
    </div>
</template>

<script>
import {
    apiChargeDisChargeCurve,
    apiChargeDisChargeMostValue,
    apiChargeStatistics,
    apiDisChargeStatistics,
    apiEnergyEfficiency
} from "@/api/device";
import { getEchatsData, momentFormate, nowTime } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
import moment from "moment";
export default {
    name: "TerminalMeter",
    data() {
        return {
            type: "1week",
            btns: [
                { label: "近1周", value: "1week" },
                { label: "近1月", value: "1month" },
                { label: "近3月", value: "3month" },
            ],
            date: [nowTime(-7, "YYYY-MM-DD"), nowTime(0, "YYYY-MM-DD")],
            disabledDate: {
                disabledDate(time) {
                    const startDate = new Date();
                    const endDate = new Date();
                    const days = moment().diff(nowTime(-3, "YYYY-MM-DD", "month"), 'days');
                    startDate.setTime(startDate.getTime()-3600 * 1000 * 24 * days);
                    endDate.setTime(endDate.getTime());
                    return time.getTime() < startDate || time.getTime()>endDate;
                },
            },
            elecTotalExcelData:[],
            helpMeterExcelData: [],
            energyEfficiency: {
                title: "充放电效率",
                ref: "chargeDischargeCurve",
                colorIndex: 0,
                options: {
                    xAxis: {
                        boundaryGap: false,
                    },
                    yAxis: {
                        name: "",
                    },
                    series: [{ name: this.$translate("充放电效率"), data: [] }],
                },
               
            },
            chargeDischargeCurve: {
                title: "充放电效率",
                ref: "chargeDischargeCurve",
                colorIndex: 0,
                options: {
                    xAxis: {
                        boundaryGap: false,
                    },
                    yAxis: {
                        name: "",
                    },
                    series: [{ name: this.$translate("充放电效率"), data: [] }],
                },
                mostValue: [
                    { title: "实时充电功率", value: "", time: "", unit: "kW" },
                    { title: "最大充电功率", value: "", time: "", unit: "kW" },
                    { title: "最大放电功率", value: "", time: "", unit: "kW" },
                ],
            },
            chargeStatistics: {
                title: "充电统计",
                ref: "chargeStatistics",
                colorIndex: 1,
                options: {
                    xAxis: {
                        data: [],
                    },
                    yAxis: {
                        name: "kWh",
                    },
                    series: [
                        { name: this.$translate("充电电量"), data: [], barMaxWidth: 60,}
                    ],
                },
                mostValue: [
                    {
                        title: "本日累计充电量",
                        value: "",
                        time: "",
                        unit: "kWh",
                    },
                    { title: "累计充电量", value: "", time: "", unit: "kWh" },
                ],
            },
            dischargeStatistics: {
                title: "放电统计",
                ref: "dischargeStatistics",
                colorIndex: 2,
                options: {
                    xAxis: {
                        data: [],
                        barMaxWidth: 40
                    },
                    yAxis: {
                        name: "kWh",
                    },
                    series: [{ name: this.$translate("放电电量"), data: [], barMaxWidth: 60 }],
                },
                mostValue: [
                    {
                        title: "本日累计放电量",
                        value: "",
                        time: "",
                        unit: "kWh",
                    },
                    { title: "累计放电量", value: "", time: "", unit: "kWh" },
                ],
            },
            chargeDischargeExcelData: [],
            chargeExcelData: [],
            dischargeExcelData: [],
        };
    },
    mounted() {
        this.getData();
    },
    components: {
        PlaneChart: (_) => import("./components/PlaneChart"),
        ExportExcel: (_) => import("@/components/ExportExcel"),
        ElectricityChart: (_) => import("./components/ElectricityChart"),
        DatePick: (_) => import("@/components/DatePick"),
    },
    computed: {
        ...device_getters(["currentDevice","allDevices","version"]),
        getExcelParams() {
            return {
                chargeDischarge: {
                    header: `充放电效率/kW`,
                    title: "充放电效率",
                    fields: {
                        [this.$translate("日期")]: {
                            field: "value",
                            callback: (value) => value[0],
                        },
                        [this.$translate("充放电")]: {
                            field: "value",
                            callback: (value) => value[1],
                        },
                    },
                },
                charge: {
                    header: `充电统计/kWh`,
                    title: "充电统计",
                    fields: {
                        [this.$translate("日期")]: {
                            field: "time",
                            callback: (time) => momentFormate(time, "MM-DD"),
                        },
                        [this.$translate("充电")]: {
                            field: "value",
                            callback: (value) => value,
                        },
                    },
                },
                discharge: {
                    header: `放电统计/kWh`,
                    title: "放电统计",
                    fields: {
                        [this.$translate("日期")]: {
                            field: "time",
                            callback: (time) => momentFormate(time, "MM-DD"),
                        },
                        [this.$translate("放电")]: {
                            field: "value",
                            callback: (value) => value,
                        },
                    },
                },
                elecTotal: {
                    header: `电量统计/kWh`,
                    title: "电量统计",
                    fields: {
                        [this.$translate("日期")]: "date",
                        充电尖: "charge1",
                        充电峰: "charge2",
                        充电平: "charge3",
                        充电谷: "charge4",
                        放电尖: "disCharge1",
                        放电峰: "disCharge2",
                        放电平: "disCharge3",
                        放电谷: "disCharge4"
                    }
                },
                helpMeter: {
                    header: `辅源侧电表/kWh`,
                    title: "辅源侧电表",
                    fields: {
                        [this.$translate("日期")]: {
                        field: "time",
                        callback: time => momentFormate(time, "MM-DD")
                        },
                        [this.$translate("用电量")]: {
                        field: "value",
                        callback: value => value
                        }
                    }
                },

            };
        },
    },
    methods: {
        changeDownloadExcelData(elecTotalExcelData, helpMeterExcelData){
            this.elecTotalExcelData = elecTotalExcelData;
            this.helpMeterExcelData = helpMeterExcelData;
        },
        changeType(value) {
            this.type = value;
            this.getData();
        },
        getData() {
            let requestData = {
                dtuId: this.version=='2'?this.allDevices[0].dtuId:this.currentDevice.id,
                startDate: this.date[0],
                endDate: this.date[1],
            };
            this.getChargeDisChargeCurve(requestData);
            this.getChargeDisChargeMostValue(requestData);
            this.getChargeAmount(requestData);
            this.getDisChargeAmount(requestData);
            this.getEnergyEfficiency(requestData);
        },
        changeDate(value) {
            if(moment(value[1]).diff(moment(value[0]), 'days') < 7){
                this.$message({
                    message: '日期范围最少选择7天！',
                    type: 'warning'
                });
            }else{
              this.date = value;
              this.getData();
            }
        },
        async getEnergyEfficiency(requestData){
            this.chargeDischargeCurve.options.series[0].data=[];
            let {data}= await apiEnergyEfficiency(requestData);
            data.map(item=>{
                this.chargeDischargeCurve.options.series[0].data.push({
                    value:item.efficiency,
                    time:item.time
                })
            })
            this.chargeDischargeCurve.options.series[0].data=getEchatsData(this.chargeDischargeCurve.options.series[0].data, "MM-DD");
        },
        async getChargeDisChargeCurve(requestData) {
            let { data } = await apiChargeDisChargeCurve(requestData);
            let prseData = JSON.parse(data || "[]");
            this.chargeDischargeExcelData = prseData;
        },
        async getChargeDisChargeMostValue(requestData) {
            let { data } = await apiChargeDisChargeMostValue(requestData);
            let {
                minMaxPower: {
                    maxCharge,
                    maxChargeTime,
                    maxDisCharge,
                    maxDisChargeTime,
                },
                lastPower: { value, time },
            } = JSON.parse(data);
            this.chargeDischargeCurve.mostValue[0].value = value;
            this.chargeDischargeCurve.mostValue[0].time = time;
            this.chargeDischargeCurve.mostValue[1].value = maxCharge;
            this.chargeDischargeCurve.mostValue[1].time = maxChargeTime;
            this.chargeDischargeCurve.mostValue[2].value = maxDisCharge;
            this.chargeDischargeCurve.mostValue[2].time = maxDisChargeTime;
        },
        async getChargeAmount(requestData) {
            let { data } = await apiChargeStatistics(requestData);
            let {
                sumCharge: { timeS, timeE, value },
                todayCharge: { time, value: tValue },
                chartData,
            } = JSON.parse(data);
            let xData = [];
            let yData = [];
            chartData.forEach((item) => {
                xData.push(momentFormate(item.time, "MM-DD"));
                yData.push(item.value);
            });
            this.chargeExcelData = chartData;
            setTimeout(() => {
                this.chargeStatistics.options.xAxis.data = xData;
                this.chargeStatistics.options.series[0].data = yData;
            }, 500);
            this.chargeStatistics.mostValue[0].value = tValue;
            this.chargeStatistics.mostValue[0].time = time;
            this.chargeStatistics.mostValue[1].value = value;
            this.chargeStatistics.mostValue[1].time = [timeS, timeE];
        },
        async getDisChargeAmount(requestData) {
            let { data } = await apiDisChargeStatistics(requestData);
            let {
                sumDisCharge: { timeS, timeE, value },
                todayDisCharge: { time, value: tValue },
                chartData,
            } = JSON.parse(data);
            let xData = [];
            let yData = [];
            chartData.forEach((item) => {
                xData.push(momentFormate(item.time, "MM-DD"));
                yData.push(item.value);
            });
            this.dischargeExcelData = chartData;
            setTimeout(() => {
                this.dischargeStatistics.options.xAxis.data = xData;
                this.dischargeStatistics.options.series[0].data = yData;
            }, 500);
            this.dischargeStatistics.mostValue[0].value = tValue;
            this.dischargeStatistics.mostValue[0].time = time;
            this.dischargeStatistics.mostValue[1].value = value;
            this.dischargeStatistics.mostValue[1].time = [timeS, timeE];
        },
    },
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu--mini .el-dropdown-menu__item {
    padding: 3px;
    /deep/ .el-button {
        width: 100%;
        text-align: center;
    }
}
.chart{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    height: calc(100vh - 180px);
}
</style>