<template>
  <div class="containerIndex">
    <div class="top">
      <div class="top-item">
        <div class="top-icon"><i class='iconfont icon-fenxiangzhuanshouyi top-item-iconfont'></i></div>
        <div>
          <div class="top-item-data-title">今日收益(元)</div>
          <div class="top-item-data-num">{{ todayIncome }}</div>
        </div>
      </div>
      <div class="top-item">
        <div class="top-icon"><i class='iconfont icon-shouyetubiao2-27 top-item-iconfont'></i></div>
        <div>
          <div class="top-item-data-title">总收益(元)</div>
          <div class="top-item-data-num">{{ allIncome }}</div>
        </div>
      </div>
      <div class="top-item">
        <div class="top-icon"><i class='iconfont icon-dian top-item-iconfont'></i></div>
        <div>
          <div class="top-item-data-title">当日放电(度)</div>
          <div class="top-item-data-num">{{ todayDischarge }}</div>
        </div>
      </div>
      <div class="top-item">
        <div class="top-icon"><i class='iconfont icon-tuiguangzhuanqian top-item-iconfont'></i></div>
        <div>
          <div class="top-item-data-title">总放电量(度)</div>
          <div class="top-item-data-num">{{ allDischarge }}</div>
        </div>
      </div>
      <div class="top-item">
        <div class="top-icon"><i class='iconfont icon-chatou top-item-iconfont'></i></div>
        <div>
          <div class="top-item-data-title">当日充电(度)</div>
          <div class="top-item-data-num">{{ todayDischarge }}</div>
        </div>
      </div>
      <div class="top-item">
        <div class="top-icon"><i class='iconfont icon-dianzhangaikuang top-item-iconfont'></i></div>
        <div>
          <div class="top-item-data-title">总充电量(度)</div>
          <div class="top-item-data-num">{{ todayDischarge }}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-item bottom-left">
        <div class="bottom-left-top">
          <div class="bottom-left-top-title">
            <i class='iconfont icon-tubiao- top-item-iconfont'></i>
            <span class="bottom-left-top-title-desc">节能减排</span>
          </div>
          <div class="bottom-left-top-chart">
            <ReductionPieChart :args="reductionPieChartArgs" />
          </div>
          <!-- <div class="bottom-left-top-item">
            <div class="bottom-left-top-item-icon"><i class='iconfont icon-meiqi bottom-left-top-item-iconfont'></i></div>
            <div class="bottom-left-top-item-title">累计煤炭</div>
            <div class="bottom-left-top-item-num">{{coal}}</div>
          </div>
          <div class="bottom-left-top-item">
            <div class="bottom-left-top-item-icon"><i class='iconfont icon-co bottom-left-top-item-iconfont'></i></div>
            <div class="bottom-left-top-item-title">CO₂减排量</div>
            <div class="bottom-left-top-item-num">{{co2}}</div>
          </div>
           <div class="bottom-left-top-item">
            <div class="bottom-left-top-item-icon"><i class='iconfont icon-lvyouchengshijianzhucity-treexiaoheshumur bottom-left-top-item-iconfont'></i></div>
            <div class="bottom-left-top-item-title">折合树木</div>
            <div class="bottom-left-top-item-num">{{tree}}</div>
          </div> -->
        </div>
        <div class="bottom-left-bottom energyEfficiency">
          <div class="bottom-left-top-title">
            <i class='iconfont icon-qushi top-item-iconfont'></i>
            <span class="bottom-left-top-title-desc">充放电量</span>
          </div>
          <TimeChart :args="chartArgs" slot="content" />
        </div>
      </div>
      <div class="bottom-item bottom-right">
        <MyMap />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { apiGetDailyDisCharge } from "@/api/plant";
import { apiChargeDisCharge } from "@/api/device";
import {  momentFormate } from "@/common/utils";
const { mapActions: plant_actions } = createNamespacedHelpers("plant");
const { mapActions: device_actions } = createNamespacedHelpers("device");

export default {
  name: "ContainerIndex",
  data() {
    return {
      todayIncome: 0,
      allIncome: 0,
      todayDischarge: 0,
      allDischarge: 0,
      coal: 0,
      co2: 0,
      tree: 0,
      dailyCharge: 0,
      sumCharge: 0,
      reductionPieChartArgs: {
        ref: "reductionPieChartArgs",
        data: {
          coal: this.coal,
          co2: this.co2,
          tree: this.tree
        }
      },
      chartArgs: {
        ref: "energyEfficiency",
        options: {
          xAxis: {
            data: []
          },
          yAxis: {
            name: "",
          },
          series: [
            {
              name: this.$translate("充电电量"),
              key: "charge",
              itemStyle:{
                color: '#ef676c'
              },
              data: []
            },
            {
              name: this.$translate("放电电量"),
              key: "disCharge",
              itemStyle:{
                color: '#9fe080'
              },
              data: []
            },
          ],
        },
      },
    }
  },
  components: {
    MyMap: (_) => import("./components/Map"),
    ReductionPieChart: (_) => import("./components/reductionPieChart"),
    TimeChart: (_) => import("@/components/Chart/CategoryChart"),
  },
  mounted() {
    this.getDevicePermissions({ type: 0 });
    this.getAllPlants();
    this.getDailyDisCharge();
    this.getChargeDisCharge();
  },
  methods: {
    ...plant_actions(["getAllPlants"]),
    ...device_actions(["getDevicePermissions"]),
    async getDailyDisCharge() {
      let { data } = await apiGetDailyDisCharge();
      if (data) {
        data = JSON.parse(data);
        this.todayIncome = data.dailyProfit;
        this.allIncome = data.sumProfit;
        this.todayDischarge = data.dailyDisCharge;
        this.allDischarge = data.sumDisCharge;
        this.dailyCharge = data.dailyCharge;
        this.sumCharge = data.sumCharge;
        // this.coal = data.coal;
        // this.co2 = data.co2;
        // this.tree = data.tree;
        this.reductionPieChartArgs.data.coal = data.coal;
        this.reductionPieChartArgs.data.co2 = data.co2;
        this.reductionPieChartArgs.data.tree = data.tree;
      }
    },

    async getChargeDisCharge() {
      this.chartArgs.options.xAxis.data = [];
      this.chartArgs.options.series.forEach(uu => {
        uu.data = [];
      });
      let { data } = await apiChargeDisCharge();
          if (data) {
        let parseData =data;
        if (parseData.length) {
          parseData.forEach(item => {
            this.chartArgs.options.xAxis.data.push(
              momentFormate(item.date, "MM-DD")
            );
            this.chartArgs.options.series.forEach(uu => {
              uu.data = [...uu.data, item[uu.key]];
            });
          });
        }
      }
    }

  },
};
</script>

<style lang="scss" scoped>
.containerIndex {
  height: calc(100vh - 100px);
  position: relative;
  @include bg-color("1");
  padding: 50px;
}

.top {
  display: flex;
  margin-bottom: 30px;
  @include bg-color("2");
  height: 160px;
}

.top-item {
  display: flex;
  align-items: center;
  flex: 1;
}

.top-icon {
  width: 150px;
  text-align: center;
}

.top-item-iconfont {
  font-size: 50px;
  color: #31e0f0;
}

.top-item-data-title {
  font-size: 20px;
  margin-bottom: 30px;
  @include font-color("3");
}

.top-item-data-num {
  font-size: 35px;
  font-weight: 600;
  @include font-color("1");
}

.bottom {
  display: flex;
  gap: 20px;
}

.bottom-item {
  height: calc(100vh - 250px);
}

.bottom-left {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bottom-left-top {
  width: 100%;
  height: 40%;
  @include bg-color("2");
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.bottom-left-bottom {
  width: 100%;
  @include bg-color("2");
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
}

.bottom-left-top-title {
  height: 50px;
  display: flex;
  align-items: center;
}

.bottom-left-top-chart {
  width: 100%;
  height: 100%;
}

.bottom-left-top-title-desc {
  font-size: 20px;
  @include font-color("3");
  margin-left: 20px;
}

.bottom-left-top-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(235, 221, 227, 0.09);
  }
}

.bottom-left-top-item-icon {
  width: 100px;
  text-align: center;
  margin-right: 30px;
}

.bottom-left-top-item-iconfont {
  font-size: 30px;
  color: #31e0f0;
}

.bottom-left-top-item-title {
  font-size: 20px;
  @include font-color("3");
}

.bottom-left-top-item-num {
  font-size: 25px;
  font-weight: 600;
  @include font-color("1");
}

.bottom-right {
  @include bg-color("2");
  flex: 1;
}
</style>
