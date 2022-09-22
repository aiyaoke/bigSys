<template>
  <div class="battery-container">
    <div
      class="pack1"
      ref="pack1"
      :style="{
        '--padding-left': width * 0.7 + 'px',
      }"
    >
      <div
        class="batteryWrap"
        v-for="(item, index) in options"
        :ref="`wrap${index}`"
        :key="`wrap${index}`"
        @click="toCellDetails"
      >
        <Battery
          :options="{
            color: '#3af3a7',
            value: { soc: item.value.soc, current: item.value.current },
          }"
          class="battery"
          :style="{ '--width': height * 0.7 + 'px' }"
        />
        <svg class="svg" version="1.1">
          <path
            fill="none"
            stroke-width="3"
            stroke="red"
            stroke-dasharray="4"
            :d="batteryAnimatePath"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { redirectPath, deepClone } from "@/common/utils";

export default {
  props: ["options"],
  data() {
    let count = 0;
    let width = 0;
    let height = 0;
    let batteryAnimatePath = `M 13 50 H 200`;
    let packHeight = 0;
    return {
      count,
      width,
      height,
      batteryAnimatePath,
      packHeight,
    };
  },
  watch: {},
  computed: {},
  methods: {
    initBatteryAnimatePath() {
      let width = this.$refs.wrap0[0].offsetWidth;
      let height = this.$refs.wrap0[0].offsetHeight;
      this.batteryAnimatePath = `M 10 50 H ${height * (1 - width / height)}`;
    },
    toCellDetails() {
      console.log("111");
      this.$router.push("/system/energyManage/batteryCluster");
    },
  },
  created() {},
  mounted() {
    this.width = this.$refs.wrap0[0].offsetWidth;
    this.height = this.$refs.wrap0[0].offsetHeight;
    this.packHeight = this.$refs.pack1.offsetHeight;
    window.onresize = () => {
      this.initBatteryAnimatePath();
    };
  },
  components: {
    Battery: () =>
      import("@/pages/Overview/components/Graph/components/Battery.vue"),
    AnimatePath: () =>
      import("@/pages/Overview/components/Graph/components/AnimatePath"),
  },
};
</script>
<style lang="scss" scoped>
.battery-container {
  width: 100%;
  height: 50%;

  .pack1 {
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    padding-left: 2%;
    padding-right: 1%;
    box-sizing: content-box;
    border-bottom: 2px solid #37414e;
    border-right: 4px solid #37414e;
    .batteryWrap {
      max-width: 50px;
      width: 100%;
      height: 90%;
      transform-origin: left top;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-self: center;
      flex: 1;
      position: relative;
      .battery {
        transform: rotate(90deg);
        height: 20%;
        width: var(--width);
        cursor: pointer;
      }
    }
  }
}
.svg {
  width: 260%;
  height: 100px;
  position: absolute;
  top: 120px;
  // left: var(--left);
  transform: rotate(90deg);
}
</style>