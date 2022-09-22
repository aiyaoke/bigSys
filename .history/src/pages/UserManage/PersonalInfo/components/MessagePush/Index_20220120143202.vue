<template>
  <div>
    <div>
       <div class="title">告警微信通知</div>
    <div class="qrcode" id="qrcode" ref="qrCode"></div>
    </div>
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
  },
  methods: {
    async checkBindStatus() {
      let res = await apiCheckBindStatus();
      if (!res.binding) {
        this.getCode();
      }
    },
    async getCode() {
      let res = await apiGetAlarmNoticeCode();
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

<style lang="scss" scoped>
.title{
  margin-bottom: 10px;
}
</style>
