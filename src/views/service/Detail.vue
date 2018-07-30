<template>
    <div class="detail">
        <subhead>
            <div><i class="fa fa-arrow-left" style="cursor: pointer" @click="routerBack"></i>&nbsp;&nbsp;&nbsp;服务详情</div>
        </subhead>
        <p class="time-limit" v-show="service.timeType==='1'">该项服务为限时服务,服务有效期自{{service.deadlineStart}}至{{service.deadlineEnd}}</p>
        <div class="content">
            <!--左侧-->
            <card class="left">
                <!--头部-->
                <template slot="header">
                    <div class="left">
                        <img :src="$proxy+imgPath.head+service.id"/>
                        <div class="info">
                            <p>{{service.name}}<button>{{service.lineAble==="1"?"线上":"线下"}}</button><button>{{service.type1Name}}</button><button>{{service.type2Name}}</button></p>
                            <span v-show="!isFavorite" @click="favorite('add')"><i class="fa fa-star-o"></i>点击收藏</span>
                            <span v-show="isFavorite" @click="favorite('del')"><i class="fa fa-star"></i>点击取消</span>
                        </div>
                    </div>
                    <a class="online" v-if="service.lineAble==='1'">进入服务</a>
                    <a class="underline" v-else>该项服务为线下服务<br/>请仔细查看办理流程</a>
                </template>
                <!--服务提供和对象说明-->
                <div class="explain">
                    <p v-if="service.managerDeptname"><i class="fa fa-info-circle"></i>本服务由<em class="_theme_card_font">{{service.managerDeptname}}</em>提供</p>
                    <p v-else><i class="fa fa-info-circle"></i>暂无服务部门</p>
                    <p v-if="service.fwdxsm"><i class="fa fa-info-circle"></i>本服务的服务对象为<em class="_theme_card_font">{{service.fwdxsm}}</em></p>
                    <p v-else><i class="fa fa-info-circle"></i>暂无服务对象</p>
                </div>
                <!--四个折叠面板-->
                <el-collapse class="collapse" v-model="activeName">
                    <!--办理说明-->
                    <el-collapse-item name="1" v-show="!data.cols||cols.blsm==='Y'">
                        <template slot="title"><i class="fa fa-file-text-o"></i>办理说明</template>
                        <div v-if="service.description" class="content" v-html="service.description"></div>
                        <p v-else class="no">暂无数据</p>
                    </el-collapse-item>
                    <!--服务流程-->
                    <el-collapse-item name="2" v-show="!data.cols||cols.fwlc==='Y'">
                        <template slot="title"><i class="fa fa-object-ungroup"></i>服务流程</template>
                        <div class="content">
                            <div class="text"><p class="no" style="padding:0;margin-bottom: 14px;" v-if="service.fwlcsm===''">暂无数据</p><div v-else v-html="service.fwlcsm"></div></div>
                            <!--右侧图片-->
                            <div class="img" v-if="data.fwlcs&&data.fwlcs.length>0">
                                <!--图片大于1时轮播-->
                                <el-carousel v-if="data.fwlcs.length>1">
                                    <el-carousel-item v-for="i in data.fwlcs" >
                                        <a v-if="i.path.indexOf('http')>-1" :href="i.path" target="_blank"><img title="点击查看大图" :src="i.path"/></a>
                                        <a v-else :href="$proxy+imgPath.fwlc+i.path" target="_blank"><img title="点击查看大图" :src="$proxy+imgPath.fwlc+i.path"/></a>
                                    </el-carousel-item>
                                </el-carousel>
                                <!--否则单图片-->
                                <template v-else>
                                    <a v-if="data.fwlcs[0].path.indexOf('http')>-1" :href="data.fwlcs[0].path" target="_blank"><img title="点击查看大图" :src="data.fwlcs[0].path"/></a>
                                    <a v-else :href="$proxy+imgPath.fwlc+data.fwlcs[0].path" target="_blank"><img title="点击查看大图" :src="$proxy+imgPath.fwlc+data.fwlcs[0].path"/></a>
                                </template>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!--所需材料-->
                    <el-collapse-item name="3" v-show="!data.cols||cols.sxcl==='Y'">
                        <template slot="title"><i class="fa fa-files-o"></i>所需材料</template>
                        <div class="content" v-if="data.sxcls&&data.sxcls.length>0">
                            <table>
                                <thead><tr><th colspan="1"></th><th colspan="10">材料名称</th><th colspan="2">下载</th></tr></thead>
                                <tr v-for="(i,index) in data.sxcls">
                                    <td colspan="1">{{index+1}}</td>
                                    <td colspan="10">{{i.fileName}}</td>
                                    <td colspan="2">
                                        <template v-if="i.path!==''">
                                            <a v-if="i.path.indexOf('http')>-1" :href="i.path" target="_blank"><i class="fa fa-download"></i></a>
                                            <a v-else :href="$proxy+i.path" target="_blank"><i class="fa fa-download"></i></a>
                                        </template>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p class="no" v-else>暂无数据</p>
                    </el-collapse-item>
                    <!--用户评价-->
                    <el-collapse-item name="4" v-if="service.isKfpj==='1'&&(!data.cols||cols.yhpj==='Y')">
                        <template slot="title"><i class="fa fa-comment-o"></i>用户评价<a class="comment" @click="commentShow=true">评价</a></template>
                        <div class="content" v-if="comment.length>0">
                            <ul>
                                <li v-for="i in comment"><img :src="i.PATH?i.PATH:$proxy+'/img/a0.jpg'"/>
                                    <div class="text">{{i.USERNAME}}&nbsp;&nbsp;<el-rate class="rate" v-model="i.SCORE" disabled></el-rate><br/><span>{{i.COMMENT_TEXT}}</span></div>
                                </li>
                            </ul>
                        </div>
                        <p class="no" v-else>暂无数据</p>
                    </el-collapse-item>
                </el-collapse>
                <!--分页-->
                <el-pagination v-show="this.total>1"
                               background
                               layout="prev, pager, next"
                               @current-change="handlePageChange"
                               @prev-click="handlePageChange"
                               @next-click="handlePageChange"
                               :page-size=pageSize
                               :total=total>
                </el-pagination>
                <!--底部信息-->
                <footer>监督电话：{{service.jddh}} | 更新时间 : {{service.whenModifiedStr}} | 更新人：{{service.createUserxm}}</footer>
            </card>
            <!--右侧-->
            <div class="right">
                <!--基本信息-->
                <card class="basic" v-show="!data.cols||cols.jbxx==='Y'">
                    <template slot="header"><div class="left"><i class="fa fa-info-circle"></i>基本信息</div></template>
                    <!--已进驻头部-->
                    <div class="enter" v-if="service.isJzdt==='1'">
                        <img :src="$school.school==='ccnu'?$proxy+'/img/fwdt.jpg':$proxy+'/img/hitJzdt.png'"/>
                        <div class="text">
                            <span>当前服务已经入驻</span>
                            <p>{{$school.enterName}}</p>
                            <span v-if="$school.enterNameEn">{{$school.enterNameEn}}</span>
                        </div>
                    </div>
                    <!--未进驻线上-->
                    <template v-if="service.isJzdt!=='1'&&service.lineAble==='1'&&$school.school==='hit'">
                        <div class="enter">
                            <img :src="$proxy+'img/mouse.png'"/>
                            <div class="text">
                                <span>本服务由<a :href="service.fwlyUrl" target="_blank">{{service.fwlymc}}</a>提供</span>
                                <p>线上办理</p>
                                <span>Online Services</span>
                            </div>
                        </div>
                        <div class="task" v-if="service.isTask==='1'">
                            <i class="fa fa-info-circle"></i><a :href="service.fwlyUrl" target="_blank">{{service.fwlymc}}</a>已与门户系统进行整合，您可以在校园门户办事中心跟踪办理进度。
                        </div>
                        <div class="task" v-else>
                            <i class="fa fa-info-circle"></i><a :href="service.fwlyUrl" target="_blank">{{service.fwlymc}}</a>未与门户系统进行整合，您需要前往源系统查看及跟踪办理进度。
                        </div>
                    </template>
                    <!--已进驻哈工大时间地点-->
                    <div class="place-time" v-if="service.isJzdt==='1'&&$school.school==='hit'">
                        <p v-if="$school.enterPlace"><i class="fa fa-map-marker"></i><span v-html="$school.enterPlace"></span></p>
                        <p v-if="$school.enterTime" class=""><i class="fa fa-clock-o"></i><span v-html="$school.enterTime"></span></p>
                    </div>
                        <p v-if="service.place"><i class="fa fa-location-arrow"></i>{{service.place}}</p>
                        <p v-if="service.handleTime"><i class="fa fa-clock-o"></i>{{service.handleTime}}</p>
                        <p v-if="service.managerTel"><i class="fa fa-phone"></i>{{service.managerTel}} {{service.manager}}</p>
                </card>
                <!--注意事项-->
                <card v-show="!data.cols||cols.zysx==='Y'">
                    <template slot="header"><div class="left"><i class="fa fa-warning"></i>注意事项</div></template>
                    <div v-if="service.notice" style="font-size: 14px;padding: 0 15px;" v-html="service.notice"></div>
                    <p class="no" v-else>暂无数据</p>
                </card>
                <!--收费信息-->
                <card v-show="!data.cols||cols.sfxx==='Y'">
                    <template slot="header"><div class="left"><i class="fa fa-money"></i>收费信息</div></template>
                    <div style="font-weight: 600;" v-if="service.sfbz&&service.sfyj">
                        <p>收费标准：{{service.sfbz}}</p>
                        <p>收费依据：{{service.sfyj}}</p>
                    </div>
                    <p class="no" v-else>暂无数据</p>
                </card>
                <!--服务依据-->
                <card v-show="!data.cols||cols.fwyj==='Y'">
                    <template slot="header"><div class="left"><i class="fa fa-book"></i>服务依据</div></template>
                    <p v-if="data.fwyjs">
                        <template v-for="i in data.fwyjs">
                            <span v-if="i.path===''">{{i.fileName}}</span>
                            <a v-else :href="i.path.indexOf('http')>-1?i.path:filePath+i.path" target="_blank">{{i.fileName}}</a>
                        </template>

                    </p>
                    <p class="no" v-else>暂无数据</p>
                </card>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="popup" v-show="commentShow">
                <div class="content">
                    <header>
                        <img :src="$proxy+imgPath.head+service.id"/>
                        <div class="text">{{service.name}}<br/>
                            <span v-if="service.managerDeptname"><i class="fa fa-info-circle"></i>本服务由<em class="_theme_card_font">{{service.managerDeptname}}</em>提供</span>
                            <span v-else><i class="fa fa-info-circle"></i>暂无服务部门</span>
                        </div>
                    </header>
                    <div class="comment">
                        <div class="row"><span>服务评分：</span><el-rate v-model="rate"></el-rate></div>
                        <div class="row"><span>服务评论：</span><textarea v-model="textarea" rows="3"></textarea></div>
                        <div class="btn">
                            <button class="_theme" @click="saveComment">评论</button><button @click="commentShow=false">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  export default {
    name: "Detail",
    data(){
      return {
        imgPath:{
          head:'/resource/service?id=',
          fwlc:'/resource/file/show?path='
        },
        filePath:'',
        data:"",
        isFavorite:true,//收藏标识，在data内
        cols:'',//显示标识，在data内
        service:'',//服务详情，在data内
        activeName:['1','2','3','4'],
        comment:[],
        page:1,
        total:0,//总条目数
        pageSize:10,//每页显示条目个数
        commentShow:false,//评论框显示
        rate:0,//评论时打分
        textarea:''//评论时评论内容
      }
    },
    watch:{
      '$route' (to,from){
        this.getData();
        this.getComment();
      }
    },
    created(){
      this.getData();
      this.getComment();
    },
    methods:{
      getData(){
        this.$ajax.post(this.$url.serviceDetail,{id:this.$route.params.id})
            .then(res=>{
              this.isFavorite=res.data.favoritesFlag;
              this.data=res.data;
              this.cols=res.data.cols;
              this.service=res.data.service;
            })
      },
      getComment(){//获取评论列表
        this.$ajax.post(this.$url.serviceDetailComment,{id:this.$route.params.id,page:this.page})
            .then(res=>{
              this.comment=res.data.comments;
              this.total=res.data.count;
            })
      },
      saveComment(){//提交评论
        if(this.rate===0){
          this.$notify.error({
            title:'错误',
            message:'请选择评分'
          })
        }
        else if(this.textarea===''){
          this.$notify.error({
            title:'错误',
            message:'请填写评论内容'
          })
        }
        else {
          this.$ajax.post(this.$url.serviceDetailCommentSave,{thirdId:this.$route.params.id,score:this.rate,commentText:this.textarea})
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$notify.success({
                    title:'成功',
                    message:'评论成功'
                  });
                  this.commentShow=false;
                  this.getComment();
                }
              })
        }
      },
      handlePageChange(n){//监听页数改变
        this.page=n;
        this.getComment();
      },
      routerBack(){
        this.$router.go(-1);
      },
      favorite(type){//收藏
        this.$ajax.post(type==='add'?this.$url.addFavorites:this.$url.delFavorites,{thirdId:this.$route.params.id,type:"service"})
            .then(res=>{
              if(res.data.errcode==='0'){
                this.isFavorite=!this.isFavorite;
                this.$notify({
                  message: res.data.errmsg,
                  type: 'success',
                });
              }
            })
      },
    }
  }
</script>

<style>
    /*折叠面板头部颜色*/
    .el-collapse-item__header{
        font-size: 18px;
        color: #1295d8;
    }
    .el-collapse-item__wrap{
        border-top: 1px solid #ebeef5;
    }
    .el-rate__icon{
        font-size: 14px;
        margin-right: 0;
    }
</style>
<style scoped lang="scss">
    .detail{
        p.time-limit{
            background: #fff;
            width: 1200px;
            font-size: 14px;
            text-align: center;
            padding: 12px 0;
            margin: 0 auto 20px;
        }
        &>.content{
            @include flex(space-between,flex-start);
            width: 1200px;
            margin: 0 auto;
            &>.left{
                width: 784px;
                header{
                    height: auto!important;
                    padding: 10px 20px!important;
                    .left{
                        @include flex;
                        width: 600px;
                        img{
                            flex: 0 0 60px;
                            width: 60px;
                            height: 60px;
                            margin-right: 20px;
                        }
                        .info{
                            p{
                                font-size: 16px;
                                font-weight: 700;
                                color: #000;
                                margin: 0 0 10px 0;
                                button:first-child{
                                    background: #f7b47f;
                                }
                                button{
                                    display: inline-block;
                                    background: #1390d3;
                                    font-size: 12px;
                                    font-weight: 500;
                                    color: #fff;
                                    padding: 2px 5px;
                                    border: none;
                                    border-radius: 2px;
                                    margin: 0 0 0 5px;
                                }
                            }
                            span{
                                font-size: 12px;
                                font-weight: normal;
                                color: #a0a0a0;
                                cursor: pointer;
                                i{
                                    font-size: 16px;
                                    color: #fad733;
                                    margin-right: 4px;
                                }
                            }
                        }
                    }
                    a.online{
                        background: #1390d3;
                        font-size: 14px;
                        font-weight: normal;
                        color: #fff;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    a.underline{
                        font-size: 14px;
                        font-weight: normal;
                        color: #a0a0a0;
                    }
                }
                .explain{
                    padding: 15px 15px 5px;
                    p{
                        font-size: 14px;
                        margin: 0 0 10px 0;
                        em{
                            margin: 0 5px;
                        }
                        i{
                            color: #A6A6A6;
                            margin-right: 10px;
                        }
                    }
                }
                .collapse{
                    i{margin: 0 10px;}
                    a.comment{
                        float: right;
                        z-index: 99;
                        font-size: 14px;
                        color: #1295d8;
                        margin-right: 100px;
                    }
                    .content{
                        box-sizing: content-box;
                        padding: 0 15px;
                        &>.text{
                            box-sizing: border-box;
                            display: inline-block;
                            float: left;
                            width: 66%;
                            padding-right: 15px;
                        }
                        &>.img{
                            display: inline-block;
                            height: 200px;
                            width: 33%;
                            img{
                                height: 100%;
                            }
                        }
                        table {
                            width: 80%;
                            border-collapse: collapse;
                            margin: 20px auto 0;
                            text-align: center;
                            td,th{
                                border: 1px solid #cad9ea;
                                color: #666;
                                height: 30px;
                            }
                            th{
                                background-color: #CCE8EB;
                                width: 100px;
                            }
                            tr:nth-child(odd)
                            {
                                background: #fff;
                            }
                            tr:nth-child(even)
                             {
                                 background: #F5FAFA;
                             }
                        }
                        ul{
                            li{
                                @include flex;
                                padding: 15px 0;
                                border-bottom: 1px dashed #bfbfbf;
                                img{
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    margin-right: 10px;
                                }
                                &>.text{
                                    font-size: 12px;
                                    .rate{
                                        display: inline-block;
                                    }
                                    span{
                                        font-size: 14px;
                                    }
                                }
                            }
                            li:last-child{
                                border: none;
                                padding: 15px 0 0 0;
                            }
                        }
                    }
                    p.no{
                        font-size: 14px;
                        color: #bfbfbf;
                        padding: 0 15px;
                        margin-bottom: -10px;
                    }
                }
                .el-pagination{
                    text-align: right;
                    margin: 10px 0 0 0;
                }
                footer{
                    font-size: 14px;
                    color: #a0a0a0;
                    text-align: right;
                    padding: 20px;
                }
            }
            &>.right{
                width: 399px;
                .card{
                    width: 100%;
                    padding: 0 0 15px 0;
                    header{
                        .left{
                            @include flex(flex-start);
                            font-size: 18px;
                            font-weight: normal;
                            i{
                                font-size: 19px;
                                margin-right: 10px;
                            }
                        }
                    }
                    .hr{
                        /*border-top: 1px dashed #bfbfbf;*/
                    }
                    p{
                        @include flex(flex-start,flex-start);
                        i{
                            color: #a6a6a6;
                            margin: 3px 10px 0 0;
                        }
                        font-size: 14px;
                        color: #646361;
                        padding: 15px 15px 0 15px;
                        margin: 0;
                    }
                    p.no{
                        color:#bfbfbf;
                    }
                }
                .basic{
                    .enter{
                        @include flex;
                        padding: 15px;
                        border-bottom: 1px dashed #bfbfbf;
                        img{
                            flex: 0 0 70px;
                            width: 70px;
                            height: 70px;
                            margin-right: 10px;
                        }
                        .text{
                            span{
                                font-size: 12px;
                                color: #a0a0a0;
                                a{
                                    color: #0683c3;
                                }
                            }
                            p{
                                font-size: 18px;
                                color: #646361;
                                padding: 0;
                                margin: 5px 0 0 0;
                            }
                        }
                    }
                    .place-time{
                        padding-bottom: 15px;
                        border-bottom: 1px dashed #bfbfbf;
                    }
                    .task{
                        i{
                            font-size: 12px;
                            color: #A6A6A6;
                            margin-right: 10px;
                        }
                        font-size: 14px;
                        color: #646361;
                        padding: 15px 15px 10px;
                        border-bottom: 1px dashed #bfbfbf;
                        a{
                            color:#0683c3;
                        }
                    }
                }
            }
        }
        .popup{
            position: fixed;
            top:0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            background: rgba(58, 63, 81,0.8);
            .content{
                background: #fff;
                outline: 0;
                width: 900px;
                padding: 15px;
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 6px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                margin: 150px auto;
                header{
                    @include flex;
                    padding: 15px 15px 10px 15px;
                    border-bottom: 1px dashed #bfbfbf;
                    img{
                        width: 60px;
                        height: 60px;
                        margin-right: 5px;
                    }
                    .text{
                        font-size: 18px;
                        font-weight: 600;
                        color: #000;
                        span{
                            font-size: 14px;
                            font-weight: 500;
                            i{
                                color: #A6A6A6;
                                margin-right: 5px;
                            }
                            em{
                                margin: 0 5px;
                            }
                        }
                    }
                }
                .comment{
                    padding: 15px;
                    .row{
                        @include flex;
                        margin: 0 0 10px 0;
                        span{
                            font-size: 14px;
                            font-weight: 600;
                        }
                        textarea{
                            width: 80%;
                            font-size: 15px;
                            padding: 10px;
                        }
                        &:nth-child(2){
                            align-items: flex-start;
                        }
                    }
                    .btn{
                         text-align: center;
                         margin: 20px 0;
                         button{
                             font-size: 14px;
                             padding: 6px 12px;
                             border: 1px solid transparent;
                             border-radius: 2px;
                             margin-right: 5px;
                             &:first-child{
                                 color: #fff;
                             }
                             &:last-child{
                                 background: #fff;
                                 color: #58666e;
                                 border-color: #c7d3d6;
                                 box-shadow: 0 1px 1px rgba(90,90,90,.1);
                                 &:hover{
                                     background: #edf1f2;
                                 }
                             }
                         }
                     }
                }
            }
        }
    }
</style>