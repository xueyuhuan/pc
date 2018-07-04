<template>
    <div class="bg_color">
        <subhead>
            <div><i class="fa fa-th-large"></i>&nbsp;&nbsp;&nbsp;应用中心 <span>App Center</span></div>
            <el-input :placeholder="placeholder" v-model="input_value" size="small">
                <el-button slot="append" icon="el-icon-search" @click="searchApp"></el-button>
            </el-input>
        </subhead>
        <div class="contain">
            <div class="left_div">
                <div class="left_div_block" v-for="appGroup in appGroups" v-if="current_app_type_id === appGroup.id || current_app_type_id === ''">
                    <div class="block_head">{{appGroup.name}}</div>
                    <div class="block_body">
                        <div class="app" v-for="app in appGroup.apps">
                            <a :href="app.url" :title="'进入' + app.name" target="_blank">
                                <img :src="'/resource/app?id=' + app.id + '&timestamp=' + app.timestamp"/>
                            </a>
                            <a class="app_title" :title="'进入' + app.name + '详情'" @click="showDetail(app.id)">{{app.name}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right_div">
                <card>
                    <header slot="header">分类</header>
                    <div class="fenlei">
                        <div @click="toggleAppType('')"><i class="fa fa-search" style="color: rgb(255, 227, 218);"></i>&nbsp;&nbsp;全部服务({{all_service_count}})</div>
                        <div v-for="(item,index) in appGroups" @click="toggleAppType(item.id)"><i :class="icon[index].class" :style="'color:' + icon[index].color + ';'"></i>&nbsp;&nbsp;{{item.name}}({{item.apps.length}})</div>
                    </div>
                </card>
                <card>
                    <header slot="header">应用排行</header>
                    <div class="paihang">
                        <div v-for="(item,index) in app_rank" @click="showDetail(item.id)">
                            <span class="span1" :class="{color0:index === 0,color1:index === 1,color2:index === 2,}">{{index + 1}}</span>
                            <span class="span2">{{item.name}}</span>
                            <span class="span3">{{item.viewCount + '次'}}</span>
                        </div>
                    </div>
                </card>
            </div>
        </div>
        <!--模态框-->
        <el-dialog :visible.sync="dialogVisible" width="900px">
            <div class="modal_head">
                <img :src="appDetail_app.img" />
                <div>
                    <div>{{appDetail_app.name}}
                        <i :class="{'fa fa-star': appDetail.favoritesFlag,'fa fa-star-o': !appDetail.favoritesFlag}"></i>
                    </div>
                    <div></div>
                </div>
            </div>
            <div class="modal_body"></div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Application",
        data(){
            return{
                placeholder:"应用搜索",
                input_value:'',
                appGroups:[],//app所有类别
                appDetail:{},//模态框里的app详情信息
                appDetail_app:{},
                dialogVisible:false,//模态框是否显示
                all_service_count:0,//分类->全部服务的个数
                icon:[
                    {class:'fa fa-pencil-square-o',color:'rgb(139, 202, 139)'},
                    {class:'fa fa-bell-o',color:'rgb(255, 223, 175)'},
                    {class:'fa fa-calendar',color:'rgb(255, 227, 218)'}
                    ],
                current_app_type_id:"",//当前展示的app类型id
                app_rank:[],//app排行

            }
        },
        methods:{
            //获取所有类别app
            getApp(){
                this.$ajax.post(this.$url.list_app_group)
                    .then(res => {
                        console.log(res.data);
                        this.appGroups = res.data.groups;
                        let all_service_count=0;
                        for(let i=0;i<this.appGroups.length;i=i+1){
                            all_service_count += this.appGroups[i].apps.length;
                        }
                        this.all_service_count = all_service_count;
                    })
            },
            getAppRank(){
                this.$ajax.post(this.$url.app_rank)
                    .then(res => {
                        console.log(res.data);
                        this.app_rank = res.data.apps;
                    })
            },
            //搜索应用
            searchApp(){

            },
            //进入应用详情
            showDetail(id){
                this.$ajax.post(this.$url.get_app_detail,{id:id})
                    .then(res => {
                        console.log(res.data);
                        this.appDetail = res.data;
                        this.appDetail_app = res.data.app;
                        this.dialogVisible = true;
                    })
            },
            //切换展示的app类型
            toggleAppType(id){
                this.current_app_type_id = id;
            }
        },
        created(){
            this.getApp();
            this.getAppRank();
        }
    }
</script>

<style scoped lang="scss">
    .bg_color{
        @extend %bg1;
    }
    .contain{
        @extend %content;
        @include flex(space-between,flex-start);
        .left_div{
            width: 784px;
            background: #fff;
            border-top: 3px solid $skin-card;
            margin-bottom: 20px;
            .block_head{
                height: 46px;
                line-height: 46px;
                font-size: 18px;
                font-weight: 700;
                color: $skin-card;
                padding: 0 20px;
                border-bottom: 1px dashed #bfbfbf;
            }
            .block_body{
                @include flex(flex-start,flex-start);
                flex-wrap: wrap;
                padding: 0 20px;
                border-bottom: 1px dashed #bfbfbf;
                .app{
                    @include flex(space-around,center);
                    flex-direction: column;
                    width: 20%;
                    height: 148px;
                    padding: 10px 0;
                    &:hover{
                        background-color: #EEEEEE;
                    }
                    img{
                        width: 78px;
                        height: 78px;
                        cursor: pointer;
                    }
                    .app_title{
                        padding: 10px;
                        font-size: 14px;
                        width: 144px;
                        cursor: pointer;
                        text-align: center;
                        @extend %ellipsis;
                    }
                }
            }
        }
        .right_div{
            width: 399px;
            .fenlei{
                padding: 10px 23px;
                color: #000;
                font-size: 14px;
                div{
                    width: 50%;
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                }
            }
            .paihang{
                padding: 10px 23px;
                color: #000;
                font-size: 14px;
                cursor: pointer;
                .color0{background-color: #dd574c !important;}
                .color1{background-color: #f39943 !important;}
                .color2{background-color: #4a8cac !important;}
                div{
                    @include flex(flex-start);
                    line-height: 35px;
                    .span1{
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #eaeaea;
                        display: inline-block;
                        border-radius: 2px;
                        background-color: #959595;
                        margin-right: 23px;
                    }
                    .span2{
                        display: inline-block;
                        width: 200px;
                        text-align: left;
                        @extend %ellipsis;
                    }
                    .span3{
                        width: 100px;
                        text-align: right;
                    }
                }

            }
        }
    }
    .modal_head{
        img{
            width: 80px;
            height: 80px;
        }
    }
</style>