<template>
    <div class="plane">
        <div>
            <div class="info">
                <template v-for="(item, index) in args.mostValue">
                    <MostValue :key="index" :value="item" class="info-item"></MostValue>
                </template>
            </div>
            <PlaneBox class="chartPlane-wrapper">
                <span slot="title"> {{ $translate(args.title) }}</span>
                <TimeChart
                    v-if="args.ref === 'chargeDischargeCurve'"
                    :args="args"
                    slot="content"
                />
                <CategoryChart v-else :args="args" slot="content" />
            </PlaneBox>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlaneChart",
    data() {
        return {
            chartElem: null,
        };
    },
    props: {
        args: {
            type: Object,
            default: (_) => {},
        },
    },
    components: {
        MostValue: (_) => import("./MostValue"),
        TimeChart: (_) => import("@/components/Chart/TimeChart"),
        CategoryChart: (_) => import("@/components/Chart/CategoryChart"),
        PlaneBox: (_) => import("@/components/PlaneBox"),
    },
};
</script>

<style lang="scss" scoped>
.plane {
    .info{
       display: flex;
       grid-gap: 20px;
       .info-item{
        flex: 1;
       }
    }
}
</style>
