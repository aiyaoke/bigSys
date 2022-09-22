<template>
  <div>
    <div class="box-card">
      <div class="card-title">
        <span>SOC</span>
        <span
          >SOH
          <span class="title-text">100</span>
        </span>
      </div>
      <div class="card-content">
        <span class="big-text">50%</span>
        <el-progress
          :percentage="50"
          color="#3af3a7"
          :show-text="false"
        ></el-progress>
        <div class="content-bottom">
          <div class="content-left">
            <p>堆累计充电电量</p>
            <p class="big-text">1000<span class="unit">KWH</span></p>
          </div>
          <div class="content-right">
            <p>堆累计放电电量</p>
            <p class="big-text">1000<span class="unit">KWH</span></p>
          </div>
        </div>
      </div>
    </div>
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
  components: {},
};
</script>
<style lang="scss" scoped>
.unit {
  color: $text-color;
  font-size: 14px;
  display: inline-block;
  margin-left: 10px;
}
.box-card {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .card-title:global(.card-title) {
    justify-content: space-between;
    .title-text {
      display: inline-block;
      width: 70px;
      font-size: 16px;
      color: #fff;
    }
  }
  .card-content {
    padding: 0 20px;
    font-weight: bolder;

    .big-text {
      font-size: 24px;
      display: inline-block;
      color: #fff;
      padding: 0 0 15px 0;
    }
    .content-bottom {
      width: 100%;
      height: 121px;
      // min-height: 100px;
      display: flex;
      .content-left,
      .content-right {
        box-sizing: border-box;
        padding: 10px;
        width: 50%;
        height: 100%;
        margin-top: 10px;
        // background-color: aquamarine;

        @include dis-flex(center, center);
      }
    }
  }
}
</style>