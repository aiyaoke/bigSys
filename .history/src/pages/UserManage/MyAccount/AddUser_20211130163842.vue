<template>
  <el-dialog
    :title="$translate('充值')"
    :visible.sync="flag"
    width="600"
    :before-close="handleCancle"
    :show-close="false"
  >
    <div slot="title" class="header">
      <span class="rechargeText">监控费用充值</span>
      <span class="x" @click="handleCancle">X</span>
    </div>

    <div class="item">
      <span class="label">充值设备：</span>
      <el-select v-model="deviceId" size="medium">
        <el-option
          v-for="item in deviceList"
          :key="item.id"
          :label="item.sn"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="item">
      <span class="label">充值金额：</span>
      <div
        :class="['moneyType', rechargeMoney == item.value ? 'active' : '']"
        v-for="item in moneyTypes"
        :key="item.value"
        @click="() => changeMoneyType(item.value)"
      >
        <div class="type">{{ item.type }}</div>
        <div>
          <span class="￥">￥</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="codeBox">
      <div class="qrcode" id="qrcode" ref="qrCodeUrl"></div>
      <div>
        <div>
          <img src="./wechart.jpg" alt="" />
        </div>
        <span class="tips"
          >微信支付 微信扫码 支付
          <strong class="money">{{ rechargeMoney }} </strong>元
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { apiRecharge, apiGetPayResult } from "@/api/user";
import { apiAllDevices } from "@/api/device";
import { showMessage, getAccountSatus } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
import QRCode from "qrcodejs2";
export default {
  name: "AddUser",
  data() {
    return {
      flag: false,
      deviceList: [],
      deviceId: "",
      moneyTypes: [
        { type: "包月", value: "15" },
        { type: "包季", value: "35" },
        { type: "包年", value: "125" }
      ],
      rechargeMoney: 15,
      qrcode: null
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getAllDevices();
  },
  methods: {
    changeMoneyType(value) {
      this.qrcode.clear();
      this.rechargeMoney = value;
      this.creatQrCode();
    },
    async getAllDevices() {
      let { data } = await apiAllDevices();
      this.deviceList = data ? JSON.parse(data) : [];
      if (this.deviceList.length > 0) {
        this.deviceId = this.deviceList[0].id;
      }
    },
    handleCancle() {
      this.$emit("update:visible", false);
    },
    creatQrCode() {
      this.$nextTick(async () => {
        // if (this.qrcode) {
        //   this.qrcode.clear();
        // }
        let res = await apiRecharge({
          equipment: this.deviceId,
          customer: this.userInfo.userId,
          total: this.rechargeMoney
        });
        this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: res.code_url,
          width: 100,
          height: 100,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      });
    },
    async apiGetPayResult(outTradeNo) {
      let res = await apiGetPayResult({ outTradeNo });
      console.log(res);
    }
  },
  computed: {
    ...user_getters(["userInfo"])
  },
  watch: {
    visible(newValue) {
      this.flag = newValue;
      if (newValue) {
        this.creatQrCode();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .el-dialog__header {
  padding: 0;
}
.header {
  background: url("./header.jpg");
  height: 70px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rechargeText {
    font-size: 22px;
    color: #d99900;
  }
  .x {
    color: #663d00;
    cursor: pointer;
  }
}
.el-select {
  width: 400px;
}
.item {
  display: flex;
  margin-bottom: 10px;
}
.label {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding: 0 20px;
}
.active {
  border-color: #ebc96a !important;
  background-color: #fcf7e6;
}
.moneyType {
  box-sizing: border-box;
  position: relative;
  width: 146px;
  height: 120px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  .type {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin: 18px;
  }
  .value {
    color: #dfb349;
    font-size: 36px;
    font-weight: bold;
    position: relative;
    left: -2px;
  }
  .￥ {
    color: #dfb349;
    font-weight: bold;
    font-size: 15px;
  }
}
.codeBox {
  position: relative;
  left: 50px;
  margin-top: 10px;
  width: 80%;
  height: 200px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .qrcode {
    margin-right: 10px;
  }
  .tips {
    color: #000028;
    font-size: 16px;
    line-height: 20px;
    .money {
      font-size: 36px;
      font-weight: 700;
      color: #000028;
      margin: 0 5px;
    }
  }
}
</style>
