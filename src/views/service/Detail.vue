<template>
    <div class="detail">
        <subhead>
            <div><i class="fa fa-arrow-left" style="cursor: pointer" @click="routerBack"></i>&nbsp;&nbsp;&nbsp;服务详情</div>
        </subhead>
        <div class="content">
            <card>
                <header>
                    <div class="left">
                        <img :src="proxy+imgPath.head+data.service.id"/>
                        <div class="info">
                            <p>{{data.service.name}}<button>{{data.service.lineAble==="1"?"线上":"线下"}}</button><button>{{data.service.type1Name}}</button><button>{{data.service.type2Name}}</button></p>
                            <span v-show="!isFavorite" @click="favorite('add')"><i class="fa fa-star-o"></i>点击收藏</span>
                            <span v-show="isFavorite" @click="favorite('del')"><i class="fa fa-star"></i>点击取消</span>
                        </div>
                    </div>
                    <a>进入服务</a>
                </header>
                <div class="explain">
                    <p v-if="data.service.managerDeptname"><i class="fa fa-info-circle"></i>本服务由<em>{{data.service.managerDeptname}}</em>提供</p>
                    <p v-else><i class="fa fa-info-circle"></i>暂无服务部门</p>
                    <p v-if="data.service.fwdxsm"><i class="fa fa-info-circle"></i>本服务的服务对象为<em>{{data.service.fwdxsm}}</em></p>
                    <p v-else><i class="fa fa-info-circle"></i>暂无服务对象</p>
                </div>
                <el-collapse class="collapse" v-model="activeName">
                    <el-collapse-item name="1">
                        <template slot="title"><i class="fa fa-file-text-o"></i>办理说明</template>
                        <div v-if="data.service.description" class="content" v-html="data.service.description"></div>
                        <p v-else class="no">暂无数据</p>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title"><i class="fa fa-file-text-o"></i>服务流程</template>
                        <div class="content">
                            <div class="text"><p class="no" v-if="data.service.fwlcsm===''">暂无数据</p><div v-else v-html="data.service.fwlcsm"></div></div>
                            <div class="img" v-if="data.fwlcs&&data.fwlcs.length>0">
                                <el-carousel v-if="data.fwlcs.length>1">
                                    <el-carousel-item v-for="i in data.fwlcs" >
                                        <a v-if="[i.path].indexOf('http')>0" :href="i.path" target="_blank"><img :src="i.path"/></a>
                                        <a :href="proxy+imgPath.fwlc+i.path" target="_blank"><img :src="proxy+imgPath.fwlc+i.path"/></a>
                                    </el-carousel-item>
                                </el-carousel>
                                <template v-else>
                                    <a v-if="data.fwlcs[0].path.indexOf('http')>0" :href="data.fwlcs[0].path" target="_blank"><img :src="data.fwlcs[0].path"/></a>
                                    <a v-else :href="proxy+imgPath.fwlc+data.fwlcs[0].path" target="_blank"><img :src="proxy+imgPath.fwlc+data.fwlcs[0].path"/></a>
                                </template>
                            </div>
                        </div>

                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title"><i class="fa fa-file-text-o"></i>所需材料</template>
                        <div class="content" v-if="data.sxcls&&data.sxcls.length>0">
                            <table>
                                <thead><tr><th></th><th>材料名称</th><th>下载</th></tr></thead>
                                <tr v-for="(i,index) in data.sxcls">
                                    <td>{{index+1}}</td>
                                    <td>{{i.fileName}}</td>
                                    <td><a v-if="i.path.indexOf('http')>0" :href="i.path" target="_blank"><i class="fa fa-download"></i></a>
                                        <a v-else :href="proxy+i.path" target="_blank"><i class="fa fa-download"></i></a></td>
                                </tr>
                            </table>
                        </div>
                        <p class="no" v-else>暂无数据</p>
                    </el-collapse-item>
                    <el-collapse-item name="4" v-if="data.service.isKfpj==='1'">
                        <template slot="title"><i class="fa fa-file-text-o"></i>用户评价<a class="comment">评价</a></template>
                        <div class="content" v-if="comment.length>0">
                            <ul>
                                <li v-for="i in comment"><img :src="i.PATH?i.PATH:'img/a0.jpg'"/>
                                    <div class="text">{{i.USERNAME}}&nbsp;&nbsp;<el-rate class="rate" v-model="i.SCORE" disabled></el-rate><br/><span>{{i.COMMENT_TEXT}}</span></div>
                                </li>
                            </ul>
                        </div>
                        <p class="no" v-else>暂无数据</p>
                    </el-collapse-item>
                </el-collapse>
                <el-pagination v-show="this.total>1"
                               background
                               layout="prev, pager, next"
                               @current-change="handlePageChange"
                               @prev-click="handlePageChange"
                               @next-click="handlePageChange"
                               :page-size=pageSize
                               :total=total>
                </el-pagination>
                <footer>监督电话：{{data.service.jddh}} | 更新时间 : {{data.service.whenModifiedStr}} | 更新人：{{data.service.createUserxm}}</footer>
            </card>
            <div class="right">
                <card>
                    <header><i class="fa fa-info-circle"></i>基本信息</header>
                    <p v-if="data.service.place"><i class="fa fa-location-arrow"></i>{{data.service.place}}</p>
                    <p v-if="data.service.handleTime"><i class="fa fa-clock-o"></i>{{data.service.handleTime}}</p>
                    <p v-if="data.service.managerTel"><i class="fa fa-phone"></i>{{data.service.managerTel}} {{data.service.manager}}</p>
                </card>
                <card>
                    <header><i class="fa fa-info-circle"></i>注意事项</header>
                    <div v-if="data.service.notice" style="font-size: 14px;padding: 0 15px;" v-html="data.service.notice"></div>
                    <p class="no" v-else>暂无数据</p>
                </card>
                <card>
                    <header><i class="fa fa-info-circle"></i>收费信息</header>
                    <div v-if="data.service.sfbz&&data.service.sfyj">
                        <p>收费标准{{data.service.sfbz}}</p>
                        <p>收费依据{{data.service.sfyj}}</p>
                    </div>
                    <p class="no" v-else>暂无数据</p>
                </card>
                <card>
                    <header><i class="fa fa-info-circle"></i>服务依据</header>
                    <div v-if="data.fwyjs">
                        <a v-for="i in data.fwyjs" :href="i.path.indexOf('http')?'i.path':filePath+i.path" target="_blank">{{i.fileName}}</a>
                    </div>
                    <p class="no" v-else>暂无数据</p>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Detail",
    data(){
      return {
        proxy:process.env.NODE_ENV==='production'?'':'/api',
        imgPath:{
          head:'/resource/service?id=',
          fwlc:'/resource/file/show?path='
        },
        filePath:'',
        data:"",
        isFavorite:true,
        activeName:['1','2','3','4'],
        comment:[],
        page:1,
        total:0,
        pageSize:10
      }
    },
    computed:{
      id(){
        return this.$route.params.id;
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
        this.$ajax.post(this.$url.serviceDetail,{id:this.id})
            .then(res=>{
              this.isFavorite=res.data.favoritesFlag;
              this.data=res.data;
            })
      },
      getComment(){
        this.$ajax.post(this.$url.serviceDetailComment,{id:this.id,page:this.page})
            .then(res=>{
              this.comment=res.data.comments;
              this.total=res.data.count;
            })
      },
      handlePageChange(n){//监听页数改变
        this.page=n;
        this.getComment();
      },
      routerBack(){
        this.$router.go(-1);
      },
      favorite(type){
        this.$ajax.post(type==='add'?this.$url.addFavorites:this.$url.delFavorites,{thirdId:this.id,type:"service"})
            .then(res=>{
              if(res.data.errcode==='0'){
                this.isFavorite=!this.isFavorite;
                this.$notify({
                  message: res.data.errmsg,
                  type: 'success',
                  position: 'bottom-right'
                });
              }
            })
      },
    }
  }
</script>
<style>
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
        &>.content{
            @include flex(space-between,flex-start);
            width: 1200px;
            margin: 0 auto;
            .card:first-child{
                width: 784px;
                header{
                    height: auto;
                    padding: 10px 20px;
                    .left{
                        @include flex;
                        img{
                            width: 60px;
                            height: 60px;
                            margin-right: 20px;
                        }
                        .info{
                            p{
                                @include flex;
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
                    a{
                        background: #1390d3;
                        font-size: 14px;
                        font-weight: normal;
                        color: #fff;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }
                .explain{
                    padding: 15px 15px 5px;
                    p{
                        font-size: 14px;
                        margin: 0 0 10px 0;
                        em{
                            color: #00697e;
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
                            width: 500px;
                            border-collapse: collapse;
                            margin: 0 auto;
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
                        @include flex(flex-start);
                        font-size: 18px;
                        font-weight: normal;
                        i{
                            font-size: 19px;
                            margin-right: 10px;
                        }
                    }
                    p{
                        i{
                            margin-right: 10px;
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
            }
        }
    }
</style>