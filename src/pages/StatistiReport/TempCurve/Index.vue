<template>
    <div class="tempCurve">
        <div class="search-wrapper">
            <div>
                <span class="search-name">{{ $translate("电池组") }}：</span>
                <el-cascader
                    size="mini"
                    v-model="value"
                    :options="batteryGroup"
                    :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
            </div>
            <div>
                <span class="search-name">{{ $translate("对比日期") }}：</span>
                <el-date-picker
                    v-model="date"
                    type="date"
                    size="mini"
                    :editable="false"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </div>
            <el-button type="primary" size="mini" @click="handleSearch">{{
                $translate("查询")
            }}</el-button>
            <ExportExcel
                :title="excel_title"
                :fields="excel_fields"
                :data="resData"
            />
        </div>
        <PlaneBox>
            <span slot="title">{{ $translate("温差曲线") }}</span>
            <TimeChart :args="chartArgs" slot="content" />
        </PlaneBox>
    </div>
</template>

<script>
import { apiGetBatteryCount, apiTmpCurve } from "@/api/device";
import { nowTime, momentFormate } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "TempCurve",
    data() {
        return {
            value: [1, 1],
            batteryGroup: [],
            date: nowTime(-1, "YYYY-MM-DD"),
            chartArgs: {
                ref: "runMonitor",
                options: {
                    tooltip: {
                        formatter: (params) => this.getTooltip(params),
                    },
                    yAxis: {
                        name: "℃",
                    },
                    series: [
                        { name: this.$translate("对比日期"), data: [] },
                        { name: this.$translate("今日"), data: [] },
                    ],
                },
            },
            resData: [],
            excel_title: "温差曲线",
            excel_fields: {
                sn: {
                    field: "dtuId",
                    callback: (value) => this.currentDevice.sn,
                },
                压差: "nowDiff",
                最高温度: "nowMax",
                最高温度单体: "nowMaxCell",
                最低温度: "nowMin",
                最低温度单体: "nowMinCell",
                时间: {
                    field: "nowTime",
                    callback: (value) =>
                        momentFormate(
                            parseInt(value) * 1000,
                            "YYYY-MM-DD HH:mm:ss"
                        ),
                },
            },
        };
    },
    mounted() {
        this.getBatteryCount();
        this.handleSearch();
    },
    computed: {
        ...device_getters(["currentDevice"]),
    },
    components: {
        PlaneBox: (_) => import("@/components/PlaneBox"),
        ExportExcel: (_) => import("@/components/ExportExcel"),
        TimeChart: (_) => import("@/components/Chart/TimeChart"),
    },
    methods: {
        getTooltip(params) {
            // let text = `${params[0].value[0]}<br/>`;
            let text = "";
            params.forEach(({ seriesName, dataIndex, seriesIndex, color }) => {
                let {
                    nowDiff,
                    nowMax,
                    nowMin,
                    nowMaxCell,
                    nowMinCell,
                    cmpDiff,
                    cmpMax,
                    cmpMin,
                    cmpMaxCell,
                    cmpMinCell,
                } = this.resData[dataIndex];
                let [value, max, min, maxCell, minCell] = ["", "", "", "", ""];
                if (seriesIndex === 0) {
                    value = cmpDiff;
                    max = cmpMax;
                    min = cmpMin;
                    maxCell = cmpMaxCell;
                    minCell = cmpMinCell;
                } else {
                    value = nowDiff;
                    max = nowMax;
                    min = nowMin;
                    maxCell = nowMaxCell;
                    minCell = nowMinCell;
                }

                text = text.concat(`
              <div>
                <span style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
                ${seriesName}：${value} <br/>
                ${this.$translate("最高温度")}：${max} (${this.$translate(
                    "第"
                )}${maxCell}${this.$translate("节")})<br/>
                ${this.$translate("最低温度")}：${min} (${this.$translate(
                    "第"
                )}${minCell}${this.$translate("节")})<br/>
                </div>
              `);
            });
            return text;
        },
        handleSearch() {
            this.getChartsData();
        },
        async getBatteryCount() {
            let { data: count } = await apiGetBatteryCount({
                dtuId: this.currentDevice.id,
            });
            if (count) {
                for (let i = 1; i <= count; i++) {
                    let group = i + `#${this.$translate("电池组")}`;
                    let cluster = [];
                    for (let j = 1; j <= 32; j++) {
                        cluster.push({
                            label: `Pack ${j} `,
                            value: j,
                        });
                    }
                    this.batteryGroup.push({
                        label: group,
                        value: i,
                        children: cluster,
                    });
                }
            }
        },
        async getChartsData() {
            let requestData = {
                dtuId: this.currentDevice.id,
                group: this.value[0],
                cluster: this.value[1],
                date: this.date,
            };
            let { data } = await apiTmpCurve(requestData);
            this.resData = JSON.parse(data || "[]");
            let nowData = [];
            let compareData = [];

            this.resData.forEach(({ nowTime, nowDiff, cmpDiff }) => {
                let time = momentFormate(
                    parseInt(nowTime) * 1000,
                    "YYYY-MM-DD HH:mm:ss"
                );
                nowData.push({
                    time,
                    value: [time, nowDiff],
                });
                compareData.push({
                    time,
                    value: [time, cmpDiff],
                });
            });
            this.chartArgs.options.series[0].data = compareData;
            this.chartArgs.options.series[1].data = nowData;
        },
    },
};
</script>
