<template>
  <div class="containerIndex">
    <!-- <Test /> -->
    <div class="left-wrapper">
      <Left />
    </div>
    <div class="right-wrapper">
      <Map />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions: plant_actions } = createNamespacedHelpers("plant");
const { mapActions: device_actions } = createNamespacedHelpers("device");
export default {
  name: "ContainerIndex",
  components: {
    Header: (_) => import("./components/Header"),
    Map: (_) => import("./components/Map"),
    Right: (_) => import("./components/Right"),
    Left: (_) => import("./components/Left"),
    Footer: (_) => import("@/components/Footer"),
    // Test: (_) => import("./components/Test"),
  },
  mounted() {
    this.getDevicePermissions({ type: 0 });
    this.getAllPlants();
  },
  methods: {
    ...plant_actions(["getAllPlants"]),
    ...device_actions(["getDevicePermissions"]),
  },
};
</script>

<style lang="scss" scoped>
.containerIndex {
  height: 100vh;
  position: relative;
  @include bg-color("1");
  // padding: 20px;
  box-sizing: border-box;
  display: flex;

  > div {
    height: 100%;
  }

  .left-wrapper {
    width: 20%;
    margin-right: 20px;
  }

  .right-wrapper {
    flex: 1;
  }
}
</style>
