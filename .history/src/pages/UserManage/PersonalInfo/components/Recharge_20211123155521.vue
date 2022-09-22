<template>
  <div>
    <el-button type="primary" size="small" @click="handleRecharge">{{
      $translate("充值")
    }}</el-button>
  </div>
</template>

<script>
import {apiGetQRCode} from '@/api/user'
export default {
  name: "Recharge",
  methods: {
    handleRecharge() {
      apiGetQRCode()
    }
  }
};
</script>
