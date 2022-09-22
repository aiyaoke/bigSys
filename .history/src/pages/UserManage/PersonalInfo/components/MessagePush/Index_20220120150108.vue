<template>
  <div>
    <div>
      <div class="title">扫码关注告警微信通知</div>
      <div v-if="!isBinding" class="qrcode" id="qrcode" ref="qrCode"></div>
      <div v-else ><el-button type="text">您已绑定</el-button></div>
    </div>
  </div>
</template>

<script>
import { apiGetAlarmNoticeCode, apiCheckBindStatus, apiSend } from "@/api/user";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      isBinding: false
    };
  },
  mounted() {
    this.checkBindStatus();
  },
  methods: {
    send() {
      apiSend();
    },
    async checkBindStatus() {
      let res = await apiCheckBindStatus();
      if (!res.binding) {
        this.getCode();
        this.isBinding = false;
      } else {
        this.isBinding = true;
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
.title {
  margin-bottom: 10px;
}
</style>
