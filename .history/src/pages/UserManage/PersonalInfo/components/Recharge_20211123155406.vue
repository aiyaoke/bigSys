<template>
  <div>
       <el-input
                type="password"
                v-model="formData.oldPassword"
                autocomplete="off"
                show-password
            ></el-input>
  </div>
</template>

<script>
export default {
  name: "Recharge"
};
</script>
