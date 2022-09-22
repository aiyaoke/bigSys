<template>
  <div>
    <el-container>
      <Header />
      <Main />
    </el-container>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
  components: {
    Header: (_) => import("./components/Header"),
    Main: (_) => import("./components/Main"),
  },
};
</script>
<style lang="scss" scoped>
</style>