<template>
  <div>
    <div>告警微信通知</div>
    <div></div>
  </div>
</template>

<script>
import {
  apiGetAlarmNoticeCode,
  apiGetAlarmNoticeBindingState
} from "@/api/user";

export default{
    data(){
        return{

        }
    },
    mounted(){

    },
    methods:{
        async checkBindStatus(){
            let res = await apiGetAlarmNoticeBindingState()
        }
    }
}

</script>

<style lang="scss" scoped></style>
