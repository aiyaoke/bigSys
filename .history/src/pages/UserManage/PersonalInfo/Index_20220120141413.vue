<template>
  <div class="personalInfo">
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
      <el-tab-pane :label="$translate('基础信息')" name="first"
        ><BaseInfo
      /></el-tab-pane>
      <el-tab-pane :label="$translate('修改密码')" name="second"
        ><ModifyPwd
      /></el-tab-pane>
      <el-tab-pane :label="$translate('消息推送')" name="third"  v-if="userType >= 3"
        ><MessagePush
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "PersonalInfo",
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    BaseInfo: _ => import("./components/BaseInfo"),
    ModifyPwd: _ => import("./components/ModifyPwd"),
    MessagePush: _ => import("./components/MessagePush"),
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.personalInfo {
  width: 60% !important;
  padding: 40px;
  box-sizing: border-box;
  @include bg-color("2");
  height: calc(100vh - 200px);
}
</style>
