<template>
 <div class="description">
    <div class="data">
        <div v-for="(source, index) in data" v-if="data&&data.length>0" class="group">
            <div class="group-title">{{$translate("第")}} {{index+1}} {{$translate(unit)}}</div>
            <div class="group-source">
                <div v-for="key in Object.keys(source)">
                    <div class="group-item">
                        <span class="group-item-title">{{key}}</span>
                        <span class="group-item-data">{{source[key]}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
     }
   },
   components: {

   },
   computed: {
   },
   methods: {
   },
   props: {
     data: {
        type: Array,
        default: [],
     },
     unit: {
        type: String,
        default: "",
     }
   },
   watch: {
   }
 }
</script>

<style lang='scss' scoped>
    .description{
        padding: 0 20px 20px 20px;
    }

    .group{
       margin-bottom: 20px
    }

    .group-title{
        font-size: 15px;
        @include font-color("1");
        margin-bottom: 10px;
    }

    .group-source{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
    }

    .group-item{
        border: 1px solid white;
        padding: 10px;
        display: flex;
    }

    .group-item-title{
        @include font-color(1);
        flex: 1;
    }
 
    .group-item-data{
        @include font-color(1);
        flex: 1;
    }
</style>
