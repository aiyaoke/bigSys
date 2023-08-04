<template>
    <div class="plane">
        <div class="plane-content">
            <!-- <div class="info">
                <template v-for="(item, index) in args.mostValue">
                    <MostValue :key="index" :value="item" class="info-item"></MostValue>
                </template>
            </div> -->
            <PlaneBox class="chartPlane-wrapper">
                <span slot="title"> {{ $translate(args.title) }}</span>
                <TimeChart
                    v-if="args.ref === 'chargeDischargeCurve'"
                    :args="args"
                    slot="content"
                />
                <CategoryChart v-else :args="args" slot="content" />
            </PlaneBox>
           <div class="show-data" v-if="showInfoData">
                <template v-for="(item, index) in args.mostValue">
                    <span class="show-data-item">
                        <span>{{ $translate(item.title) }}: </span>
                        <span class="value">
                            <span> {{ item.value || 0 }}</span>
                            <span>{{ item.unit }}</span>
                        </span>
                    </span>
                </template>
           </div>
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
        showInfoData: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        MostValue: (_) => import("./MostValue"),
        TimeChart: (_) => import("@/components/Chart/TimeChart"),
        CategoryChart: (_) => import("@/components/Chart/CategoryChart"),
        PlaneBox: (_) => import("@/components/NewPlaneBox"),
    },
    watch: {
        args(value){
        }
    }
};
</script>

<style lang="scss" scoped>
.plane {
    position: relative;
    height: 100%;
    @include bg-color("2");
    .info{
       display: flex;
       grid-gap: 20px;
       .info-item{
        flex: 1;
       }
    }
}

.plane-content{
    width: 100%;
    height: 100%;
}

.chartPlane-wrapper{
    width: 100%;
    height: 100%;
}

.show-data{
    width: auto;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    left: 50%;
    top: 10px;
    white-space: nowrap;
    transform: translateX(-50%);
}
.show-data-item{
    margin: 0 10px;
}

.value {
    font-weight: bolder;
    font-size: 20px;
    @include font-color("1");
    font-family: DINCondensed-Bold;
}
</style>
