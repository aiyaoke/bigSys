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
        prop="roleName"
        :label="$translate('角色')"
        show-overflow-tooltip
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        :label="$translate('手机号')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mail"
        :label="$translate('邮箱')"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column
        prop="desc"
        :label="$translate('备注')"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiDeleteUser } from "@/api/user";
import { showMessage, getAccountSatus } from "@/common/utils";

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
    c_accountSatus() {
      return statusId => this.$translate(getAccountSatus(statusId));
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
