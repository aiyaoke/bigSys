<template>
 <div>
    <div v-for="(item, index) in tableData" v-if="item.arr&&item.arr.length">
        <div v-if="item.title==type&&item.arr">
           <Description :data="item.arr" :unit="unit" />
        </div>
    </div>
 </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const {
    mapActions: device_actions,
    mapGetters:device_getters,
    mapMutations:device_mutations
  }=createNamespacedHelpers("device")
 export default {
   data () {
     return {
     }
   },
   components: {
     Description: (_)=>import("@/components/Description")
   },
   computed: {
    ...device_getters(["tableData"]),
    unit(){
      const unitEnum = {
        BMS: "堆",
        BMC: "簇",
        PCS: "号"
      }
      return unitEnum[this.type]
    }
   },
   methods: {
     ...device_mutations([]),
     ...device_actions(["getTableData"]),
     initData() {
      clearInterval(this.timer);
      this.getTableData();
      this.timer = setInterval(() => {
          this.getTableData();
      }, 24000);
     }
   },
   destroyed () {
     clearInterval(this.timer);
   },
   props: {
      containerId: {
        type: String | Array,
        default: "",
      },
      type: {
        type: String | Array,
        default: "",
      }
   },
   watch: {
      containerId: {
          deep: true,
          immediate: true,
          handler() {
            this.initData()
          }
      },
   }
 }
</script>

<style lang='scss' scoped>

 
</style>
