<template>
  <div>
    <div>告警微信通知</div>
    <div></div>
  </div>
</template>

<script>
import { apiGetAlarmNoticeCode, apiCheckBindStatus } from "@/api/user";

export default {
  data() {
    return {};
  },
  mounted() {
    this.checkBindStatus();
    this.getCode();
  },
  methods: {
    async checkBindStatus() {
      let res = await apiCheckBindStatus();
      console.lg(res);
    },
    async getCode() {
      let res = await apiGetAlarmNoticeCode();
      console.lg(res);
    }
  }
};
</script>

<style lang="scss" scoped></style>
