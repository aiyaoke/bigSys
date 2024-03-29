import HttpRequest from "@/common/request";

const axios = new HttpRequest();

// const apiGetAppNowAlarmsWithPage = params =>
//   axios.request({ url: "/sermatec-energy/getAppNowAlarmsWithPage", method: "get", params });

const apiGetAppNowAlarmsWithPage = params =>
  axios.request({ url: "/sermatec-energy/getNowAlarmsByDtuIdWithPage", method: "get", params });

const apiGetActiveAlarm = params =>
  axios.request({ url: "/sermatec-energy/getNowAlarmsByDtuIdWithPage", method: "get", params });

const apiGetHistoryAlarm = params =>
  axios.request({ url: "/sermatec-energy/getHistoryAlarmsByDtuIdWithPage", method: "get", params });

const apiGetAlarmConfig = _ =>
  axios.request({ url: "/sermatec-energy/alarmType/getAlarmTypeInfos", method: "get", });

const apiUpdateAlarmConfig = data =>
  axios.request({ url: "/sermatec-energy/alarmType/updateAlarmTypeInfos", method: "post", data });

const apiGetAlarmRules = () =>
  axios.request({ url: "/sermatec-energy/getAllAlarmRules", method: "get", });

const apiGetAlarmTypes = () =>
  axios.request({ url: "/sermatec-energy/fetchAllMinSysDesc", method: "get" });


const apiUpdateAlarmRule = data =>
  axios.request({
    url: "/sermatec-energy/updateAlarmRule",
    method: "post",
    data,
  });

const apiAddAlarmRule = data =>
  axios.request({ url: "/sermatec-energy/addAlarmRule", method: "post", data });

const apiDeleteAlarmRule = params =>
  axios.request({
    url: "/sermatec-energy/deleteAlarmRule",
    method: "get",
    params,
  });
// 集装箱报警
const apiGetAlarmsByContainerIdWithPage = params =>
  axios.request({
    url: "/energy/getAlarmsByContainerIdWithPage",
    methods: "get",
    params
  });
  // 集装箱实时报警
const apiGetNowAlarmsByContainerIdWithPage = params =>
axios.request({
  url: "/energy/getNowAlarmsByContainerIdWithPage",
  methods: "get",
  params
});
  // 电站实时报警
  const apiGetNowAlarmsByPlantIdWithPage = params =>
  axios.request({
    url: "/energy/getNowAlarmsByPlantIdWithPage",
    methods: "get",
    params
  });
    // 电站历史报警
const apiGetHistoryAlarmsByPlantIdWithPage = data =>
axios.request({
  url: "/energy/getHistoryAlarmsByPlantIdWithPage",
  method: "post",
  data
});

 // 根据告警等级获取告警类型
 const apiFetchBigAlarmTypeByDtu = params =>
 axios.request({
   url: "/energy/big/fetchBigAlarmTypeByDtu",
   methods: "get",
   params
 });

 const apiNewGetAlarmRules = () =>
  axios.request({ url: "/energy/big/fetchBigAlarms", method: "get", });

const apiNewAddAlarmRule = data =>
  axios.request({ url: "/energy/big/addListAlarmRule", method: "post", data });

export {
  apiGetHistoryAlarmsByPlantIdWithPage,
  apiGetNowAlarmsByPlantIdWithPage,
  apiGetNowAlarmsByContainerIdWithPage,
  apiGetAlarmsByContainerIdWithPage,
  apiGetActiveAlarm,
  apiGetHistoryAlarm,
  apiGetAlarmConfig,
  apiUpdateAlarmConfig,
  apiGetAppNowAlarmsWithPage,
  apiGetAlarmRules,
  apiGetAlarmTypes,
  apiUpdateAlarmRule,
  apiAddAlarmRule,
  apiDeleteAlarmRule,
  apiFetchBigAlarmTypeByDtu,
  apiNewGetAlarmRules,
  apiNewAddAlarmRule
};
