<template>
  <el-dialog
    :title="dialogObj.id ? $translate('编辑设备') : $translate('添加设备')"
    :visible.sync="visible"
    width="30%"
    :before-close="handleCancle"
  >
    <el-form
      :model="formData"
      size="medium"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="sn" prop="sn">
        <el-input
          type="text"
          v-model="formData.sn"
          autocomplete="off"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item :label="$translate('设备类型')" prop="deviceTypeId">
        <el-select v-model="formData.deviceTypeId">
          <el-option
            v-for="item in deviceTypes"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            :disabled="item.value === 2"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$translate('所属电站')" prop="plantId">
        <el-select v-model="formData.plantId">
          <el-option
            v-for="item in allPlants"
            :key="item.plantId"
            :label="item.name"
            :value="item.plantId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small" @click="handleSure">{{
          $translate("确定")
        }}</el-button>
        <el-button size="small" @click="handleCancle">{{
          $translate("取消")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { apiDeviceType } from "@/api/device";
import { apiUpdateDevice } from "@/api/device";
import { showMessage, deepClone } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
export default {
  name: "AddUser",
  data() {
    return {
      visible: false,
      deviceTypes: [],
      formData: {
        sn: "",
        deviceTypeId: "",
        plantId: ""
      },
      rules: {
        sn: [
          {
            required: true,
            message: this.$translate("请输入sn号"),
            trigger: "blur"
          }
        ],
        deviceTypeId: [
          {
            required: true,
            message: this.$translate("请选择类型"),
            trigger: "blur"
          }
        ],
        plantId: [
          {
            required: true,
            message: this.$translate("请选择所属电站"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    dialogObj: {
      type: Object,
      default: _ => {}
    }
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    handleCancle() {
      this.$refs.ruleForm.resetFields();
      this.$emit("update:dialogObj", {});
    },
    async getTableList() {
      let { data } = await apiDeviceType();
      this.deviceTypes = data;
    },
    async handleSure() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return;
        let { id } = this.dialogObj;
        let requestData = {
          ...this.formData,
          id: id || 0
        };
        let { data } = await apiUpdateDevice(requestData);
        if (data) {
          showMessage(
            "success",
            id ? this.$translate("编辑成功") : this.$translate("添加成功")
          );
          this.$emit("e_upDateList");
          this.handleCancle();
        }
      });
    }
  },
  computed: {
    ...plant_getters(["allPlants"])
  },
  watch: {
    dialogObj(obj) {
      this.visible = obj.flag;
      if (obj.id) {
        Object.keys(this.formData).forEach(key => {
          if (this.formData.hasOwnProperty(key)) {
            this.formData[key] = obj[key];
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
