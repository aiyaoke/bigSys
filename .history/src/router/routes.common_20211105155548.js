export default [
  {
    path: "/system/alarm",
    component: _ =>
      import(/* webpackChunkName: "Alarm" */ "@/pages/common/Alarm"),
    meta: {
      name: "报警",
      icon: "icon-lingdang"
    },
    redirect: "/system/alarm/search",
    children: [
      {
        path: "/system/alarm/search",
        code: 'U',
        meta: {
          name: "报警查询"
        },
        component: _ =>
          import(
            /* webpackChunkName: "AlarmSearch" */ "@/pages/common/Alarm/AlarmSearch"
          )
      },
      {
        path: "/system/alarm/config",
        code: 'V',
        meta: {
          name: "报警配置"
        },
        component: _ =>
          import(
            /* webpackChunkName: "AlarmConfig" */ "@/pages/common/Alarm/AlarmConfig"
          )
      }
    ]
  }
];
