<template>
  <div>
    <el-button type="primary" size="small" @click="handleRecharge">{{
      $translate("充值")
    }}</el-button>
  </div>
</template>

<script>
export default {
  name: "Recharge",
  methods: {
    handleRecharge() {}
  }
};
</script>
