<template>
  <el-drawer
    title="我是标题"
    :visible.sync="flag"
    direction="rtl"
    @close="close"
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
        visible:false,
      direction: "rtl"
    };
  },
  methods: {
    close() {
      console.log(9);
      this.$emit("close");
    }
  },
  watch:{
      flag(newVal){
this.visible = newVal
      }
  }
};
</script>
