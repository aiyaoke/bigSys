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
      this.creatQrCode(res.co);
      console.log(res);
    },
    creatQrCode(text) {
      new QRCode(this.$refs.qrCodeUrl, {
        text , // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    }
  }
};
</script>
