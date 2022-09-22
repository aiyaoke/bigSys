<template>
  <div class="equipmentWrapper">
    <BoxDevices :all="all" class="BoxDevices" />
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
    return {
      all: [
        {
          name: "1#",
        },
        {
          name: "2#",
        },
        {
          name: "3#",
        },
        {
          name: "4#",
        },
        {
          name: "5#",
        },
        {
          name: "6#",
        },
        {
          name: "7#",
        },
        {
          name: "8#",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...device_actions(["getContainer"]),
  },
  created() {},
  mounted() {},
  components: {
    BoxDevices: () => import("./Container.vue"),
  },
};
</script>
<style lang="scss" scoped>
.equipmentWrapper {
  width: 100%;
  height: 100vh;
  min-height: 450px;
  max-height: 800px;
  @include bg-color("2");
  padding: 30px 0;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  .BoxDevices {
    width: 50%;
  }
}
</style>