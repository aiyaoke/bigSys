<template>
  <el-dialog
    :title="
      rechargeDialog.f0102_Id ? $translate('编辑用户') : $translate('添加用户')
    "
    :visible.sync="visible"
    width="30%"
    :before-close="handleCancle"
  >
    <el-form
      :model="formData"
      size="medium"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$translate('角色')" prop="roleId">
        <el-select v-model="formData.roleId">
          <el-option
            v-for="item in roleType"
            :key="item.value"
            :label="$translate(item.label)"
            :value="item.value"
            :disabled="item.value === 3 && userType !== 4"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$translate('所属管理员')"
        prop="parentId"
        v-if="formData.roleId !== 3 && userType === 4"
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
      </el-form-item>
      <el-form-item :label="$translate('备注')" prop="desc">
        <el-input
          type="text"
          v-model="formData.desc"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleSure">{{
          $translate("确定")
        }}</el-button>
        <el-button size="small" @click="handleCancle">{{
          $translate("取消")
        }}</el-button>
      </el-form-item>
    </el-form>
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
      userType: 0,
      accountSatus,
      roleType,
      formData: {
        name: "",
        password: "",
        active: "",
        roleId: "",
        parentId: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$translate("请输入用户名"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$translate("请输入密码"),
            trigger: "blur"
          }
        ],
        active: [
          {
            required: true,
            message: this.$translate("请选择账号状态"),
            trigger: "blur"
          }
        ],
        roleId: [
          {
            required: true,
            message: this.$translate("请选择角色"),
            trigger: "blur"
          }
        ],
        parentId: [
          {
            required: true,
            message: this.$translate("请选择父级用户"),
            trigger: "blur"
          }
        ]
      }
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
    async handleSure() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return;
        let { roleId, parentId } = this.formData;
        let { f0102_Id } = this.rechargeDialog;
        this.formData = {
          ...this.formData,
          parentId: roleId === 3 ? 0 : parentId,
          f0102_Id: f0102_Id || 0
        };
        let { data } = await apiAddUser(this.formData);
        if (data) {
          showMessage(
            "success",
            f0102_Id ? this.$translate("编辑成功") : this.$translate("添加成功")
          );
          this.$emit("e_upDateAllUser");
          this.handleCancle();
        }
      });
    }
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
