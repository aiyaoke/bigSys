<template>
  <el-dialog
    :title="$translate('充值')"
    :visible.sync="flag"
    width="30%"
    :before-close="handleCancle"
  >
    <el-select v-model="deviceId">
      <el-option
        v-for="item in adminUserList"
        :key="item.f0102_Id"
        :label="item.name"
        :value="item.f0102_Id"
      >
      </el-option>
    </el-select>
  </el-dialog>
</template>

<script>
import { accountSatus, roleType } from "@/common/config";
import { apiAddUser } from "@/api/user";
import { showMessage, getAccountSatus } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
export default {
  name: "AddUser",
  data() {
    return {
      flag: false,
      deviceList:[]
      deviceId: ""
    };
  },
  props: {
    adminUserList: {
      type: Array,
      default: _ => []
    },
    visible: {
      type: Object,
      default: _ => {}
    }
  },
  mounted() {},
  methods: {
    handleCancle() {
      this.$emit("update:visible", false);
    }
  },
  watch: {
    visible(newValue) {
      this.flag = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
