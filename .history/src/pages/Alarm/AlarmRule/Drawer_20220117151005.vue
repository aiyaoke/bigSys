<template>
  <el-drawer
    title="我是标题"
    :visible.sync="flag"
    direction="rtl"
    :before-close="close"
  >
    <span>我来啦!</span>
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
      direction: "rtl"
    };
  },
  methods: {
      close(){
          this.$emit('close')
      }
  }
};
</script>
