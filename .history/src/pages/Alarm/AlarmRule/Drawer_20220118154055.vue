<template>
  <el-drawer
    title="我是标题"
    :visible.sync="visible"
    direction="rtl"
    @close="close"
  >
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
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
      direction: "rtl"
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  watch: {
    flag(newVal) {
      this.visible = newVal;
    }
  }
};
</script>
