<template>
  <div>
    <EquipmentLayout />
  </div>
</template>

<script>
import EquipmentLayout from "./components/equipmentLayout/index.vue";
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: device_getters,
  mapMutations: device_mutations,
  mapActions: device_actions,
} = createNamespacedHelpers("device");
export default {
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    ...device_actions(["getContainer"]),
  },
  created() {},
  mounted() {},
  components: { EquipmentLayout },
};
</script>
<style lang="scss" scoped>
</style>