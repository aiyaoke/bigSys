<template>
  <div class="batteryCluster">
    <div class="search-wrapper">
      <span class="search-name">{{ $translate("电池组") }}：</span>
      <el-select v-model="currentGroup" size="mini" placeholder="请选择">
        <el-option
          v-for="item in batteryGroup"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="battery-cluster">
      <div
        class="single-cluster"
        v-for="(item, index) in this.batteryCluster"
        :key="index"
      >
        <span class="label">{{ clusterIndex(index) }}</span>
        <!-- <div class="status">
          <span class="on">运行</span>
          <span class="warn">报警</span>
        </div> -->
        <div class="vol">
          <div v-for="(vol, uuIndex) in item.vols" :key="uuIndex">
            <div class="index">{{ uuIndex + 1 }}.</div>
            <div class="value" @click="showDetailChart(index + 1, uuIndex + 1)">
              <div
                :style="{
                  color:
                    vol === 0
                      ? '#fff'
                      : Math.min(...item.vols) === vol
                      ? 'rgb(74, 144, 226)'
                      : Math.max(...item.vols) === vol
                      ? '#f78989'
                      : '#fff'
                }"
              >
                <!--  class="electric-current1 charge1" -->
                <span class="vol-value">{{ vol }}</span>
                <span class="unit">V</span>
              </div>
            </div>
          </div>
        </div>
        <div class="temp">
          <div
            v-for="(temp, vvIndex) in item.tmps"
            :key="vvIndex"
            :style="getTempBackColor(temp)"
          >
            {{ temp }} <span class="unit">℃</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="chartTitle" :visible.sync="chartVisible" width="80%">
      <div class="data-chooce">
        <span class="search-name">{{ $translate("日期") }}：</span>
        <el-date-picker
          v-model="date"
          type="date"
          size="mini"
          :editable="false"
          :clearable="false"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button
          type="primary"
          class="margin-l"
          size="mini"
          @click="getChartData"
          >{{ $translate("查询") }}</el-button
        >
      </div>

      <div class="charts">
        <CategoryChart :args="volChartArgs" />
      </div>
      <div class="charts">
        <CategoryChart :args="tempChartArgs" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiBatteryClusterChart,
  apiBatteryCount,
  apiClusterInfo
} from "@/api/device";
import { nowTime, momentFormate } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
  name: "BatteryCluster",
  data() {
    return {
      batteryGroup: [],
      currentGroup: 1,
      batteryCluster: [],
      date: nowTime(0, "YYYY-MM-DD"),
      chartVisible: false,
      volChartArgs: {
        ref: "volChartArgs",
        colorIndex: 1,
        options: {
          toolbox: {
            show: false
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name: "V"
          },
          series: [
            {
              name: this.$translate("电压"),
              type: "line",
              data: []
            }
          ]
        }
      },
      tempChartArgs: {
        ref: "tempChartArgs",
        colorIndex: 2,
        options: {
          toolbox: {
            show: false
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name: "℃"
          },
          series: [
            {
              name: this.$translate("温度"),
              type: "line",
              data: []
            }
          ]
        }
      },
      httpData: {}
    };
  },
  mounted() {
    this.getBatteryCount();
  },
  computed: {
    ...device_getters(["currentDevice"]),
    clusterIndex() {
      return index => {
        return `Pack ${parseInt(index / 2) + 1}-${index % 2 ? 2 : 1}`;
      };
    },
    chartTitle() {
      let { groupId, clusterId, cellId, date } = this.httpData;
      return `${date}_${this.$translate("第")}${groupId}${this.$translate(
        "电池组"
      )}-Pack${clusterId}-${this.$translate("第")}${cellId}${this.$translate(
        "节"
      )}`;
    },
    // getTempBackColor() {
    //   return temp => {
    //     let mormalColor = "#7ed321";
    //     let linearColor = temp > 25 ? "rgb(224, 72, 90)" : "rgb(74, 144, 226)";
    //     let precent = (temp - 25) / 25;
    //     if (temp > 25) {
    //       precent = (1 - precent) * 100 + "%";
    //     } else {
    //       precent = Math.abs(precent) * 100 + "%";
    //     }
    //     let backgroundImage;
    //     if (temp < 25) {
    //       backgroundImage = `radial-gradient(${linearColor} ${precent}, ${mormalColor} )`;
    //     } else if (temp === 25) {
    //       backgroundImage = `radial-gradient(${mormalColor}`;
    //     } else {
    //       backgroundImage = `radial-gradient(${mormalColor} ${precent}, ${linearColor} )`;
    //     }
    //     return {
    //       backgroundImage
    //     };
    //   };
    // }
    // getTempBackColor() {
    //     return (temp) => {
    //         let precent = Math.abs(temp / 25) || 0.1;
    //         let background;
    //         if (temp < 25) {
    //             background = `rgb(74, 144, 226,${precent})`;
    //         } else if (temp === 25) {
    //             background = "#7ed321";
    //         } else {
    //             background = `rgb(255,0,0,${precent})`;
    //         }
    //         return {
    //             background,
    //         };
    //     };
    // },
    getTempBackColor() {
      return temp => {
        let background;
        if (temp < 25) {
          background = `rgb(74, 144, 226)`;
        } else if (temp === 25) {
          background = "#7ed321";
        } else {
          background = `#f78989`;
        }
        return {
          background
        };
      };
    }
  },
  components: {
    CategoryChart: _ => import("@/components/Chart/CategoryChart")
  },
  methods: {
    getTmptId(cellId) {
      let tmptId = 0;
      // if (cellId <= 3) {
      //     tmptId = 15;
      // } else if (cellId >= 4 && cellId <= 6) {
      //     tmptId = 16;
      // } else if (cellId >= 7 && cellId <= 9) {
      //     tmptId = 17;
      // } else if (cellId >= 10 && cellId <= 12) {
      //     tmptId = 18;
      // } else {
      //     tmptId = 0;
      // }
      if (cellId <= 4) {
        tmptId = 15;
      } else if (cellId >= 5 && cellId <= 8) {
        tmptId = 16;
      } else if (cellId >= 9 && cellId <= 12) {
        tmptId = 17;
      } else if (cellId >= 10 && cellId <= 12) {
        tmptId = 18;
      } else {
        tmptId = 0;
      }
      return tmptId;
    },
    async getBatteryCount() {
      let { data: count } = await apiBatteryCount({
        dtuId: this.currentDevice.id
      });
      if (count) {
        for (let i = 1; i <= count; i++) {
          let group = i + `#${this.$translate("电池组")}`;
          this.batteryGroup.push({
            label: group,
            value: i
          });
        }
      }
      this.getClusterInfo();
    },
    async getClusterInfo() {
      let httpData = {
        dtuId: this.currentDevice.id,
        groupId: this.currentGroup
      };
      let { data } = await apiClusterInfo(httpData);
      this.batteryCluster = data ? data : [];
      console.log(data);
    },
    async getChartData() {
      this.httpData.date = this.date;
      let { data } = await apiBatteryClusterChart(this.httpData);
      if (data) {
        let { volData, tmptData } = JSON.parse(data);
        this.volChartArgs.options.xAxis.data = volData
          ? volData.map(item => momentFormate(item.time, "HH:mm:ss"))
          : [];
        this.volChartArgs.options.series[0].data = volData
          ? volData.map(item => item.value)
          : [];
        this.tempChartArgs.options.xAxis.data = tmptData
          ? tmptData.map(item => momentFormate(item.time, "HH:mm:ss"))
          : [];
        this.tempChartArgs.options.series[0].data = tmptData
          ? tmptData.map(item => item.value)
          : [];
      }
    },
    async showDetailChart(clusterId, cellId) {
      this.chartVisible = true;
      this.httpData = {
        dtuId: this.currentDevice.id,
        groupId: this.currentGroup,
        clusterId,
        cellId,
        date: this.date,
        tmptId: this.getTmptId(cellId)
      };
      this.getChartData();
    }
  },
  watch: {
    currentGroup() {
      this.getClusterInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.battery-cluster {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  .single-cluster {
    padding: 10px;
    padding-left: 0;
    min-height: 100px;
    background: rgba(55, 54, 55, 0.35);
    position: relative;
    color: #9b9b9b;
    font-size: 14px;
    font-family: DINCondensed-Bold;
    border: 1px solid #d3d3d32e;
    .label {
      position: absolute;
      top: -16px;
      left: 0;
      font-size: 12px;
      font-family: normal;
    }
    display: flex;
    .unit {
      font-size: 12px;
      margin-left: 5px;
    }
    .status {
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border-right: 1px solid #d3d3d32e;
      .on {
        color: rgb(58, 243, 167);
      }
      .warn {
        color: red;
      }
    }
    .vol {
      flex: 1;
      margin-right: 10px;
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-gap: 3px;
      div {
        display: flex;
        .index {
          flex: 1;
          display: flex;
          justify-content: center;
          font-size: 14px;
        }
        .value {
          background: #d3d3d32e;
          flex: 3;
          display: flex;
          align-items: center;
          justify-self: center;
          padding-left: 5px;
          box-sizing: border-box;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          &:hover {
            .arrow {
              right: 2px;
            }
          }
          &::after {
            content: "";
            display: inline-block;
            background: #d3d3d32e;
            width: 3px;
            height: 51%;
            border-left: none;
            position: absolute;
            right: -4px;
            top: 23%;
            border-radius: 0 3px 3px 0;
          }
        }
      }
    }
    .temp {
      width: 60px;
      display: grid;
      grid-template-rows: auto auto auto auto;
      grid-gap: 3px;
      div {
        background: #7ed321;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.data-chooce {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.electric-current {
  width: 100%;
  height: 100%;
  background: $colorful-6;
  position: absolute;
  left: 0;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  box-sizing: border-box;
}
.charge {
  animation: Charge 8s infinite linear;
}
@keyframes Charge {
  0% {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
.charts {
  width: 100%;
  height: 350px;
}
</style>
