<template>
  <div class="table-wrapper">
    <el-table :data="tableData" size="medium" :max-height="tableHeight">
      <el-table-column
        prop="customer"
        :label="$translate('用户名')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="equipment"
        :label="$translate('充值设备')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="outTradeNo"
        :label="$translate('订单号')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="successTime"
        :label="$translate('支付时间')"
        show-overflow-tooltip
        width="150"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.active ? 'success' : 'info'"
            size="mini"
            effect="dark"
          >
            {{ c_accountSatus(scope.row.active) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="tradeStateDesc"
        :label="$translate('支付状态')"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { momentFormate, getAccountSatus } from "@/common/utils";
export default {
  name: "List",
  data() {
    return {
      tableHeight: document.documentElement.clientHeight - 200
    };
  },
  components: {
    Table: _ => import("@/components/Table")
  },
  props: {
    tableData: {
      type: Array,
      default: _ => []
    }
  },
  computed: {
    c_time() {
      return time => momentFormate(time, "YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="scss">
.table-wrapper {
  padding: 20px;
  box-sizing: border-box;
}
</style>
