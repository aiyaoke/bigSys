<template>
  <div class="userList">
    <PlaneBox>
      <template #title>
        <div class="title-wrapper">
          <span>{{ $translate("我的账户") }}</span>
        </div>
      </template>
      <template #content>
        <el-button type="primary" size="small">{{
          $translate("充值")
        }}</el-button>
        <List :tableData="tableData" />
      </template>
    </PlaneBox>
    <Pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @e_changePage="e_changePage"
    />
    <AddUser :userDialog.sync="userDialog" />
  </div>
</template>

<script>
import { apiRecharge, apiGetPayResult, apiGetOrderList } from "@/api/user";
import { createNamespacedHelpers } from "vuex";

const { mapGetters: user_getters } = createNamespacedHelpers("user");
export default {
  name: "UserList",
  data() {
    return {
      userType: 0,
      userDialog: {},
      tableData: [],
      currentPage: 1,
      pageSize: 30,
      total: 0,
      adminUserList: []
    };
  },
  mounted() {
    this.userType = this.userInfo.type;
    this.getOrderList();
  },
  components: {
    List: _ => import("./List"),
    AddUser: _ => import("./AddUser"),
    Pagination: _ => import("@/components/Pagination"),
    PlaneBox: _ => import("@/components/PlaneBox")
  },
  methods: {
    e_changePage(page) {
      this.currentPage = page;
    },
    async getOrderList() {
      let { list, total } = await apiGetOrderList({
        customer: this.userInfo.userId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      });
      console.log(list);
      this.tableData = list;
      this.total = total;
    },
    addUser() {
      this.userDialog = { flag: true };
    }
  },
  computed: {
    ...user_getters(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
.userList {
  .plane-box {
    height: auto;
    margin: 0;
    .title-wrapper {
      width: 100%;
      @include dis-flex(space-between, center);
    }
  }
  .add-icon {
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: $primary-color;
      transform: rotate(90deg);
      font-size: 28px;
    }
  }
}
</style>
