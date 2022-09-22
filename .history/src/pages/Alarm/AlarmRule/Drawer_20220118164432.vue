<template>
  <el-drawer
    title="默认规则"
    :visible.sync="visible"
    direction="rtl"
    @close="close"
  >
    <el-form
      size="mini"
      label-position="right"
      label-width="150px"
      :model="formData"
      ref="ruleForm"
    >
      <el-form-item label="告警类型">
        <el-select v-model="formData.almTypeId" placeholder="请选择">
          <el-option
            v-for="item in typesArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每小时推送上限">
        <el-input v-model="formData.initNum"></el-input>
      </el-form-item>
      <el-form-item label="每日推送上限">
        <el-input v-model="formData.maxNum"></el-input>
      </el-form-item>
      <el-form-item label="推送方式">
        <el-checkbox-group v-model="formData.pushTypeIds">
          <el-checkbox label="邮件"></el-checkbox>
          <el-checkbox label="微信"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch
          v-model="formData.status"
          active-text="启用"
          inactive-text="禁用"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="接收人">
        <el-select v-model="formData.userIds" multiple placeholder="请选择">
          <el-option
            v-for="item in commonUsers"
            :key="item.f0102_Id"
            :value="item.f0102_Id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { apiGetAllCommonUser, apiGetAlarmTypes } from "@/api/user";
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      direction: "rtl",
      typesArr: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      commonUsers: [],
      formData: {
        almTypeId: "",
        initNum: "",
        maxNum: "",
        pushTypeIds: [],
        status: false,
        userIds: []
      }
    };
  },
  mounted() {
    this.getAllCommonUser();
    this.getAlarmTypes();
  },
  methods: {
    async getAllCommonUser() {
      let { data } = await apiGetAllCommonUser();
      this.commonUsers = JSON.parse(data || "[]");
      console.log(this.commonUsers);
    },
    async getAlarmTypes() {
      let { data } = await apiGetAlarmTypes();
      this.commonUsers = JSON.parse(data || "[]");
      console.log(this.commonUsers);
    },
    close() {
      this.$emit("close");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.close();
    }
  },
  watch: {
    flag(newVal) {
      this.visible = newVal;
    }
  }
};
</script>
