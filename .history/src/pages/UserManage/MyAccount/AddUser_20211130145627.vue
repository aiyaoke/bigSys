<template>
  <el-dialog
    :title="$translate('充值')"
    :visible.sync="flag"
    width="70%"
    :before-close="handleCancle"
    :show-close="false"
  >
    <div slot="title" class="header">
      <span class="rechargeText">充值</span>
      <span class="x">X</span>
    </div>

    <div class="item">
      <span class="label">充值设备：</span>
      <el-select v-model="deviceId" size="medium">
        <el-option
          v-for="item in deviceList"
          :key="item.f0102_Id"
          :label="item.name"
          :value="item.f0102_Id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="item">
      <span class="label">充值金额：</span>
    </div>
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
      flag: true,
      deviceList: [],
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
>>> .el-dialog__header {
  padding: 0;
}
.header {
  background: url("./header.jpg");
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .rechargeText {
    font-size: 22px;
    color: #d99900;
  }
  .x {
    color: #663d00;
    cursor: pointer;
  }
}
.el-select {
  width: 400px;
}
.item {
  display: flex;
  margin-bottom: 10px;
}
.label {
  display: inline-block;
  width: 150px;
  text-align: right;
  padding: 0 20px;
}
</style>
