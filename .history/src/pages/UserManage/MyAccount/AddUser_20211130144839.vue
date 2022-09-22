<template>
  <el-dialog
    :title="$translate('充值')"
    :visible.sync="flag"
    width="70%"
    :before-close="handleCancle"
  >
  <div slot="title" class="header-title">
            <span v-show="name" class="title-name">name {{ name }}</span>
            <span class="title-age">age {{ age }}</span>
        </div>
————————————————
版权声明：本文为CSDN博主「_freely」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/hbjiankely/article/details/88218237
    <div class="item">
      <span class="label">充值设备：</span>
      <el-select v-model="deviceId" size="medium">
        <el-option
          v-for="item in deviceList"
          :key="item.f0102_Id"
          :label="item.name"
          :value="item.f0102_Id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="item">
      <span class="label">充值金额：</span>
    </div>
  </el-dialog>
</template>

<script>
import { accountSatus, roleType } from "@/common/config";
import { apiAddUser } from "@/api/user";
import { showMessage, getAccountSatus } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
export default {
  name: "AddUser",
  data() {
    return {
      flag: true,
      deviceList: [],
      deviceId: ""
    };
  },
  props: {
    adminUserList: {
      type: Array,
      default: _ => []
    },
    visible: {
      type: Object,
      default: _ => {}
    }
  },
  mounted() {},
  methods: {
    handleCancle() {
      this.$emit("update:visible", false);
    }
  },
  watch: {
    visible(newValue) {
      this.flag = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 400px;
}
.item {
  display: flex;
  margin-bottom: 10px;
}
.label {
  display: inline-block;
  width: 150px;
  text-align: right;
  padding: 0 20px;
}
</style>
