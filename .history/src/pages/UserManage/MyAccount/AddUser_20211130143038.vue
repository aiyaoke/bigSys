<template>
  <el-dialog
    :title="
      rechargeDialog.f0102_Id ? $translate('编辑用户') : $translate('添加用户')
    "
    :visible.sync="visible"
    width="30%"
    :before-close="handleCancle"
  >
    <el-select v-model="formData.parentId">
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
      visible: false,
     
    };
  },
  props: {
    adminUserList: {
      type: Array,
      default: _ => []
    },
    rechargeDialog: {
      type: Object,
      default: _ => {}
    }
  },
  mounted() {
    this.userType = this.userInfo.type;
  },
  methods: {
    handleCancle() {
      this.$emit("update:rechargeDialog", {});
      this.$refs.ruleForm.resetFields();
    },
    
  },
  computed: {
    ...user_getters(["userInfo"])
  },
  watch: {
    rechargeDialog(userObj) {
      this.visible = userObj.flag;
      if (userObj.f0102_Id) {
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = userObj[key];
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
