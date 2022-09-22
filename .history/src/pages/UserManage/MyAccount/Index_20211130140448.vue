<template>
  <div class="userList">
    <PlaneBox>
      <template #title>
        <div class="title-wrapper">
          <span>{{ $translate("我的账户") }}</span>
        </div>
      </template>
      <template #content>
        <List
          :tableData="tableData"
          @e_upDateAllUser="e_upDateAllUser"
          @e_editUser="e_editUser"
        />
      </template>
    </PlaneBox>
    <Pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @e_changePage="e_changePage"
    />
    <AddUser
      :userDialog.sync="userDialog"
      :adminUserList="adminUserList"
      @e_upDateAllUser="e_upDateAllUser"
    />
  </div>
</template>

<script>
import {
  apiUserList,
  apiGetAllAdminUser,
  apiRecharge,
  apiGetPayResult,
  apiGetOrderList
} from "@/api/user";
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
    this.getUsers();
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
    getUsers() {
      this.getUserList();
      this.getAllAdminUser();
    },
    async getUserList() {
      let { list, total } = await apiGetOrderList({
        customer: this.userInfo.userId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      });
      console.log(list);
      this.tableData = list;
      this.total = total;
    },
    async getAllAdminUser() {
      let { data } = await apiGetAllAdminUser();
      this.adminUserList = data ? JSON.parse(data) : [];
    },
    e_upDateAllUser() {
      this.currentPage = 1;
      this.getUsers();
    },
    addUser() {
      this.userDialog = { flag: true };
    },
    e_editUser(row) {
      this.userDialog = { flag: true, ...row };
    }
  },
  computed: {
    ...user_getters(["userInfo"]),
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
