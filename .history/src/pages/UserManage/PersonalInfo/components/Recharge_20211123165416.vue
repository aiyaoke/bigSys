<template>
  <div>
    <el-button
      type="primary"
      size="small"
      v-if="!obj.out_trade_no"
      @click="handleRecharge"
      >{{ $translate("充值") }}</el-button
    >
    <div v-if="obj.out_trade_no">订单号：{{ obj.out_trade_no }}</div>
    <div v-if="obj.out_trade_no">充值金额：{{ obj.amount.total }}</div>
    <div class="qrcode" id="qrcode" ref="qrCodeUrl"></div>
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
import { showMessage } from "@/common/utils";
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
      this.obj = {};
      let res = await apiGetQRCode();
      this.obj = res;
      this.creatQrCode(res.code_url);
      console.log(res);
    },
    creatQrCode(text) {
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(this.$refs.qrCodeUrl, {
        text,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    },
    async hadRecharge() {
      let flag = await apiGetPayResult({ outTradeNo: this.obj.out_trade_no });
      showMessage(flag ? "success" : "error", flag ? "您已充值" : "您未充值");
      flag && (this.obj = {});
      if (flag) {
        document.getElementById("qrcode").innerHTML = "";
        this.obj = {};
      }
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
