<template>
  <el-drawer
    title="我是标题"
    :visible.sync="flag"
    direction="rtl"
    :before-close="handleClose"
  >
    <span>我来啦!</span>
  </el-drawer>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      direction: "rtl"
    };
  },
  methods: {}
};
</script>
