<template>
  <el-drawer
    title="我是标题"
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
        <el-select v-model="formData.userIds" placeholder="请选择">
          <el-option
            v-for="item in typesArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script>
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
  methods: {
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
    }
  },
  watch: {
    flag(newVal) {
      this.visible = newVal;
    }
  }
};
</script>
