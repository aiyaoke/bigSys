<template>
  <div class="alarm-config">
    <div class="table-wrapper">
      <div class="card-title ">
        <span>{{ $translate("报警规则") }}</span>
        <el-button type="primary" size="mini" @click="showDrawer">{{
          $translate("添加")
        }}</el-button>
      </div>
      <el-table :data="tableData" size="medium" :max-height="tableHeight">
        <el-table-column
          prop="id"
          :label="$translate('序号')"
          width="100"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="desc"
          :label="$translate('告警描述')"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="desc"
          :label="$translate('每小时推送上限')"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="desc"
          :label="$translate('每日推送上限')"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="desc"
          :label="$translate('禁启用')"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="desc"
          :label="$translate('接收人')"
          align="center"
        >
        </el-table-column>

        <el-table-column :label="$translate('操作')" align="center" width="180">
          <template slot-scope="scope">
            <el-switch
              v-on:change="changeSwitch($event, scope.row.id)"
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="√"
              inactive-text="×"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Drawer :flag="flag" @close="close" />
  </div>
</template>

<script>
import {
  apiGetAlarmConfig,
  apiUpdateAlarmConfig,
  apiGetAlarmRules
} from "@/api/alarm";
import { showMessage } from "@/common/utils";
import Drawer from "./Drawer.vue";
export default {
  name: "AlarmConfig",
  data() {
    return {
      flag: false,
      tableData: [],
      tableHeight: document.documentElement.clientHeight - 100
    };
  },
  mounted() {
    this.getAlarmConfig();
  },
  components: {
    Drawer
  },
  methods: {
    showDrawer() {
      this.flag = true;
    },
    close() {
      this.flag = false;
    },
    async getAlarmConfig() {
      let { data } = await apiGetAlarmRules();
      console.log( JSON.parse(data || "[]"))
      if (data) {
        this.tableData = JSON.parse(data || "[]");
      }
    },
    async changeSwitch(enable, id) {
      let requestData = [{ enable, id }];
      let { code } = await apiUpdateAlarmConfig(requestData);
      code === "ok" && showMessage("success", this.$translate("修改成功"));
    },
    handleChangePage(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-config {
  .table-wrapper {
    @include bg-color("2");
    border-radius: 5px;
  }
  .card-title {
    display: flex;
    justify-content: space-between;
  }
  .card-content {
    padding: 20px;
    box-sizing: border-box;
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
