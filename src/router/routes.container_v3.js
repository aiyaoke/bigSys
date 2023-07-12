export default [{
    path: "/",
    redirect: "/containerIndex/equipment/overview",
    component: _ =>
        import( "@/pages/Index/Layout"),
    children: [
        {
            path: "/containerIndex/equipment/overview",
            meta: {
                name: "概览",
                icon: "icon-chanpinzonglan"
            },
            component: _ =>
                import(
            "@/pages/equipmentOverview/equipmentLayout/index"
                )
        },
        {
            path: "/containerIndex/equipment/currentData",
            meta: {
                name: "实时数据",
                icon: "icon-jiance"
            },
            component: _ =>
                import(
                "@/pages/containerDetail/Index"
                ),
            redirect: "/containerIndex/equipmentOverview/PCS",
            children:[
                {
                    path: "/containerIndex/equipmentOverview/PCS",
                    meta: {
                        name: "PCS舱",
                    },
                    component: _ =>
                      import(
                         "@/pages/containerDetail/components/Pcs"
                      ),
                  },
                  {
                    path: "/containerIndex/equipmentOverview/Bms",
                    code: "T",
                    meta: {
                        name: "BMS舱",
                    },
                    component: _ =>
                      import(
                          /* webpackChunkName: "Overview" */ "@/pages/containerDetail/components/Bms"
                      ),
                  },
            ]
        },
        {
            path: "/containerIndex/statistiReport",
            component: _ => import("@/pages/StatistiReport/Index"),
            meta: {
                name: "统计报表",
                icon: "icon-baobiao"
            },
            redirect: "/containerIndex/electricityAnalysis/terminalMeter",
            children: [
                {
                    path: "/containerIndex/electricityAnalysis/terminalMeter",
                    code: "K",
                    meta: {
                        name: "终端计量"
                    },
                    component: _ => import("@/pages/ElectricityAnalysis/TerminalMeter")
                },
                {
                    path: "/containerIndex/electricityAnalysis/intervalData",
                    code: "K",
                    meta: {
                        name: "数据对比"
                    },
                    component: _ => import("@/pages/equipmentOverview/IntervalData")
                },
                {
                    path: "/containerIndex/electricityAnalysis/Report",
                    meta: {
                        name: "报表导出"
                    },
                    component: _ => import("@/pages/ElectricityAnalysis/Report")
                },
            ]
        },
        {
            path: "/containerIndex/electricityAnalysis",
            component: _ => import("@/pages/ElectricityAnalysis/ProfitStatistics"),
            meta: {
                name: "收益统计",
                icon: "icon-shouyi2"
            },
            redirect: "/containerIndex/electricityAnalysis/terminalMeter",
            children: [
                {
                    path: "/containerIndex/electricityAnalysis/profitStatistics",
                    meta: {
                        name: "收益统计"
                    },
                    component: _ => import("@/pages/ElectricityAnalysis/ProfitStatistics")
                },
                {
                    path: "/containerIndex/electricityAnalysis/profitDetail",
                    meta: {
                        name: "收益明细"
                    },
                    component: _ => import("@/pages/ElectricityAnalysis/ProfitDetail")
                },

            ]
        },
        {
            path: "/containerIndex/alarm",
            component: _ => import("@/pages/Alarm"),
            meta: {
                name: "告警查询",
                icon: "icon-lingdang"
            },
            redirect: "/containerIndex/alarm/activeAlarm",
            children: [
                {
                    path: "/containerIndex/alarm/activeAlarm",
                    meta: {
                        name: "实时告警"
                    },
                    component: _ => import(
                        "@/pages/Alarm/AlarmSearch/components/ActiveAlarm"),
                },
                {
                    path: "/containerIndex/alarm/historyAlarm",
                    meta: {
                        name: "历史告警"
                    },
                    component: _ => import(
                        "@/pages/Alarm/AlarmSearch/components/HistoryAlarm")
                },
                {
                    path: "/containerIndex/alarm/rule",
                    code: "W",
                    meta: {
                        name: "报警规则"
                    },
                    component: _ =>
                        import(
                                "@/pages/Alarm/AlarmRule"
                        )
                }
            ]
        },
        {
            path: "/containerIndex/stationManage",
            component: _ => import("@/pages/StationManage/Index"),
            meta: {
              name: "场站设置",
              icon: "icon-shezhi"
            },
            redirect: "/containerIndex/stationManage/plantList",
            children: [
              {
                path: "/containerIndex/stationManage/plantList",
                code: "O",
                meta: {
                  name: "电站列表"
                },
                component: _ => import("@/pages/StationManage/PlantList")
              },
              {
                path: "/containerIndex/stationManage/deviceList",
                code: "P",
                meta: {
                  name: "设备列表"
                },
                component: _ => import("@/pages/StationManage/DeviceList")
              },
              {
                path: "/containerIndex/energyManage/timePrice",
                code: "R",
                meta: {
                  name: "时段电价"
                },
                component: _ => import("@/pages/EnergyManage/TimePrice")
              },
            ]
          },
        {
            path: "/containerIndex/userManage",
            component: _ => import("@/pages/UserManage/Index"),
            meta: {
              name: "用户管理",
              icon: "icon-geren"
            },
            redirect: "/containerIndex/userManage/personalInfo",
            children: [
              {
                path: "/containerIndex/userManage/personalInfo",
                code: "S",
                meta: {
                  name: "个人信息"
                },
                component: _ => import("@/pages/UserManage/PersonalInfo")
              },
              {
                path: "/containerIndex/userManage/addedService",
                code: "S",
                meta: {
                  name: "增值业务"
                },
                component: _ => import("@/pages/UserManage/AddedService")
              },
              {
                path: "/containerIndex/userManage/userList",
                code: "T",
                meta: {
                  name: "用户列表"
                },
                component: _ => import("@/pages/UserManage/UserList")
              }
            ]
          },
    ]
}]