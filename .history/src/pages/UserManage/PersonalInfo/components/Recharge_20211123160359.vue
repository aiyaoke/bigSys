<template>
  <div>
    <el-button type="primary" size="small" @click="handleRecharge">{{
      $translate("充值")
    }}</el-button>
  </div>
</template>

<script>
import { apiGetQRCode } from "@/api/user";
import QRCode from 'qrcodejs2'
export default {
  name: "Recharge",
  da
  methods: {
    async handleRecharge() {
      let res = await apiGetQRCode();
      
      console.log(res);
    }
  }
};
</script>
