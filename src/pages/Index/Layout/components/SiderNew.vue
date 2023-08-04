<template>
  <div class="sider">
    <div class="logoTitle" :style="{ 'opacity': !toggleSideBar ? '1' : '0' }">
      <Brand />
    </div>
    <el-menu :default-active="activePathFn" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="toggleSideBar" :collapse-transition=true :text-color="menuStyle.menuTextColor"
      :active-text-color="colorful.colorful_1" :background-color="menuStyle.menuBg" @select="handleSelect">
      <el-menu-item key="/containerIndex" index="/containerIndex">
        <i :class="'iconfont ' + 'icon-shouye'"></i>
        <span slot="title">{{ $translate("首页") }}</span></el-menu-item>
      <template v-for="(item, index) in routes">
        <el-menu-item :key="item.path" :index="item.path" v-if="!item.children">
          <i :class="'iconfont ' + item.meta.icon"></i>
          <span slot="title">{{ $translate(item.meta.name) }}</span>
        </el-menu-item>
        <el-submenu :index="item.path" v-if="item.children" :key="item.path">
          <template slot="title">
            <i :class="'iconfont ' + item.meta.icon"></i>
            <span>{{ $translate(item.meta.name) }}</span>
          </template>
          <template v-for="(uu, i) in item.children">
            <el-menu-item :key="uu.path + i" :index="uu.path" v-if="devicePermissions[uu.code] === undefined ||
              devicePermissions[uu.code]
              ">{{ $translate(uu.meta.name) }}</el-menu-item>
          </template>

        </el-submenu>

      </template>
    </el-menu>
  </div>
</template>
    
<script>

import { createNamespacedHelpers } from "vuex";
import { redirectPath, deepClone } from "@/common/utils";
import colorful from "@/assets/styles/config.scss";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const { mapMutations: app_mutations, mapGetters: app_getters } =
  createNamespacedHelpers("app");
const { mapGetters: device_getters, mapActions: device_actions } =
  createNamespacedHelpers("device");

export default {
  name: "Sider",
  data() {
    return {
      routes: [],
      bothBP: [],

    };
  },
  computed: {
    ...app_getters(["toggleSideBar", "systemTheme"]),
    ...device_getters(["devicesCount", "devicePermissions", "version", "container", "allDevices"]),
    colorful() {
      return colorful;
    },
    menuStyle() {
      let lightTheme = {
        menuTextColor: "#000",
        menuBg: "#fff",
      };
      let blackTheme = {
        menuTextColor: "#fff",
        menuBg: "#212223",
      };
      let greenTheme = {
        menuTextColor: "#fff",
        menuBg: "#1c2a39",
      };
      let _themeNav = {
        light: lightTheme,
        black: blackTheme,
        green: greenTheme,
      };
      return _themeNav[this.systemTheme];
    },
    activePathFn() {
      return this.$route.path;
    },
  },
  components: {
    Brand: (_) => import("@/components/Brand"),

  },
  mounted() {
    this.initRoutes();
  },
  methods: {
    ...app_mutations(["set_toggleSideBar"]),
    ...device_actions(['getContainer', 'getTableData']),
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    initRoutes() {
      this.routes = deepClone(this.$router.options.routes[4].children);
      let a = this.allDevices.find(it => it.type === 1) ? true : false;
      let b = this.allDevices.find(it => it.type === 2) ? true : false;
      let c = this.allDevices.find(it => it.type === 3) ? true : false;
      if (a === false) {
        this.routes[1].children.splice(0, 1)
      }
      if (b === false) {
        this.routes[1].children.splice(this.routes[1].children.findIndex(it => it.meta.name === "BMS舱"), 1)
      }
      if (c === false) {
        this.routes[1].children.splice(this.routes[1].children.findIndex(it => it.meta.name === "混合舱"), 1)
      }
      console.log(this.routes[1].children.findIndex(it => it.meta.name === "混合舱"));

    },
    handleSelect(key) {
      this.$router.push(key)
    },
  },
  watch: {
    $route(to, from) {
    }
  },
};
</script>
<style lang="scss" scoped>
.el-menu {
  border-right: none !important;
  height: 100%;

  .el-menu-item,
  .el-submenu {
    text-align: left;

    span {
      display: inline-block;
      width: 56px;
      margin-left: 6px;
    }

  }

}

.el-submenu /deep/ .el-submenu__title,
.el-menu-item {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}

.is-active {
  color: #3af3a7 !important;
}

.iconfont {
  font-size: 26px;
}

.logoTitle {
  width: 100%;
  height: 100px;
  @include dis-flex(center, center, row);
  transition: opacity 0.5s;

}
</style>
    