<template>
    <div class="bg_color">
        <subhead>
            <div><i class="fa fa-th-large"></i>&nbsp;&nbsp;&nbsp;应用中心 <span>App Center</span></div>
            <!--<el-input :placeholder="placeholder" v-model="input_value" size="small">-->
                <!--<el-button slot="append" icon="el-icon-search" @click="searchApp"></el-button>-->
            <!--</el-input>-->
            <SubheadInput>
                <input slot="input" v-model="input_value" :placeholder="placeholder"/><button @click="searchApp"><i class="fa fa-search"></i></button>
            </SubheadInput>
        </subhead>
        <div class="contain">
            <div class="left_div _theme_app_bordertop">
                <div class="left_div_block" v-for="appGroup in appGroups" v-show="appGroup.apps.length>0" v-if="current_app_type_id === appGroup.id || current_app_type_id === ''">
                    <div class="block_head _theme_app_block_head_color">{{appGroup.name}}</div>
                    <div class="block_body">
                        <div class="app" v-for="app in appGroup.apps">
                            <a :href="app.url" :title="'进入' + app.name" target="_blank">
                                <img :src="$proxy+'/resource/app?id=' + app.id + '&timestamp=' + app.timestamp"/>
                            </a>
                            <a class="app_title" :title="'进入' + app.name + '详情'" @click="showDetail(app.id)">{{app.name}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right_div">
                <card>
                    <template slot="header">分类</template>
                    <div class="fenlei">
                        <div @click="toggleAppType('')"><i class="fa fa-search" style="color: rgb(255, 227, 218);"></i>&nbsp;&nbsp;全部服务({{all_service_count}})</div>
                        <div v-for="(item,index) in appGroups" @click="toggleAppType(item.id)"><i :class="icon[index%3].class" :style="'color:' + icon[index%3].color + ';'"></i>&nbsp;&nbsp;{{item.name}}({{item.apps.length}})</div>
                    </div>
                </card>
                <card>
                    <template slot="header">应用排行</template>
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
            <div slot="title" class="modal_head">
                <img :src="appDetail_app.img" />
                <div class="modal_head_middiv">
                    <div class="modal_head_middiv_div1">{{appDetail_app.name}}
                        &nbsp;<i @click="toggle_subscribe(appDetail_app_subscribe_status,appDetail_app.id)" :class="{'fa fa-star': appDetail_app_subscribe_status,'fa fa-star-o': !appDetail_app_subscribe_status}"></i>
                        &nbsp;<span>{{appDetail_app_subscribe_status ? '(取消收藏)' : '(点击收藏)'}}</span>
                    </div>
                    <div class="modal_head_middiv_div2">可见用户组: <span v-for="item in appDetail_app.userGroups">{{item.PERMNAME}} </span></div>
                    <div class="modal_head_middiv_div2">可见部门: <span v-for="item in appDetail_app.deptNames">{{item}}</span></div>
                    <div class="modal_head_middiv_div2">可见角色: <span v-for="item in appDetail_app.roleNames">{{item}}</span></div>
                    <div class="modal_head_middiv_div2">访问限制: <span>全网</span></div>
                </div>
                <a :href="appDetail_app.url" target="_blank" class="el-button el-button--success">进入应用</a>
            </div>
            <div class="modal_body">
                <el-carousel height="250px" style="width: 500px; border: 1px solid #bfbfbf;">
                    <el-carousel-item v-for="(item,index) in appDetail_app.screenshots" :key="index">
                        <img :src="appDetail.imgUrl + item.path" alt="暂无图片" style="width: 100%;" />
                    </el-carousel-item>
                </el-carousel>
                <div style="width: 330px; min-height: 30px;" v-html="appDetail_app.description"></div>
            </div>
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
                appGroups:[],//app所有类别，展示的数据
                appDetail:{},//模态框里的app详情信息
                appDetail_app:{},
                appDetail_app_subscribe_status:false,
                dialogVisible:false,//模态框是否显示
                all_service_count:0,//分类->全部服务的个数
                icon:[
                    {class:'fa fa-pencil-square-o',color:'rgb(139, 202, 139)'},
                    {class:'fa fa-bell-o',color:'rgb(255, 223, 175)'},
                    {class:'fa fa-calendar',color:'rgb(255, 227, 218)'},
                    {class:'fa fa-book',color:'rgb(139, 202, 139)'},
                    {class:'fa fa-bookmark-o',color:'rgb(255, 223, 175)'},
                    {class:'fa fa-cog',color:'rgb(255, 227, 218)'},
                    {class:'fa fa-edit',color:'rgb(139, 202, 139)'},
                    {class:'fa fa-envelope-o',color:'rgb(255, 223, 175)'},
                    {class:'fa fa-life-buoy',color:'rgb(255, 227, 218)'}
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
                        // console.log(res.data);
                        this.appGroups = res.data.groups;
                        let all_service_count=0;
                        for(let i=0;i<this.appGroups.length;i=i+1){
                            all_service_count += this.appGroups[i].apps.length;
                        }
                        this.all_service_count = all_service_count;
                    })
            },
            //app排行
            getAppRank(){
                this.$ajax.post(this.$url.app_rank)
                    .then(res => {
                        // console.log(res.data);
                        this.app_rank = res.data.apps;
                    })
            },
            //搜索应用
            searchApp(){
                this.$ajax.post(this.$url.list_app_query,{name:this.input_value})
                    .then(res => {
                        console.log(res.data);
                        this.appGroups = res.data.groups;
                    })
            },
            //进入应用详情
            showDetail(id){
                this.$ajax.post(this.$url.get_app_detail,{id:id})
                    .then(res => {
                        // console.log(res.data);
                        this.appDetail = res.data;
                        this.appDetail_app = res.data.app;
                        //通过改变appDetail_app_subscribe_status这个标识符来控制订阅和非订阅状态的展示,true-订阅，false-非订阅
                        if(this.appDetail.favoritesFlag === true){
                            this.appDetail_app_subscribe_status = true;
                        }else{
                            this.appDetail_app_subscribe_status = false;
                        }
                        this.dialogVisible = true;
                    })
            },
            //切换展示的app类型
            toggleAppType(id){
                this.current_app_type_id = id;
            },
            //切换订阅/取消订阅
            toggle_subscribe(status,id){
                let url;
                if(status){//已订阅
                    url = this.$url.addFavorites;
                }else{
                    url = this.$url.delFavorites;
                }
                this.$ajax.post(url,{thirdId:id,type:'app'})
                    .then(res => {
                        if(res.data.errcode == '0'){
                            if(status){//之前的状态是已经订阅，点击成功改变状态后，未订阅
                                this.appDetail_app_subscribe_status = false;
                            }else{
                                this.appDetail_app_subscribe_status = true;
                            }
                            this.$notify({
                                title:"提示",
                                message:res.data.errmsg,
                                type:"success",
                                position:"bottom-right"
                            })
                        }else{
                            this.$notify({
                                title:"提示",
                                message:res.data.errmsg,
                                type:"warning",
                                position:"bottom-right"
                            })
                        }
                    })
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
            margin-bottom: 20px;
            .block_head{
                height: 46px;
                line-height: 46px;
                font-size: 18px;
                font-weight: 700;
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
    .el-dialog__body{
        background-color: rgb(247,247,247);
        border-top: 1px solid black;
    }
    .modal_head{
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #bfbfbf;
        @include flex(space-bettween,flex-start);
        .modal_head_middiv{
            width: 578px;
            margin-left: 20px;
            font-size: 16px;
            font-weight: 700;
            color: #000;
            .modal_head_middiv_div1{
                i{
                    color:#fad733;cursor: pointer;
                }
                span{
                    font-size: 12px;
                    color: #777;
                }
            }
            .modal_head_middiv_div2{
                padding: 3px 0px;
                font-size: 12px;
                color: #000;
            }
        }
        img{
            width: 80px;
            height: 80px;
        }
        &>a{
            color: white;
            margin-left: 50px;
        }
    }
    .modal_body{
        @include flex(space-between,flex-start);
    }
</style>