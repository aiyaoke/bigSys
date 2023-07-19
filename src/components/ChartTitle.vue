<template>
 <div class="chartTitle">
    <div>{{title}}</div>
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
   methods: {
     click(){

     }
   },
   props: ["title"]
 }
</script>

<style lang='scss' scoped>
    .chartTitle {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 15px;
        font-weight: bolder;
        position: relative;

        &::before {
            content: "";
            display: inline-block;
            width: 3px;
            height: 14px;
            background: $colorful-1;
            position: absolute;
            top: 13px;
            left: 10px;
        }
    }
 
</style>
