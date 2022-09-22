<template>
  <div class="detailsWrapper">
    <div class="packGroup">
      <Battery :options="option" />
      <Battery :options="options" class="pack-bottom" ref="pack-bottom" />
    </div>
    <div class="packData">
      <div class="pack1Data" v-for="item in { item: 1, item2: 2 }">
        <div class="packPath"></div>
        <div class="packDetails">
          <CardInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: device_getters,
  mapMutations: device_mutations,
  mapActions: device_actions,
} = createNamespacedHelpers("device");
export default {
  props: {},
  data() {
    const option = [
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "50.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "100.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "31.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "30.00", current: "1440.00" },
      },

      {
        color: "#3af3a7",
        value: { soc: "18.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "30.00", current: "1440.00" },
      },

      {
        color: "#3af3a7",
        value: { soc: "18.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "30.00", current: "1440.00" },
      },

      {
        color: "#3af3a7",
        value: { soc: "18.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "50.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "100.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "31.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "30.00", current: "1440.00" },
      },

      {
        color: "#3af3a7",
        value: { soc: "18.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
    ];
    const options = [
      {
        color: "#3af3a7",
        value: { soc: "38.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "50.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "100.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "31.00", current: "1440.00" },
      },
      {
        color: "#3af3a7",
        value: { soc: "30.00", current: "1440.00" },
      },
    ];
    return {
      option,
      options,
    };
  },
  watch: {},
  computed: {
    ...device_getters(["allDevices", "version"]),
  },
  methods: {
    ...device_actions(["getContainer"]),
  },
  created() {
    this.getContainer({
      containerId: sessionStorage.getItem("containerId"),
    });
  },
  mounted() {},
  components: {
    Battery: () => import("../components/BatteryPack.vue"),
    BatteryVertical: () => import("../components/batteryCloum.vue"),
    CardInfo: () => import("../components/cardInfo.vue"),
  },
};
</script>
<style lang="scss" scoped>
.detailsWrapper {
  width: 100%;
  height: 100vh;
  min-height: 700px;
  max-height: 800px;
  @include bg-color("2");
  padding: 30px;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .packGroup {
    width: 70%;
    height: 70%;
    margin-right: 2.2%;
    .pack-bottom {
      transform: rotateX(180deg);
    }
  }
  .packData {
    width: 30%;
    height: 70%;
    .pack1Data {
      width: 100%;
      height: 50%;
      display: flex;
      padding-bottom: 5%;
      box-sizing: border-box;
    }
  }
  .packPath {
    width: 20%;
    height: 50%;
    border-bottom: 4px solid #37414e;
  }
  .packDetails {
    width: 100%;
    background-color: rgba($color: #37414e, $alpha: 0.3);
    border-radius: 10%;
  }
}
</style>