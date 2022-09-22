import { apiGetAllDevices, apiGetDeviceCount, apiDevicePermissions,apiGetContainer } from "@/api/device";

const state = {
  devicesCount: 0,
  allDevices: [],
  currentDevice: {},
  devicePermissions: {},
  version: 1,
  container: {},
  PCS: [],
  BMC: [],
  BMS: [],
  SENSOR:[],
};

const mutations = {
  setAllDevices(state, value) {
    state.allDevices = value;
  },
  setCurrentDevice(state, value) {
    sessionStorage.setItem("currentDevice", JSON.stringify(value));
    state.currentDevice = value;
  },
  setDevicesCount(state, value) {
    state.devicesCount = value;
  },
  setDevicePermissions(state, value) {
    state.devicePermissions = value;
  },
  setVersion(state, value) {
    state.version = value;
  },
  setContainer(state, value) { 
    state.container= value;
  },
  setPcs(state, value) { 
    state.PCS = value;
  },
  setEmc(state, value) { 
    state.EMC = value;
  },
  setEms(state, value) { 
    state.EMS = value;
  },
  setSensor(state, value) { 
    state.SENSOR = value;
  }
};

const getters = {
  allDevices: state => state.allDevices,
  currentDevice: state => state.currentDevice,
  devicesCount: state => state.devicesCount,
  devicePermissions: state => state.devicePermissions,
  version: state => state.version,
  container: state => state.container,  
  PCS: state => state.PCS,
  EMC: state => state.EMC, 
  EMS: state => state.EMS,
  SENSOR: state => state.SENSOR,
};

const actions = {
  async getAllDevices({ commit }, requestData) {
    let { data,version } = await apiGetAllDevices(requestData);
    // data = JSON.parse(data || "[]"); 
    console.log(version);
    commit("setAllDevices", data);
    commit("setVersion", version);
  },
  async getDevicesCount({ commit }) {
    let { data } = await apiGetDeviceCount();
    data = JSON.parse(data || "[]");
    commit("setDevicesCount", data.length);
  },
  async getDevicePermissions({ commit }, requestData) {
    if (requestData.type == 0) return commit("setDevicePermissions", {});
    let { data } = await apiDevicePermissions(requestData)
    if (data) {
      let { modules } = JSON.parse(data)
      console.log(modules);
      let permissions = {}
      modules.forEach(item => {
        permissions[item.code] = item.show
        permissions[item.code + '-' + item.name] = item.show
        if (item.subModules) {
          item.subModules.forEach(uu => {
            permissions[uu.code] = uu.show
            permissions[uu.code + '-' + uu.name] = uu.show
          })
        }
      });
      commit("setDevicePermissions", permissions);
    } else {
      commit("setDevicePermissions", {});
    }
  },
  async getContainer({ commit }, requestData) {
    let { data } = await apiGetContainer(requestData);
    let [{PCS}, {BMS}, {BMC}, {SENSOR}] = data;
    commit("setContainer", data);
    commit("PCS", PCS);
    commit("BMS", BMS);
    commit("BMC", BMC);
    commit("SENSOR", SENSOR);


  },

};

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions
};
