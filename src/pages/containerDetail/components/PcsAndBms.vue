<template>
    <div class="Pcs">
      <!-- <span>请选择设备舱:</span> -->
      <el-select v-model="defaultOption" placeholder="请选择设备舱" size="mini" @change="changeEvent">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <template v-for="item in tabData ">
          <el-tab-pane :label="$translate(item.label)" :name="item.name"></el-tab-pane>
        </template>
      </el-tabs>
      <component 
        :is="isComponent" 
        v-loading="loading" 
        :type="dataType"
        :containerId="defaultOption" 
        element-loading-background="rgba(0, 0, 0, 0.8)">
      </component>
    </div>
  </template>
  
  <script>
  import { createNamespacedHelpers } from "vuex";
  
  const {
    mapGetters: device_getters,
    mapMutations: device_mutations,
    mapActions: device_actions,
  } = createNamespacedHelpers("device");
  export default {
    props: {},
    data() {
      return {
        formatComponents: {},
        tabData: [
          {
            label: '总览',
            name: "Battery",
          },
          {
            label: 'BMS数据',
            name: 'BmsData'
          },
          {
            label: 'BMC数据',
            name: 'BmcData'
          },
          {
            label: 'PCS数据',
            name: 'PcsData'
          },
          {
            label: '储能检测',
            name: "EnergyMonitor",
          },
          {
            label: '电池监测',
            name: "BatteryOverview",
          },
          {
            label: '电芯详情',
            name: "BatteryCluster",
          },
          {
            label: '电池最大压差',
            name: "MaxPressure",
          },
          {
            label: '温差曲线',
            name: "TempCurve",
          },
          {
            label: '压差曲线',
            name: "VolCurve",
  
          },
          {
            label: '告警',
            name: "Alarm",
          },
          {
            label: '视屏监控',
            name: "VideoMonitor",
          },
        ],
        activeName: "PcsAndBms",
        componentsList: {
          PcsAndBms: "PcsAndBms",
          BatteryOverview: "BatteryOverview",
          BatteryCluster: "BatteryCluster",
          MaxPressure: "MaxPressure",
          TempCurve: "TempCurve",
          VolCurve: "VolCurve",
          EnergyMonitor: "EnergyMonitor",
          VideoMonitor: "VideoMonitor",
          Alarm: "Alarm",
          BmsData: "BmsData",
          BmcData: "BmcData",
          EnergyMonitor: "EnergyMonitor",
          PcsData: "PcsData"

        },
        defaultOption: "",
        options: [],
        loading: true
      };
    },
    watch: {},
    computed: {
      ...device_getters(["BMS", "PCS", "allDevices"]),
      isComponent() {
        return this.componentsList[this.activeName];
      },
      dataType(){
        if(this.activeName==="BmsData"){
          return "BMS"
        }
        if(this.activeName==="BmcData"){
          return "BMC"
        }
        return "PCS"
      }
    },
    methods: {
      ...device_actions(["getContainer"]),
      handleClick(tab, event) {
      },
      getOptionList() {
        let i=1;
        this.allDevices.map((item, index) => {
          if (item.type === 3) {
            this.options.push({
              label: `${ i++}#${this.$translate("混合舱")}`,
              value: item.id
            })
          }
        });
        this.defaultOption = this.options[0].value;
        this.getContainer({
          containerId: sessionStorage.getItem("containerId")
        }).then(() => {
          this.loading = false;
        })
      },
      changeEvent() {
        sessionStorage.setItem("containerId", this.defaultOption);
        this.getContainer({
          containerId: sessionStorage.getItem("containerId"),
        }).then(() => {
          this.loading = false;
        })
      }
    },
    created() {
        this.getOptionList();
        this.changeEvent();
    },
    mounted() {
        this.changeEvent();
        this.timer = setInterval(() => {
          // this.getTableData();
          this.getContainer({
            containerId: sessionStorage.getItem("containerId"),
          })
        }, 24000);
        console.log(this.allDevices,this.PCS,111111111);
    },
    components: {
      BatteryOverview: (_) => import("@/pages/EnergyManage/BatteryOverview"),
      BatteryCluster: (_) => import("@/pages/EnergyManage/BatteryCluster"),
      MaxPressure: (_) => import("@/pages/StatistiReport/MaxPressure"),
      TempCurve: (_) => import("@/pages/StatistiReport/TempCurve"),
      VolCurve: (_) => import("@/pages/StatistiReport/VolCurve"),
      EnergyMonitor: (_) => import("@/pages/EnergyManage/EnergyMonitor"),
      VideoMonitor: (_) => import("@/pages/VideoMonitor"),
      Alarm: (_) => import("@/pages/Alarm/AlarmSearch/components/ActiveAlarm"),
      PcsAndBms: (_) => import("@/pages/containerDetail/BatteryAndPcs"),
      BmsData: (_) => import("./Data"),
      BmcData: (_) => import("./Data"),
      PcsData: (_) => import("./Data")

    },
    destroyed() {
      clearInterval(this.timer);
    }
  };
  </script>
  <style lang="scss" scoped>
  .el-tabs__item.is-active {
    color: #3af3a7 !important;
  }
  
  .el-tabs {
    margin-left: 8px;
  
  }
  
  .el-tabs__nav {
    // border: 1px solid  $bg-color2;
  }
  
  .Pcs {
    width: 100%;
    height: 100%;
  
    >>>.el-tabs {
      .el-tabs__nav-wrap::after {
        width: 100%;
      }
    }
  }
  </style>
  
  