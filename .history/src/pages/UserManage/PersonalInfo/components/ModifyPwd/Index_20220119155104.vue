<template>
    
</template>

<script>
import { apiGetPublicKey, apiModifyPwd } from "@/api/user";
import { showMessage, setEncrypt } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters, mapMutations: user_mapMutations } =
    createNamespacedHelpers("user");

export default {
    name: "ModifyPwd",
    data() {
        let validateConfirmPassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$translate("请再次输入密码")));
            } else if (value !== this.formData.newPassword) {
                callback(new Error(this.$translate("两次输入密码不一致")));
            } else {
                callback();
            }
        };
        return {
            formData: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            rules: {
                oldPassword: [
                    {
                        required: true,
                        message: this.$translate("请输入旧密码"),
                        trigger: "blur",
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: this.$translate("请输入新密码"),
                        trigger: "blur",
                    },
                ],
                confirmPassword: [
                    {
                        validator: validateConfirmPassword,
                        required: true,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        ...user_mapMutations(["setUserInfo"]),
        handleCancle() {
            Object.keys(this.formData).forEach((key) => {
                this.formData[key] = "";
            });
        },
        async handleSure() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (!valid) return;
                let { data: key } = await apiGetPublicKey();
                if (!key) return;
                let { oldPassword, newPassword } = this.formData;
                let requestData = {
                    oldPswd: setEncrypt(key, oldPassword),
                    newPswd: setEncrypt(key, newPassword),
                };
                let { data } = await apiModifyPwd(requestData);
                if (data) {
                    showMessage("success", this.$translate("修改成功"));
                }
            });
        },
    },
    computed: {
        ...user_getters(["userInfo"]),
    },
};
</script>

<style lang="scss" scoped></style>
