<template>

    <div class="svgWrap">
        <div class="main-case" style="min-height: 500px; height:90vh;">
            <div class="sovitjs_body" style="min-height: 500px;">
                <div id="main_div" style="display: flex;width: 100%;">
                    <div id="theLeftDiv" style="width:100%; ">
                        <div class="picture" >
                            <img style="width: 100%; " :src="require(`../../../assets/images/${imageName}.jpg`)" alt="">
                            <div class="title">{{ data.name }}</div>
                            <div class="leftBar">
                                <div class="top">
                                    <div class="smallTitle">
                                        {{$translate('电站数据')}}
                                    </div>
                                    <div class="topContent">
                                        <div class="item" v-for="it in topData">
                                            <div class="label">
                                                <i :class="'iconfont ' + it.icon"></i>
                                                {{ $translate(it.label) }}
                                            </div>
                                            <div class="value">
                                                {{ data[it.key] }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom ">
                                    <div class="smallTitle">
                                        {{$translate('电站介绍')}}
                                    </div>
                                    <div class="topContent">
                                        <div class="item" v-for="it in bottomData">
                                            <span>
                                                {{ $translate(it.label) }}
                                            </span>
                                            {{ data[it.key]||it.value }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div v-else id="sovit3d_1" style="height: 100%; margin-top: 0px;position: relative;">
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/common/flexible.js";
import { createNamespacedHelpers } from "vuex";
import { showMessage, setToken, redirectPath } from "@/common/utils";
import { getPlantInfo } from "../../../api/plant";
const {
    mapGetters: device_getters,
    mapActions: device_actions,
} = createNamespacedHelpers("device");
const {
    mapGetters: plant_getters,
} = createNamespacedHelpers("plant");
let _this = {};
export default {
    name: "TubeMap",
    data() {
        let sceneMain = null;
        let sceneChartMain = null;
        return {
            sceneMain,
            sceneChartMain,
            bmsId: [],
            pcsId: [],
            idData: [
                {
                    plantId: 1558,
                    PageId: "3302116777302949892",
                    name: "巴斯夫1",
                },
                {
                    plantId: 1590,
                    PageId: "3352942610741198850",
                    name: "TUV1"
                },
                {
                    plantId: 1591,
                    PageId: "",
                    name: "TUV1"
                },
                {
                    plantId: 1703,
                    PageId: "3462986072542150659",
                    name: "国投生物1"
                },
                {
                    plantId: 1709,
                    PageId: "3473155914167484416",
                    name: "德赛电池-惠南园区1"
                },
                {
                    plantId: 1712,
                    PageId: "3470476812889358342",
                    name: "德赛电池-惠南园区1"
                },
                {
                    plantId: 1743,
                    PageId: "",
                    name: "德赛-仲恺园区1"
                },
                {
                    plantId: 1744,
                    PageId: "",
                    name: "德赛-仲恺园区1"
                },
                {
                    plantId: 1665,
                    PageId: "3489319826596298759",
                    name: "珠海冠宇1"
                },
                {
                    plantId: 1734,
                    PageId: "3505780672293765121",
                    name: "海四达一期"
                },
                     {
                    plantId: 1896,
                    PageId: "3505780672293765121",
                    name: "海四达二期"
                },
                {
                    plantId: 1703,
                    PageId: "3505780672293765121",
                    name: "国投生物1"
                }, {
                    plantId: 1751,
                    PageId: "3505780672293765121",
                    name: "华培动力1"
                },
                {
                    plantId: 1741,
                    PageId: "",
                    name: "江苏正立新能源1"
                },
                {
                    plantId: 1752,
                    PageId: "",
                    name: "鹰普一期1"
                },
                {
                    plantId: 1753,
                    PageId: "",
                    name: "鹰普一期1"
                },
                {
                    plantId: 1569,
                    PageId: "",
                    name: "福耀玻璃"
                },
            ],
            currentId: '',
            topData: [
                {
                    key: 'sumProfit',
                    label: "总收益",
                    value: '',
                    icon: 'icon-fenxiangzhuanshouyi'
                },
                {
                    key: 'dailyProfit',
                    label: "日收益",
                    value: '',
                    icon: 'icon-shouyi2'

                },
                {
                    key: 'EiDay',
                    label: "日充电量",
                    value: '',
                    icon: 'icon-chatou'
                },
                {
                    key: 'EoDay',
                    label: "日放电量",
                    value: '',
                    icon: 'icon-dianchi1'
                },
                {
                    key: 'EiT1',
                    label: "总充电电量",
                    value: '',
                    icon: 'icon-baobiao'
                },
                {
                    key: 'EoT1',
                    label: "总放电电量",
                    value: '',
                    icon: 'icon-zongjie'
                },
                {
                    key: 'pcsTotalPower',
                    label: "PCS总有功功率",
                    value: '',
                    icon: 'icon-duikaimenbingxiang_'
                },
                {
                    key: 'P',
                    label: "当前总有功功率",
                    value: '',
                    icon: 'icon-bingxiang'
                },
            ],
            bottomData: [
                {
                    key: 'installDate',
                    label: "建站日期",
                    value: ''
                },
                {
                    key: 'scale',
                    label: "项目规模",
                    value: ''
                },
                // {
                //     key: 'totalEletity',
                //     label: "PCS型号",
                //     value: '10KV DY11/2MW'
                // },
                // {
                //     key: 'totalBenenfit',
                //     label: "BMS型号",
                //     value: 'ESMU- 10II'
                // },
                {
                    key: 'position',
                    label: "电站详细位置",
                    value: ''
                },

            ],
            data: {},
            imageName:''
        }

    },
    computed: {
        ...device_getters(["allDevices", "version", "PCS", "BMS", "allDevDetails"]),
        ...plant_getters(["currentPlant",]),
    },
    created() {
        _this = this;
    },
    mounted() {
        // console.log(this.currentPlant);
        this.getPlantData();

    },
    methods: {
        ...device_actions(["getContainer"]),
        function() {
            if (this.idData.find(it => it.plantId == this.currentPlant.plantId) === undefined) {
                this.currentId = "3470444777340665864";
              
            } else {
                this.currentId = this.idData[this.idData.findIndex(it => it.plantId == this.currentPlant.plantId)].PageId;
                this.imageName=this.idData[this.idData.findIndex(it => it.plantId == this.currentPlant.plantId)].name;
                console.log(this.imageName,122);
            }
            this.sceneMain = new Sovit3DPaser.SceneMain({
                /**
                 * 说明：apiurl用来定义后端接口地址。当部署方式不一样时接口地址的写法不一样。
                 * 具体写法：
                 * 数维图云端部署：https://admin.sovitjs.com/restapi
                 * 私有版部署：http://192.168.0.10:9188
                 * 私有版部署时需要写对应部署的服务器的IP及服务端口
                 * 注意：Sovit3D目前不支持离线下载文件进行引用，请使用在线引用场景(云端或者私有部署均可)
                 */
                apiurl: 'https://admin.sovitjs.com/restapi',
                publishType: 1 //1为在线引用组件 
            });
            this.sceneChartMain = new SovitChartPaser.SceneMain({
                apiurl: 'https://admin.sovitjs.com/restapi',
                publishType: 1 //1为在线引用组件 
            });
            this.initScene(this.currentId);
        },
        initScene(id) {
            //清除上一个场景的页面数据
            jCanvasQuery("#sovit3d_1").html('').css("height", "100vh");
            //销毁上一个场景的3D对象数据
            this.sceneMain.destroyed();
            //销毁上一个场景的图表对象数据
            this.sceneChartMain.destroyed();
            this.sceneChartMain = new SovitChartPaser.SceneMain({
                apiurl: 'https://admin.sovitjs.com/restapi',
                publishType: 1 //1为在线引用组件
            })

            this.sceneMain.init3d("sovit3d_1", {
                pageId: id, //图表的ID，发布图表的地方可以找到
                chartSceneMain: this.sceneChartMain,//图表解析器对象传入到3D解析器中
                params: { //params是向后端接口或者SQL中定义了参数，进行参数传递，注意key的名称要和编辑器中对接数据时定义的参数名一样
                    plantId: this.currentPlant.plantId
                }
            }, function (reData) {
                if (reData.props.pcsIdModel) {
                    // sessionStorage.setItem("containerId", _this.pcsId[+reData.props.pcsIdModel])
                    _this.$router.push({
                        path: '/containerIndex/equipmentOverview/PCS', // 命名路由
                    })
                } else {
                    // sessionStorage.setItem("containerId", _this.bmsId[+reData.props.idModel])
                    _this.$router.push({
                        path: '/containerIndex/equipmentOverview/Bms', // 命名路由
                    })
                }
                _this.getContainer({
                    containerId: sessionStorage.getItem('containerId'),
                }).then(() => {
                    if (_this.PCS.length == 0 && _this.BMS.length == 0) {
                        showMessage("warning", "该集装箱数据暂未采集")
                    }
                });
            }, function (sceneObj) {
                _this.allDevices.forEach((item, index) => {
                    if (item.type === 1) {
                        _this.pcsId.push(item.id)
                    } else {
                        _this.bmsId.push(item.id)
                    }
                })
            });
            this.sceneChartMain.initChart("sovit3d_1", {
                appType: 'sovit3d', //注意，当Sovit2D中使用了chart，这里使用SovitChart的API时必须加上这个参数
                pageId: id, //图表的ID，发布图表的地方可以找到
                params: {
                    plantId: this.currentPlant.plantId
                }
            }, function (comId, eventType, reData) {
            });
            this.sceneChartMain.refreshDatas("sovit3d_1", "Rest31797986976637911130004", { plantId: this.currentPlant.plantId })
            // console.log(this.currentPlant.plantId);
        },
        async getPlantData() {
            let { data } = await getPlantInfo({ plantId: this.currentPlant.plantId });
            this.data = data;
            // console.log(data, "plantID");
            this.imageName=this.idData[this.idData.findIndex(it => it.plantId == this.currentPlant.plantId)].name;
            console.log(this.imageName,122);


        }

    },


}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.svgWrap {
    width: 100%;
    // margin-bottom: 20px;
    // overflow: hidden;
    height: 100vh;

    .ayk {
        width: 100%;
        height: 100%;
    }
}

.content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

// .top{
//     width: 1070px;
//     height: 600px;
// }

.picture {
    width: 100%;
    height: 100%;
    position: relative;

    img {
        position: absolute;
    }

    .title {
        z-index: 999;
        position: absolute;
        width: 100%;
        height: 3.6458rem;
        background:  linear-gradient( 180deg, #32465F 0%, #2A323B 51%, #2A3B4A 100%);
        border-radius: .625rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.875rem;
    }

    .leftBar {
        width: 17.7083rem;
        height: calc(90vh - 4.1667rem);
        background: linear-gradient( 180deg, #2C3948 0%, #1F2226 44%, #1D2A3A 60%);
        border-radius: .625rem;
        z-index: 999;
        position: absolute;
        top: 4.1667rem;
        padding: .7292rem .625rem;
        .top {
            width: 100%;
            height: 50%;

            .smallTitle {
                font-size: 1.0417rem;
                width: 100%;
                color: #fff;
                // box-shadow:linear-gradient( 270deg, rgba(27,62,96,0.7) 0%, #306AA2 100%);
            }

            .topContent {
                width: 100%;
                height: calc(100% - 3.3854rem);
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr;
                gap: .4167rem;
                font-size: .8333rem;
                color: #FFFFFF;
                padding: .6771rem 0 1.5104rem 0;

                .item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background:linear-gradient( 180deg, #32465F 0%, #2A323B 51%, #2A3B4A 100%);
                    border-radius: .4167rem;
                    border: 1px solid #30434D;
                    .label{
                        margin-bottom: 1.0417rem;
                    }
                }
            }
        }

        .bottom {
            width: 100%;
            height: 50%;

            .smallTitle {
                font-size: 1.0417rem;
                width: 100%;
                color: #fff;
                // box-shadow:linear-gradient( 270deg, rgba(27,62,96,0.7) 0%, #306AA2 100%);
            }

            .topContent {
                width: 100%;
                height: calc(100% - 3.3854rem);
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr 1fr ;
                gap: .4167rem;
                font-size: 16px;
                color: #FFFFFF;
                padding: .6771rem 0 1.4583rem 0;

                .item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient( 180deg, #32465F 0%, #2A323B 51%, #2A3B4A 100%);
                    border-radius: .4167rem;
                    border: 1px solid #30434D;
                    position: relative;
                    span {
                        position: absolute;
                        left: .4167rem;
                        top: .5208rem;
                        font-size: .7292rem;
                    }
                }
            }
        }
    }
}
</style>