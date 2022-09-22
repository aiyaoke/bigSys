<template>
  <div>
    <el-button type="primary" size="small" @click="handleRecharge">{{
      $translate("充值")
    }}</el-button>
    <div v-if="obj.out_trade_no">订单号：{{ obj.out_trade_no }}</div>
    <div class="qrcode" ref="qrCodeUrl"></div>
    <el-button
      v-if="obj.out_trade_no"
      type="primary"
      size="small"
      @click="hadRecharge"
      >我已充值</el-button
    >
  </div>
</template>

<script>
import { apiGetQRCode, apiGetPayResult } from "@/api/user";
import QRCode from "qrcodejs2";
export default {
  name: "Recharge",
  data() {
    return {
      obj: {}
    };
  },

  methods: {
    async handleRecharge() {
      let res = await apiGetQRCode();
      this.obj = res;
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
    },
    hadRecharge(){
      let data = await apiGetPayResult({ outTradeNo: res.out_trade_no });
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.qrcode {
  display: flex;
  justify-content: center;
}
</style>
