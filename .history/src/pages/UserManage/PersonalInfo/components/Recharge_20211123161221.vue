<template>
  <div>
    <el-button type="primary" size="small" @click="handleRecharge">{{
      $translate("充值")
    }}</el-button>
    <div class="qrcode" ref="qrCodeUrl"></div>
  </div>
</template>

<script>
import { apiGetQRCode } from "@/api/user";
import QRCode from "qrcodejs2";
export default {
  name: "Recharge",
  data() {
    return {};
  },

  methods: {
    async handleRecharge() {
      let res = await apiGetQRCode();
      this.creatQrCode(res.code_url);
      console.log(res);
    },
    creatQrCode(text) {
      new QRCode(this.$refs.qrCodeUrl, {
        text,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    }
  }
};
</script>


<style scoped>

</style>