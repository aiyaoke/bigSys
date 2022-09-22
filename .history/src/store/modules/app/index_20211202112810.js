var jsSrc =(navigator.language || navigator.browserLanguage).toLowerCase();
      if(jsSrc.indexOf('zh')>=0)
      {
        // 假如浏览器语言是中文
      }
      else if(jsSrc.indexOf('en')>=0)
      {
          // 假如浏览器语言是英文
      }
      else
      {
        // 假如浏览器语言是其它语言
      }

const state = {
  locale: "en",
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
