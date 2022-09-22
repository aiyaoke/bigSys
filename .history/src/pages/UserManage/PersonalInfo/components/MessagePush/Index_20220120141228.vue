<template>
  <div>
    <div>告警微信通知</div>
    <div class="qrcode" id="qrcode" ref="qrCode"></div>
  </div>
</template>

<script>
import { apiGetAlarmNoticeCode, apiCheckBindStatus } from "@/api/user";
import QRCode from "qrcodejs2";
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
      console.log(res);
    },
    async getCode() {
      let res = await apiGetAlarmNoticeCode();
      console.log(res);
      this.qrcode = new QRCode(this.$refs.qrCode, {
        text: res.data,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
