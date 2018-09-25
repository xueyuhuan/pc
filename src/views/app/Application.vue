<template>
    <div class="">
        <subhead>
            <div><i class="fa fa-th-large icon"></i>应用中心 <span>App Center</span></div>
            <SubheadInput>
                <input slot="input" v-model="input_value" placeholder="应用搜索"/><button @click="searchApp"><i class="fa fa-search"></i></button>
            </SubheadInput>
        </subhead>
        <div class="contain">
            <div class="left_div _theme_card">
                <div class="left_div_block" v-for="appGroup in appGroups" v-show="appGroup.apps.length>0" v-if="current_app_type_id === appGroup.id || current_app_type_id === ''">
                    <div class="block_head _theme_font">{{appGroup.name}}</div>
                    <div class="block_body">
                        <div class="app" v-for="app in appGroup.apps">
                            <a @click="enterApp(app.id)" :href="app.url" :title="'进入' + app.name" target="_blank">
                                <img :src="$proxy+'/resource/app?id=' + app.id + '&timestamp=' + app.timestamp"/>
                            </a>
                            <a class="app_title" :title="'进入' + app.name + '详情'" @click="showDetail(app.id)">{{app.name}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right_div hidden-xs-only">
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
        <el-dialog :visible.sync="dialogVisible" class="enterApp">
            <header slot="title">
                <div class="left">
                    <img :src="appDetail_app.img" />
                    <div class="text">
                        <h4>{{appDetail_app.name}}
                            <i @click="favorite(isFavorite,appDetail_app.id)" :class="{'fa fa-star': isFavorite,'fa fa-star-o': !isFavorite}"></i>
                        </h4>
                        <p>可见用户组: <span v-for="item in appDetail_app.userGroups">{{item.PERMNAME}} </span></p>
                        <p>可见部门：<span v-for="item in appDetail_app.deptNames">{{item}}</span></p>
                        <p>可见角色：<span v-for="item in appDetail_app.roleNames">{{item}}</span></p>
                        <p>访问限制：{{appDetail_app.fwxz}}</p>
                    </div>
                </div>
                <a class="enter" @click="enterApp(appDetail_app.id)" :href="appDetail_app.url" target="_blank">进入应用</a>
            </header>
            <div class="content">
                <el-carousel class="hidden-xs-only">
                    <el-carousel-item v-for="(item,index) in appDetail_app.screenshots" :key="index">
                        <img :src="appDetail.imgUrl + item.path" alt="暂无图片" style="width: 100%;" />
                    </el-carousel-item>
                </el-carousel>
                <p v-html="appDetail_app.description"></p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Application",
        data(){
            return{
                input_value:'',//搜索框的值
                appGroups:[],//所有分类
                appDetail:{},//模态框里的app详情信息
                appDetail_app:{},
                isFavorite:false,
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
      created(){
        this.getApp();
        this.getAppRank();
      },
        methods:{
            //获取所有类别app
            getApp(){
                this.$ajax.post(this.$url.appType)
                    .then(res => {
                        this.appGroups = res.data.groups;
                        for(let i=0;i<this.appGroups.length;i=i+1){
                            this.all_service_count += this.appGroups[i].apps.length;
                        }
                    })
            },
            //app排行
            getAppRank(){
                this.$ajax.post(this.$url.appRank)
                    .then(res => {
                        this.app_rank = res.data.apps;
                    })
            },
            //搜索应用
            searchApp(){
                this.$ajax.post(this.$url.appSearch,{name:this.input_value})
                    .then(res => {
                        this.appGroups = res.data.groups;
                    })
            },
            //进入应用详情
            showDetail(id){
                this.$ajax.post(this.$url.appDetail,{id:id})
                    .then(res => {
                      this.appDetail = res.data;
                      this.appDetail_app = res.data.app;
                      this.isFavorite=res.data.favoritesFlag;
                      this.dialogVisible = true;
                    })
            },
          //进入应用计数
          enterApp(id){
            this.$ajax.post('/app_portal/enter_app',{appId:id})
          },
            //切换展示的app类型
            toggleAppType(id){
                this.current_app_type_id = id;
            },
            //收藏
            favorite(isFavorite,id){
              this.$ajax.post(!isFavorite?this.$url.addFavorites:this.$url.delFavorites,{thirdId:id,type:'app'})
                  .then(res=>{
                    if(res.data.errcode==='0'){
                      this.isFavorite = !isFavorite;
                      this.$notify.success(res.data.errmsg);
                    }
                    else this.$notify.warning(res.data.errmsg);
                  });
            }
        },
    }
</script>

<style scoped lang="scss">
    .contain{
        @extend %width;
        @include flex(space-between,flex-start);
        .left_div{
            width: 784px;
            @media only screen and (max-width:767px) {
                width: 100%;
            }
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
                @include flex;
                flex-wrap: wrap;
                padding: 0 20px;
                border-bottom: 1px dashed #bfbfbf;
                .app{
                    @include flex;
                    flex-direction: column;
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

</style>