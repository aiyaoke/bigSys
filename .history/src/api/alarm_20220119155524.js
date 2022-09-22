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

export {
  apiGetActiveAlarm,
  apiGetHistoryAlarm,
  apiGetAlarmConfig,
  apiUpdateAlarmConfig,
  apiGetAppNowAlarmsWithPage,
  apiGetAlarmRules,
  apiGetAlarmTypes,
  apiUpdateAlarmRule,
  apiAddAlarmRule
};
