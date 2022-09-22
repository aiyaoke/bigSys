<template>
  <div class="header dark-box">
    <!-- <div class="companyInfo">
      <img :src="userInfo.url" alt="" />
      <span>{{ $translate("上海采日能源科技有限公司") }} </span>
    </div> -->
    <span class="system-name">{{ $translate("采日云平台监控系统") }}</span>
    <div class="end-wrapper">
      <div class="count">
        <div>
          <div class="value" :style="{ color: colorful.colorful_2 }">
            {{ allPlants.length }}
          </div>
          <div class="name">{{ $translate("电站总数") }}</div>
        </div>
        <div>
          <div class="value" :style="{ color: colorful.colorful_3 }">
            {{ devicesCount }}
          </div>
          <div class="name">{{ $translate("设备总数") }}</div>
        </div>
      </div>
      <el-menu
        :default-active="activePathFn"
        class="el-menu-demo"
        mode="horizontal"
        :text-color="menuStyle.menuTextColor"
        active-text-color="#3af3a7"
        :background-color="menuStyle.menuBg"
        @select="handleSelect"
      >
        <template v-for="item in routes">
          <el-submenu :index="item.path" v-if="item.children" :key="item.path">
            <template slot="title">
              <el-badge
                v-if="item.meta.icon === 'icon-lingdang' && activeAlarmCount"
                :value="activeAlarmCount"
                :max="99"
              >
                <i
                  :class="'iconfont ' + item.meta.icon"
                  :style="{
                    color: activeAlarmCount ? '#F56C6C' : '',
                  }"
                ></i>
              </el-badge>
              <i v-else :class="'iconfont ' + item.meta.icon"></i>
            </template>
            <template v-for="uu in item.children">
              <el-menu-item
                :key="uu.path"
                :index="uu.path"
                v-if="
                  devicePermissions[uu.code] === undefined ||
                  devicePermissions[uu.code]
                "
                >{{ $translate(uu.meta.name) }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
      </el-menu>
      <el-tooltip
        effect="dark"
        :content="$translate('切换主题')"
        placement="bottom"
      >
        <i class="iconfont icon-zhuti" @click="changeTheme"></i>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="$translate('退出登录')"
        placement="bottom"
        v-if="$route.path === '/containerIndex'"
      >
        <i class="iconfont icon-tuichudenglu signOut" @click="signOut"></i>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="$translate('返回') + $translate('首页')"
        placement="bottom"
        v-if="$route.path !== '/containerIndex'"
      >
        <i
          class="iconfont icon-fangzi signOut"
          @click="
            $router.push({
              path: '/containerIndex',
            })
          "
        ></i>
      </el-tooltip>
    </div>
    <ChangeTheme />
  </div>
</template>

<script>
import { redirectPath, deepClone } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
import colorful from "@/assets/styles/config.scss";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
const { mapGetters: device_getters, mapActions: device_actions } =
  createNamespacedHelpers("device");
const { mapMutations: app_mutations, mapGetters: app_getters } =
  createNamespacedHelpers("app");
export default {
  name: "Header",
  data() {
    return {
      routes: [],
    };
  },
  methods: {
    ...device_actions(["getDevicesCount"]),
    ...app_mutations(["set_themeVisible"]),
    signOut() {
      redirectPath("/");
    },
    changeTheme() {
      this.set_themeVisible(true);
    },
    handleSelect(key) {
      if (key === "/system/reset") {
        this.subscribe();
        this.goReset();
      } else {
        redirectPath(key);
      }
    },
    initRoutes() {
      this.routes = deepClone(this.$router.options.routes[3].children);
    },
  },
  computed: {
    ...user_getters(["userInfo", "activeAlarmCount"]),
    ...plant_getters(["allPlants"]),
    ...device_getters(["devicesCount", "devicePermissions"]),
    ...app_getters(["systemTheme"]),
    colorful() {
      return colorful;
    },
    menuStyle() {
      let lightTheme = {
        menuTextColor: "#999",
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
    ChangeTheme: (_) => import("@/components/ChangeTheme"),
  },
  mounted() {
    this.getDevicesCount();
    this.initRoutes();
    console.log(this.$router.options);
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
  @include dis-flex(space-between, center);
  .companyInfo {
    @include dis-flex(space-between, center);
    font-size: 16px;
    font-weight: bolder;
    img {
      width: 100px;
      height: 42px;
      margin-right: 20px;
    }
  }
  .system-name {
    font-size: 21px;
    font-weight: 600;
    white-space: nowrap;
    @include font-color("1");
  }
  .end-wrapper {
    @include dis-flex(center, center);
    .count {
      @include dis-flex();
      > div {
        margin-right: 30px;
        text-align: center;
        .value {
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 25px;
          font-family: DINCondensed-Bold;
        }
        .name {
          font-size: 12px;
        }
      }
    }
    i {
      font-size: 20px;
      cursor: pointer;
      &.signOut {
        margin-left: 20px;
      }
    }
    .el-menu {
      border-bottom: solid 1px #1c2a39;
    }
  }
}
</style>
