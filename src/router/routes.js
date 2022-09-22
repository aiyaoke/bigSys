import Vue from 'vue'
import Router from 'vue-router'
import containerRoutes from './routes.container'
Vue.use(Router)

/* 解决点击多次点击同一导航报错问题  */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
    {
        path: "/",
        redirect: "/authorization",
        hidden: true
    },
    {
        path: "/authorization",
        component: _ => import(/* webpackChunkName: "authorization" */"@/pages/Authorization"),
        hidden: true
    },
    {
        path: "/workOrder",
        component: _ => import(/* webpackChunkName: "workOrder" */"@/pages/workOrder"),
        hidden: true
    },
    {
        path: "/containerIndex",
        component: _ =>
            import(/* webpackChunkName: "Layout" */ "@/pages/Index/Layout"),
        children: [
            {
                path: "/containerIndex",
                component: _ =>
                  import(
                    /* webpackChunkName: "Container" */ "@/pages/Index"
                    ),
                   
            },
            {
                path: "/containerIndex/equipmentOverview",
                // code: "A",
                meta: {
                  name: "设备舱总览",
                  icon: "icon-chanpinzonglan"
                },
                component: _ =>
                  import(
                    /* webpackChunkName: "Overview" */ "@/pages/equipmentOverview"
                    ),
            },
            {
                path: "/system/stationManage",
                component: _ => import("@/pages/StationManage/Index"),
                meta: {
                  name: "场站管理",
                  icon: "icon-shezhi"
                },
                redirect: "/system/stationManage/plantList",
                children: [
                  {
                    path: "/system/stationManage/plantList",
                    code: "O",
                    meta: {
                      name: "电站列表"
                    },
                    component: _ => import("@/pages/StationManage/PlantList")
                  },
                  {
                    path: "/system/stationManage/deviceList",
                    code: "P",
                    meta: {
                      name: "设备列表"
                    },
                    component: _ => import("@/pages/StationManage/DeviceList")
                  },
                ]
              },
            {
                path: "/system/userManage",
                component: _ => import("@/pages/UserManage/Index"),
                meta: {
                  name: "用户管理",
                  icon: "icon-geren"
                },
                redirect: "/system/userManage/personalInfo",
                children: [
                  {
                    path: "/system/userManage/personalInfo",
                    code: "S",
                    meta: {
                      name: "个人信息"
                    },
                    component: _ => import("@/pages/UserManage/PersonalInfo")
                  },
                  {
                    path: "/system/userManage/addedService",
                    code: "S",
                    meta: {
                      name: "增值业务"
                    },
                    component: _ => import("@/pages/UserManage/AddedService")
                  },
                  {
                    path: "/system/userManage/userList",
                    code: "T",
                    meta: {
                      name: "用户列表"
                    },
                    component: _ => import("@/pages/UserManage/UserList")
                  }
                ]
              },
            
        ]
    },
    ...containerRoutes,

    

]

export default new Router({
    routes,
    mode: 'history'
})

