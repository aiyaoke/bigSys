<template>
  <div class="personalInfo">
     <div>123</div>
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
    Recharge: _ => import("./components/Recharge")
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
