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
      <el-select v-model="deviceId" size="medium" @change="changeDevice">
        <el-option
          v-for="item in deviceList"
          :key="item.sn"
          :label="item.sn"
          :value="item.sn"
        >
        </el-option>
      </el-select>
    </div>
     <div class="item">
      <span class="label">充值设备：</span>
      <el-select v-model="deviceId" size="medium" @change="changeDevice">
        <el-option
          v-for="item in deviceList"
          :key="item.sn"
          :label="item.sn"
          :value="item.sn"
        >
        </el-option>
      </el-select>
    </div>
    <div class="item">
      <span class="label">服务类型：</span>
      <div
        :class="['serverType', rechargeServer == item.id ? 'active' : '']"
        v-for="item in serverTypes"
        :key="item.id"
        @click="() => changeServerType(item.id)"
      >
        <div class="type">{{ item.info }}</div>
      </div>
    </div>
    <div class="item">
      <span class="label">充值金额：</span>
      <div
        :class="['moneyType', rechargeMoney == item.total ? 'active' : '']"
        v-for="item in moneyTypes"
        :key="item.total"
        @click="() => changeMoneyType(item.total)"
      >
        <div class="type">{{ item.type }}</div>
        <div>
          <span class="￥">￥</span>
          <span class="value">{{ item.total }}</span>
        </div>
      </div>
    </div>
    <div class="codeBox">
      <div class="codeWrapper" v-loading="!outTradeNo">
        <div class="qrcode" id="qrcode" ref="qrCode"></div>
      </div>
      <div class="payWrapper">
        <div>
          <img src="./wechart.jpg" alt="" />
          <span class="tips"
            >微信扫码 支付 <strong class="money">{{ rechargeMoney }} </strong>元
          </span>
        </div>
        <el-button
          type="success"
          size="small"
          @click="handlePay"
          style="margintop: 10px"
          >{{ $translate("我已支付") }}</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  apiRecharge,
  apiGetPayResult,
  apiGetPriceType,
  apiGetServerType
} from "@/api/user";
import { apiAllDevices } from "@/api/device";
import { showMessage, debounce, thtotate } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const { mapGetters: device_getters } = createNamespacedHelpers("device");
import QRCode from "qrcodejs2";
export default {
  name: "AddUser",
  data() {
    return {
      flag: false,
      deviceList: [],
      deviceId: "",
      serverTypes: [],
      rechargeServer: "",
      moneyTypes: [],
      rechargeMoney: "",
      outTradeNo: ""
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getPriceType();
    this.getServerType();
    this.getAllDevices();
    this.debounceCreatQrCode = thtotate(this.creatQrCode, 1500);
  },
  methods: {
    clearCode() {
      this.outTradeNo = "";
      this.$refs.qrCode.innerHTML = "";
    },
    async getPriceType() {
      let res = await apiGetPriceType({ functionType: "1" });
      if (res.message) return showMessage("error", res.message);
      this.moneyTypes = res;
      this.rechargeMoney = this.moneyTypes[0].total;
    },
    async getServerType() {
      let res = await apiGetServerType();
      if (res.message) return showMessage("error", res.message);
      this.serverTypes = res;
      this.rechargeServer = this.serverTypes[0].id;
    },
    changeDevice() {
      this.clearCode();
      this.debounceCreatQrCode();
    },
    changeMoneyType(value) {
      if (this.rechargeMoney == value) return;
      this.clearCode();
      this.rechargeMoney = value;
      this.debounceCreatQrCode();
    },
    changeServerType(value) {
      if (this.rechargeServer == value) return;
      this.clearCode();
      this.rechargeServer = value;
      this.debounceCreatQrCode();
    },
    async getAllDevices() {
      this.deviceId = this.currentDevice.sn;
      let { data } = await apiAllDevices();
      this.deviceList = data ? JSON.parse(data) : [];
    },
    handleCancle() {
      this.clearCode();
      this.$emit("update:visible", false);
    },
    creatQrCode() {
      this.$nextTick(() => {
        setTimeout(async () => {
          this.clearCode();
          let res = await apiRecharge({
            equipment: this.deviceId,
            total: this.rechargeMoney,
            description: this.rechargeServer
          });
          this.outTradeNo = res.out_trade_no;
          this.qrcode = new QRCode(this.$refs.qrCode, {
            text: res.code_url,
            width: 120,
            height: 120,
            colorDark: "#000000",
            colorLight: "#ffffff"
          });
        });
      });
    },
    async handlePay() {
      if (!this.outTradeNo) return;
      let res = await apiGetPayResult({ outTradeNo: this.outTradeNo });
      showMessage(res.code ? "success" : "error", res.message);
      res.code && this.handleCancle();
    }
  },
  computed: {
    ...user_getters(["userInfo"]),
    ...device_getters(["currentDevice"])
  },
  watch: {
    visible(newValue) {
      this.flag = newValue;
      if (newValue) {
        this.debounceCreatQrCode();
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
  width: 312px;
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
  width: 71.5%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
.payWrapper {
  height: 102px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.codeWrapper {
  width: 140px;
  height: 140px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 2px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
