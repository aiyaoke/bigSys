<template>
  <div class="main">
    <TransitionWrapper>
      <router-view />
    </TransitionWrapper>
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
    TransitionWrapper: (_) => import("@/components/TransitionWrapper"),
  },
};
</script>
<style lang="scss" scoped>
.main {
  height: 100vh;
  min-height: 100vh;
  margin-bottom: 20px;
  width: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  @include bg-color("1");
  padding: 20px;
  box-sizing: border-box;
  > div {
    margin: 0 auto;
  }
}
</style>