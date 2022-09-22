<template>
    <div>
        <CommandPlane>
            <template #title>
                <span>{{ $translate("充放电时段设置") }}</span>
                <div>
                    <el-button
                        type="success"
                        size="mini"
                        @click="add"
                        :disabled="btnParams.isDisable"
                        >{{ $translate("添加") }}</el-button
                    >
                    <el-button
                        type="danger"
                        size="mini"
                        @click="clear"
                        :disabled="btnParams.isDisable"
                        >{{ $translate("清空") }}</el-button
                    >
                    <el-button
                        size="mini"
                        @click="readCommand"
                        :disabled="btnParams.isDisable"
                        >{{ btnParams.readBtnText }}</el-button
                    >
                    <el-button
                        type="primary"
                        size="mini"
                        @click="issueCommand"
                        :disabled="btnParams.isDisable"
                        >{{ btnParams.issueBtnText }}</el-button
                    >
                </div>
            </template>
            <template #content>
                <div style="margin: 10px 0">
                    <el-select
                        :placeholder="$translate('充放电')"
                        size="small"
                        v-model="type"
                        style="width: 113px"
                        class="margin-l"
                        clearable
                    >
                        <el-option :label="$translate('待机')" value="0"> </el-option>
                        <el-option :label="$translate('充电时段')" value="1"> </el-option>
                        <el-option :label="$translate('放电时段')" value="2"> </el-option>
                    </el-select>
                    <el-time-select
                        class="margin-lr"
                        style="width: 113px"
                        :placeholder="$translate('开始时间')"
                        v-model="start"
                        size="small"
                        :picker-options="{
                            start: '00:00',
                            step: '00:01',
                            end: '23:59',
                        }"
                    >
                    </el-time-select>
                    <!-- 结束时间 -->
                    <el-time-select
                        style="width: 113px"
                        :placeholder="$translate('结束时间')"
                        size="small"
                        v-model="end"
                        :picker-options="{
                            start: '00:00',
                            step: '00:01',
                            end: '23:59',
                        }"
                    >
                    </el-time-select>
                </div>
                <div class="wrapper">
                    <el-table :data="chargeDischargeGaps" style="width: 100%">
                        <el-table-column
                            prop="type"
                            :label="$translate('充放电')"
                            :formatter="
                                (row) =>({
                                    '0':$translate("待机"),
                                    '1':$translate("充电时段"),
                                    '2':$translate("放电时段"),
                                }[ row.type])   
                            "
                        >
                        </el-table-column>
                        <el-table-column prop="startHour" :label="$translate('开始时')"  >
                        </el-table-column>
                        <el-table-column prop="startMin" :label="$translate('开始分')"  >
                        </el-table-column>
                        <el-table-column prop="endHour" :label="$translate('结束时')"  >
                        </el-table-column>
                        <el-table-column prop="endMin" :label="$translate('结束分')" >
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </CommandPlane>
    </div>
</template>

<script>
import { showMessage } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "TwoMinute",
    data() {
        return {
            isWrite: "",
            type: "",
            start: "",
            end: "",
            chargeDischargeGaps: [],
        };
    },
    props: {
        btnParams: {
            type: Object,
            default: (_) => {},
        },
    },
    components: {
        CommandPlane: (_) => import("../components/CommandPlane"),
        PlaneBox: (_) => import("@/components/PlaneBox"),
    },
    methods: {
        add() {
            if (!this.start) {
                return showMessage(
                    "warning",
                    this.$translate("请选择开始时间")
                );
            }
            if (!this.end) {
                return showMessage(
                    "warning",
                    this.$translate("请选择结束时间")
                );
            }
            let [startHour, startMin] = this.start.split(":");
            let [endHour, endMin] = this.end.split(":");
            this.chargeDischargeGaps.push({
                type: this.type,
                startHour,
                startMin,
                endHour,
                endMin,
            });
            this.type = "";
            this.start = "";
            this.end = "";
        },
        clear() {
            this.$confirm(
                this.$translate("确认清空"),
                this.$translate("系统提示"),
                {
                    confirmButtonText: this.$translate("确定"),
                    cancelButtonText: this.$translate("取消"),
                    type: "warning",
                }
            ).then(async (_) => {
                this.chargeDischargeGaps = [];
            });
        },
        async readCommand() {
            this.$emit("issueCommand", {
                requestData: {
                    isWrite: false,
                },
                topic: "zhongz/timeSeg",
            });
        },
        issueCommand() {
            if (!this.chargeDischargeGaps.length) {
                return showMessage("warning", this.$translate("未添加时间段"));
            }
            this.$emit("issueCommand", {
                requestData: {
                    isWrite: true,
                    chargeDischargeGaps: JSON.stringify(
                        this.chargeDischargeGaps
                    ),
                },
                confirmParams: [
                    {
                        label: this.$translate("充放电时间段"),
                        value: JSON.stringify(this.chargeDischargeGaps),
                    },
                ],
                topic: "zhongz/timeSeg",
            });
        },
    },
    computed: {
        ...device_getters(["currentDevice"]),
    },
    watch: {
        result(newVal) {
            if (newVal.cmdTypeId == 3002) {
                this.chargeDischargeGaps = JSON.parse(
                    newVal.chargeDischargeGaps
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
}
</style>
