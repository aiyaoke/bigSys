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
      label-width="120px"
      :model="formLabelAlign"
    >
      <el-form-item label="名称">
        <el-select v-model="almTypeId" placeholder="请选择">
          <el-option
            v-for="item in typesArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.initNum"></el-input>
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
      direction: "rtl",
      typesArr: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      formLabelAlign: {
        almTypeId: "",
        initNum: "",
        type: ""
      }
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
