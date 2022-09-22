<template>
    <div class="header dark-box">
        <!-- <div class="companyInfo">
      <img :src="userInfo.url" alt="" />
      <span>{{ $translate("上海采日能源科技有限公司") }} </span>
    </div> -->
        <span class="system-name">{{ $translate("云平台监控系统") }}</span>
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
            >
                <i
                    class="iconfont icon-tuichudenglu signOut"
                    @click="signOut"
                ></i>
            </el-tooltip>
        </div>
        <ChangeTheme />
    </div>
</template>

<script>
import { redirectPath } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
import colorful from "@/assets/styles/config.scss";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
const { mapGetters: device_getters, mapActions: device_actions } =
    createNamespacedHelpers("device");
const { mapMutations: app_mutations } = createNamespacedHelpers("app");
export default {
    name: "Header",
    methods: {
        ...device_actions(["getDevicesCount"]),
        ...app_mutations(["set_themeVisible"]),
        signOut() {
            redirectPath("/");
        },
        changeTheme() {
            this.set_themeVisible(true);
        },
    },
    computed: {
        ...user_getters(["userInfo"]),
        ...plant_getters(["allPlants"]),
        ...device_getters(["devicesCount"]),
        colorful() {
            return colorful;
        },
    },
    components: {
        ChangeTheme: (_) => import("@/components/ChangeTheme"),
    },
    mounted() {
        this.getDevicesCount();
    },
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
    }
}
</style>
