<template>
  <div>
    <transition mode="out-in">
      <div class="container">
        <template v-for="item in allDevices">
          <div class="device-item" @click="handleShowDetail(item)">
            <img :src="containerImg" alt="" />
            <span class="onLine" draggable>{{ `${item.id}# ` }}</span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import containerImg from "@/assets/images/box.png";
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: device_getters,
  mapMutations: device_mutations,
  mapActions: device_actions,
} = createNamespacedHelpers("device");
export default {
  props: ["all"],
  data() {
    return {
      containerImg,
    };
  },
  watch: {},
  computed: {
    ...device_getters(["allDevices", "version"]),
  },
  methods: {
    ...device_actions(["getContainer"]),
    handleShowDetail(item) {
      this.getContainer({
        containerId: item.id,
      });
      sessionStorage.setItem("containerId", item.id);
      this.$router.push({
        path: "/system/containerDetail",
        query: {
          Cabin: item.id,
        },
      });
    },
  },
  created() {},
  mounted() {},
  components: {},
};
</script>
<style lang="scss" scoped>
.onLine {
  color: $colorful-1 !important;
  font-size: 20px;
}
.container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 33% 33% 33%;
  // grid-template-columns: auto auto auto auto;
  // grid-template-rows: auto auto auto auto;
  height: 100%;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
  // @include bg-color("1");
  .device-item {
    width: 25%;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    cursor: pointer;
    @include dis-flex(center, center, column);
    padding: 5px;
    box-sizing: border-box;
    .id {
      font-size: 20px;
      font-family: DINCondensed-Bold;
    }
    &:hover {
      img {
        width: 260px;
      }
    }
    img {
      width: 220px;
      margin-bottom: 10px;
      transition: all 0.4s ease-in-out;
    }
  }
}
</style>