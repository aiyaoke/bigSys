<!--  -->
<template>
  <div class="container">
    <div class="title">
      <!-- <img width="100%" src="../../assets/images/bigScreen/大标题.svg" alt=""> -->
      <el-select class="select" v-model="value" placeholder="请选择" @change="isMileageCardOrder">
        <el-option v-for="item in plantList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="realElectricity">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{ $translate('实时电量')}}(kWh)</span>
      </div>
      <div class="content">
        <div class="onePart" v-for="item in realElectricity">
          <img :src='item.img' alt="">
          <div>
            <span class="value" :style="{ color: item.color }">{{ item.value }}</span>
            <span class="label">{{ $translate(item.label) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="map">
      <MyMap :currentPlantId="value"/>
      <div class="map_title">
        <div class="map_title_item" v-for="it in stageProfit">
          <img :src="it.img" alt="">
          <div class="right">
            <div class="map_title_value" :style="{ color: it.color }">{{ it.value }}</div>
            <div class="map_title_label">{{ $translate(it.label) }} <span>(元)</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="historicalElectricity">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{  $translate('历史电量') }}(kWh)</span>
      </div>
      <div class="content" ref="mains">
        <!-- <chart :options="options" :auto-resize="true"></chart> -->
      </div>
    </div>
    <div class="socialBenefit">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{  $translate('社会效益') }}</span>
      </div>
      <div class="content">
        <div class="onePart" v-for="item in socialBenefit">
          <img :src="item.img" alt="">
          <div class="value">{{ item.value }}<span>{{ item.unit }}</span></div>
          <div class="label">{{ $translate(item.label) }}</div>
        </div>
      </div>
    </div>
    <div class="alarmList">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{ $translate('告警列表') }}</span>
      </div>
      <div class="content">
        <Table class="table" :tableData="tableData" />
      </div>
    </div>
    <div class="realPower">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{$translate('实时功率') }}(kW)</span>
      </div>
      <div class="content">
        <RealPower :data="powerData" />
      </div>
    </div>
    <div class="benefitStatic">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{$translate('收益统计') }}(元)</span>
      </div>
      <div class="content">
        <Benefit :data="benefitData" :dataX="timeLine" />
      </div>
    </div>
    <div class="deviceRunStatus">
      <div class="top">
        <img src="../../assets/images/bigScreen/标题小图标.svg" alt="">
        <span class="topName">{{$translate('设备运行情况') }}</span>
      </div>
      <div class="content">
        <div class="onePart" v-for="item in deviceRunStatus">
          <div class="value" :style="{ color: item.color }">{{ item.value }}</div>
          <img :src="item.img" alt="">
          <div class="label">{{$translate(item.label) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/common/flexible.js";
import logo1 from '../../assets/images/bigScreen/当日充电量.svg'
import logo2 from '../../assets/images/bigScreen/当日放电量.svg'
import logo3 from '../../assets/images/bigScreen/月充电量.svg'
import logo4 from '../../assets/images/bigScreen/月放电量.svg'
import logo5 from '../../assets/images/bigScreen/累计充电量.svg'
import logo6 from '../../assets/images/bigScreen/累计放电量.svg'
import logo7 from '../../assets/images/bigScreen/节约标准煤.svg'
import logo8 from '../../assets/images/bigScreen/二氧化碳减排量.svg'
import logo9 from '../../assets/images/bigScreen/等效植树量.svg'
import logo10 from '../../assets/images/bigScreen/正常.svg'
import logo11 from '../../assets/images/bigScreen/告警.svg'
import logo12 from '../../assets/images/bigScreen/离线.svg';
import logo13 from '../../assets/images/bigScreen/当日收益.svg'
import logo14 from '../../assets/images/bigScreen/当月收益.svg'
import logo15 from '../../assets/images/bigScreen/当年收益.svg'
import logo16 from '../../assets/images/bigScreen/累计收益.svg';
import {
  getChargeDisCharge,
  getDailyDisCharge,
  getNowAlarmsByPlantId,
  getPlantPower,
} from "@/api/plant";
import { momentFormate } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: plant_getters, mapMutations: plant_mutations, mapActions: plant_actions } =
  createNamespacedHelpers("plant");
export default {
  name: "ContainerIndex",
  data() {
    return {
      plantList: [],
      value: '',
      realElectricity: [
        {
          label: '当日充电量',
          value: 'XXX',
          color: '#20C2FF',
          img: logo1,
          key: 'todayCharge'
        },
        {
          label: '当日放电量',
          value: 'XXX',
          color: '#FF5E00',
          img: logo2,
          key: 'todayDischarge'

        },
        {
          label: '月充电量',
          value: 'XXX',
          color: '#FFF',
          img: logo3,
          key: 'monthCharge'
        },
        {
          label: '月放电量',
          value: 'XXX',
          color: '#FFF',
          img: logo4,
          key: 'monthDischarge'

        },
        {
          label: '累计充电量',
          value: 'XXX',
          color: '#FFF',
          img: logo5,
          key: 'totalCharge'
        },
        {
          label: '累计放电量',
          value: 'XXX',
          color: '#FFF',
          img: logo6,
          key: 'totalDischarge'
        }
      ],
      screenWidth: null,
      screenHeight: '',
      socialBenefit: [
        {
          img: logo7,
          label: '节约标准煤',
          value: 2.13,
          unit: '吨',
          key: 'coal'
        },
        {
          img: logo8,
          label: 'CO₂减排量',
          value: 2.53,
          unit: '吨',
          key: 'co2'

        },
        {
          img: logo9,
          label: '等效植树量',
          value: 4.13,
          unit: '棵',
          key: 'tree'

        },
      ],
      chartInstance: null,
      deviceRunStatus: [
        {
          img: logo10,
          label: '在线',
          value: '-',
          color: '#01FF23',
          key: 'normal'
        },
        {
          img: logo12,
          label: '离线',
          value: '-',
          color: '#E3E3E3',
          key: 'offline'

        },
        {
          img: logo11,
          label: '告警',
          value: '-',
          color: '#FF0000',
          key: 'warn'

        },
       
      ],
      tableData: [],
      stageProfit: [
        {
          label: '当日收益',
          value: 'XXX',
          color: '#FF7E09',
          img: logo13,
          key: 'todayProfit'
        },
        {
          label: '当月收益',
          value: 'XXX',
          color: '#FFFFFF',
          img: logo14,
          key: 'monthProfit'

        },
        {
          label: '当年收益',
          value: 'XXX',
          color: '#FFF',
          img: logo15,
          key: 'yearProfit'
        },
        {
          label: '累计收益',
          value: 'XXX',
          color: '#FFF',
          img: logo16,
          key: 'totalProfit'

        },
      ],
      charge: [],
      disCharge: [],
      timeLine: [],
      chargeDataBottom: [],
      benefitData: [],
      powerData: {
        dataX: [],
        dataY: []
      }
    }
  },
  created() {

  },
  mounted() {
    this.getAllPlants().then(() => {
      this.plantList = this.allPlants.map(it => {
        return {
          value: it.plantId,
          label: it.name
        }
      });
      this.value = this.allPlants[0].plantId;
      this.initEcharts();
        this.getPlantPowers();
        this.getNowAlarmsByPlantIds();
        this.getDailyDisCharges();
        this.getChargeDisCharges();
      this.timer = setInterval(() => {
        this.initEcharts();
        this.getPlantPowers();
        this.getNowAlarmsByPlantIds();
        this.getDailyDisCharges();
        this.getChargeDisCharges();
      }, 24000);

    })
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
      })();
    }
  },
  computed: {
    ...plant_getters(["allPlants"]),
  },
  methods: {
    ...plant_actions(["getAllPlants"]),

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
        color: ["#63caff", "#3EFFF2", '#D65527', '#FFF700'],
        grid: {
          containLabel: true,
          left: this.fontSize(20),
          bottom: this.fontSize(10),
          right:this.fontSize(15),
        },
        xAxis: {
          axisLabel: {
            color: "#c0c3cd",
            fontSize: this.fontSize(8),
            interval: 0, // 横轴信息全部显示
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#384267",
              width: this.fontSize(1),
              type: "dashed"
            },
            show: true
          },
          data: this.timeLine,
          type: "category"
        },
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
        legend: {
          selectedMode: false,
          orient: 'horizontal',
          x: 'center',
          y: 'top',
          itemHeight: 5,
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(12),
          }
        },
        series: [{
          name: '充电量',
          data: this.charge,
          type: "bar",
          barWidth: this.fontSize(14),
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: this.fontSize(1),
              type: "linear",
              global: false,
              colorStops: [{
                offset: 0,
                color: "#3EFFF2"
              }, {
                offset: 1,
                color: "#4499F5"
              }]
            }
          },

        }, {
          data: this.chargeDataBottom,
          type: "pictorialBar",
          barMaxWidth: this.fontSize(14),
          symbolOffset: [this.fontSize(-9), "50%"],
          symbolSize: [this.fontSize(14), this.fontSize(7)]
        },
        {
          data: this.charge,
          type: "pictorialBar",
          barMaxWidth: this.fontSize(14),
          symbolPosition: "end",
          symbolOffset: [this.fontSize(-9), "-50%"],
          symbolSize: [this.fontSize(14), this.fontSize(7)],
          zlevel: 2
        },
        {
          name: '放电量',
          data: this.disCharge,
          type: "bar",
          barWidth: this.fontSize(14),
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: this.fontSize(1),
              type: "linear",
              global: false,
              colorStops: [{
                offset: 0,
                color: "rgba(0, 255, 229, 1)"
              }, {
                offset: 1,
                color: "rgba(0, 193, 114, 1)"
              }]
            }
          },

        }, {

          data: this.chargeDataBottom,
          type: "pictorialBar",
          barMaxWidth: this.fontSize(14),
          symbol: "diamond",
          symbolOffset: [this.fontSize(9), "50%"],
          symbolSize: [this.fontSize(14), this.fontSize(7)],
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
        },
        {
          data: this.disCharge,
          type: "pictorialBar",
          barMaxWidth: this.fontSize(14),
          symbolPosition: "end",
          symbol: "diamond",
          symbolOffset: [this.fontSize(9), "-50%"],
          symbolSize: [this.fontSize(14), this.fontSize(7)],
          zlevel: 2,
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: this.fontSize(1),
            type: "linear",
            global: false,
            colorStops: [{
              offset: 0,
              color: "rgba(38, 254, 208, 1)"
            }, {
              offset: 1,
              color: "rgba(0, 228, 10, 1)"
            }]
          },
        },
        ],
        tooltip: {
          trigger: "item",
          show: true
        }
      })
      this.chartInstance.on('legendselectchanged', function (params) {
        this.chartInstance.setOption({
          legend: { selected: { [params.name]: true } },
          animation: false
        })
        return null;
      });
    },
    isMileageCardOrder(val) {
      this.getPlantPowers();
      this.getNowAlarmsByPlantIds();
      this.getDailyDisCharges();
      this.getChargeDisCharges();
    },
    async getPlantPowers() {
      let { data } = await getPlantPower({ plantId: this.value });
      let dataX = [];
      let dataY = [];
      data.list.map(it => {
        dataX.push(momentFormate(it.time, 'HH:mm'));
        dataY.push(it.value);
      })
      this.powerData.dataX = dataX;
      this.powerData.dataY = dataY;
      // console.log(dataX, dataY, this.powerData, 'ayk');
    },
    async getNowAlarmsByPlantIds() {
      let { data } = await getNowAlarmsByPlantId({ plantId: this.value });
      this.tableData = data;
    },
    async getDailyDisCharges() {
      let { data } = await getDailyDisCharge({ plantId: this.value });
      let { deviceStatusCount, socialEffect, stageEnergy, stageProfit } = JSON.parse(data);
      this.realElectricity.map(it => {
        it.value = stageEnergy[it.key]
      });
      this.socialBenefit.map(it => {
        it.value = socialEffect[it.key];
      });
      this.deviceRunStatus.map(it => {
        it.value = deviceStatusCount[it.key];
      })
      this.stageProfit.map(it => {
        it.value = stageProfit[it.key];
      })
      // console.log(JSON.parse(data), 12121212);
    },
    async getChargeDisCharges() {
      let { data } = await getChargeDisCharge({ plantId: this.value });
      this.charge = [];
      this.disCharge = [];
      this.timeLine = [];
      this.chargeDataBottom = [];
      this.benefitData = [];
      data.map(it => {
        this.charge.push(it.charge);
        this.disCharge.push(it.disCharge);
        this.timeLine.push(it.date);
        this.chargeDataBottom.push(1);
        this.benefitData.push(it.earning);
      });
      this.initEcharts();

    },
  },
  destroyed() {
      clearInterval(this.timer);
    },
  components: {
    MyMap: (_) => import("./components/Map"),
    TimeChart: (_) => import("@/components/Chart/CategoryChart"),
    Table: (_) => import('./components/RunTable'),
    Benefit: (_) => import('./components/Benefit'),
    RealPower: (_) => import('./components/RealPower'),


  },
  watch: {
    screenWidth: {
      handler: function (val) {
        // console.log(val, 'sc');
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

.container {
  height: calc(100vh - 1.6667rem);
  @include bg-color("1");
  padding: .625rem 1.0417rem 1.0417rem 1.0417rem;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr 1.1fr 0.9fr;
  grid-template-rows: 4.8438rem 1fr 1fr 0.83fr;
  gap: .7813rem
    /* 15/80 */
    .7813rem
    /* 15/80 */
  ;
  grid-auto-flow: row;
  grid-template-areas:
    "title title title title"
    "realElectricity map map deviceRunStatus"
    "historicalElectricity map map benefitStatic"
    "socialBenefit alarmList alarmList realPower";
}

.title {
  grid-area: title;
  background: url('../../assets/images/bigScreen/大标题.svg') no-repeat;
  background-size: cover;
  position: relative;

  .select {
    position: absolute;
    width: 22.9167rem;
    bottom: 0;
  }

  /deep/ .el-select-dropdown {
    background-color: rgba($color: #000000, $alpha: 0.0) !important;
    border: .0521rem solid #2BDECD !important;

  }

  /deep/ .el-input__inner {
    background-color: rgba($color: #000000, $alpha: 0.0) !important;
    border: .0521rem solid #2BDECD !important;
    height: 1.8229rem
  }

}

/deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: #2BDECD !important;
}


.realElectricity {
  grid-area: realElectricity;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    width: 100%;
    height: calc(100% - 2.5521rem);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    .onePart {
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        min-width: 3.6458rem;

        span {
          display: block;
        }

        .value {
          font-size: 1.25rem;
          margin-bottom: .2083rem;
          width: 6.25rem;
        }

        .label {
          color: rgba(186, 254, 230, 1)
        }
      }

    }

    img {
      width: 1.7109rem;
      height: 2.2203rem;
      margin-right: .8854rem;
    }
  }

}

.top {
  background: url('../../assets/images/bigScreen/标题底框.svg') no-repeat;
  background-size: cover;
  width: 100%;
  height: 2.5521rem;
  display: flex;
  align-items: center;

  img {
    margin-left: .7813rem;

  }

  .topName {
    font-size: 1.25rem;
    color: #fff;
    margin-left: .4167rem;
  }
}

.map {
  grid-area: map;
  width: 100%;
  height: 100%;
  position: relative;

  .map_title {
    position: absolute;
    top: 0;
    display: grid;
    width: 100%;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: .416667rem
      /* 8/19.2 */
      .416667rem
      /* 8/19.2 */
    ;

    .map_title_item {
      // width: 25%;  
      height: 4.6875rem;
      background: rgba(28, 43, 57, 0.7);
      border-radius: 8px;
      // border: .0521rem solid #2BDECD;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .5208rem .5208rem;

      .map_title_value {
        font-size: 1.25rem;
        margin-bottom: .3125rem;

        span {
          font-size: .8333rem;
          color: #FFFFFF,
        }
      }

      .map_title_label {
        font-size: .8333rem;
        color: #BAFEE6
      }

      img {
        width: 2.0833rem
          /* 51/19.2 */
        ;
        margin-right: 1.0417rem;
      }
    }
  }
}

.historicalElectricity {
  grid-area: historicalElectricity;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    width: 100%;
    height: calc(100% - 2.5521rem);
  }
}

.socialBenefit {
  grid-area: socialBenefit;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    width: 100%;
    height: calc(100% - 2.5521rem);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .onePart {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 2.1354rem;
        height: 2.7083rem;
      }

      .value {
        font-size: 1.25rem;
        color: #fff;
        margin: .5208rem 0;

        span {
          font-size: .7292rem;
          color: gray
        }
      }

      .label {
        font-size: .8333rem;
        color: #fff;

      }
    }
  }
}

.alarmList {
  grid-area: alarmList;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    .table {
      // margin: 1.5625rem 1.1458rem .7813rem 1.1458rem;
      width: calc(100%);
    }
  }
}

.realPower {
  grid-area: realPower;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    width: 100%;
    height: calc(100% - 2.5521rem);
  }
}

.benefitStatic {
  grid-area: benefitStatic;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    width: 100%;
    height: calc(100% - 2.5521rem);
  }
}

.deviceRunStatus {
  grid-area: deviceRunStatus;
  border: 1px solid #303F4E;
  border-top: 0px solid #2BDECD;
  border-radius: .625rem
    /* 12/19.2 */
  ;

  .content {
    width: 100%;
    height: calc(100% - 2.5521rem);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .onePart {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 2.1354rem;
        height: 2.7083rem;
        margin: .5208rem 0;

      }

      .value {
        font-size: 1.25rem;
        color: #fff;
      }

      .label {
        font-size: .8333rem;
        color: #fff;

      }
    }
  }
}
</style>