<template>
    <div class="mostValue">
        <div class="title">
            {{ $translate(value.title) }}
        </div>
        <div class="value">
            <span> {{ value.value }}</span>
            <span class="unit">{{ value.unit }}</span>
        </div>
        <div class="time">
            {{ formateTime(value.time) }}
        </div>
    </div>
</template>

<script>
import { momentFormate } from "@/common/utils";
export default {
    name: "MostValue",
    props: {
        value: {
            type: Object,
            default: (_) => {},
        },
    },
    computed: {
        formateTime() {
            return (value) => {
                let format = "YYYY-MM-DD";
                if (Array.isArray(value)) {
                    return `${momentFormate(
                        value[0],
                        format
                    )} ~ ${momentFormate(value[1], format)}`;
                }
                return momentFormate(value, format);
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.mostValue {
    width: 100%;
    height: 180px;
    border-radius: 5px;
    @include bg-color("2");
    @include dis-flex(center, center, column);
    padding: 10px;
    box-sizing: border-box;

    .title {
        margin-bottom: 10px;
    }
    .value {
        font-size: 35px;
        font-weight: bolder;
        margin-right: 5px;
        font-size: 45px;
        @include font-color("1");
        font-family: DINCondensed-Bold;
    }
    .time{
        margin-top: 10px;
    }
}
</style>
