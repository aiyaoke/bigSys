console.log((navigator.language || navigator.browserLanguage).toLowerCase())
const state = {
  locale: (navigator.language || navigator.browserLanguage).toLowerCase() == 'zh' ? 'zh' : "en",
  axiosInstanceArry: [],
  systemTheme: "green",
  themeVisible: false,
  plantListVisible: false
};

const getters = {
  locale: state => state.locale,
  axiosInstanceArry: state => state.axiosInstanceArry,
  systemTheme: state => state.systemTheme,
  themeVisible: state => state.themeVisible,
  plantListVisible: state => state.plantListVisible
};

const mutations = {
  set_locale(state, locale) {
    state.locale = locale;
  },
  set_axiosInstanceArry(state, axiosInstanceArry) {
    state.axiosInstanceArry = axiosInstanceArry;
  },
  set_systemTheme(state, theme) {
    state.systemTheme = theme;
  },
  set_themeVisible(state, visible) {
    state.themeVisible = visible;
  },
  set_plantListVisible(state, flag) {
    state.plantListVisible = flag;
  }
};

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations
};
