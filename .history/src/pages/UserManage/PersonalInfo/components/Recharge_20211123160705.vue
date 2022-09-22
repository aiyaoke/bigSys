<template>
  <div>
    <div class="qrcode" ref="qrCodeUrl"></div>
    <el-button type="primary" size="small" @click="handleRecharge">{{
      $translate("充值")
    }}</el-button>
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

      console.log(res);
    },
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "xxxx", // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
};
</script>
