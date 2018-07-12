<template>
    <div class="service">
        <subhead>
            <div class="left">
                <i class="fa fa-list"></i>&nbsp;&nbsp;&nbsp;服务中心&nbsp;<span>Service&nbsp;Center</span>
            </div>
            <div class="right">
                <input v-model="key" placeholder="服务搜索"/><button><i class="fa fa-search"></i></button>
            </div>
        </subhead>
        <div class="top">
            <card class="recommend">
                <header>推荐服务</header>
                <ul>
                    <li v-for="i in list.recommend"><a>
                        <img :src="imgPath+i.id"/>
                        <p>{{i.name}}</p>
                        <span>{{i.type2Name}}</span>
                        <el-rate v-model="i.score" disabled></el-rate>
                    </a></li>
                </ul>
            </card>
            <card class="deadline">
                <header>限时办理</header>
                <img src="/api/img/no_data.png"/>
            </card>
        </div>
        <card class="bottom">
            <header>服务目录
                <ul v-show="type!==-1">
                    <li @click="clickType2('',-1)" :class="{active:type2===-1}">全部</li>
                    <li v-for="(i,index) in list.type2" @click="clickType2(i.id,index)" :class="{active:type2===index}">{{i.name}}</li>
                </ul>
            </header>
            <div class="content">
                <ul class="catalog">
                    <li @click="getHot" :class="{active:type===-1}">热门服务</li>
                    <li v-for="(i,index) in list.type" @click="clickType1(i.id,index)" :class="{active:type===index}">{{i.name}}</li>
                </ul>
                <div>
                    <ul class="list"><li v-for="i in list.list">
                        <a>
                            <img :src="imgPath+i.id"/>
                            <div class="info">
                                <p>{{i.name}}</p>
                                <span>{{i.type2Name}}</span>
                                <el-rate v-model="i.score" disabled show-score score-template=" {value}.00分"></el-rate>
                            </div>
                        </a>
                        <a><i class="fa fa-question-circle"></i></a>
                    </li></ul>
                    <el-pagination v-show="type!==-1&&this.total>1" :current-page=page
                            background
                            layout="prev, pager, next"
                            @current-change="handlePageChange"
                            @prev-click="handlePageChange"
                            @next-click="handlePageChange"
                            :page-count="this.total">
                    </el-pagination>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
  export default {
    name: "Service",
    data(){
      return{
        key:'',
        page:1,
        limit:12,
        total:1,
        imgPath:'/api/resource/service?id=',
        type:-1,//一级目录选中标识
        typeID:"",
        type2:-1,//二级目录选中标识
        type2ID:"",
        list:{
          recommend:[],//推荐服务列表
          type:[],//纵向一级目录
          type2:[],//横向二级目录
          list:[],
        }
      }
    },
    created(){
      this.getRecommend();
      this.getHot();
      this.getType();
    },
    methods:{
      clickType2(id,index){//点击二级目录
        this.page=1;
        this.type2ID=id;
        this.type2=index;
        this.getList();
      },
      clickType1(id,index){//点击一级目录
        this.page=1;
        this.type2ID="";
        this.type2=-1;
        this.typeID=id;
        this.type=index;
        this.getType2();
        this.getList();
      },
      handlePageChange(n){//监听页数改变
        this.page=n;
        this.getList();
      },
      getList(){//获取列表
        this.$ajax.post(this.$url.serviceList,{page:this.page, limit:this.limit, serviceType:this.type2ID, serviceFwlx:this.typeID,})
            .then(res=>{
              this.total=res.data.page.total;
              this.list.list=res.data.page.rows;
            })
      },
      getType2(){//获取二级目录
        this.$ajax.post(this.$url.serviceType2,{fwlx:this.typeID})
            .then(res=>{
              this.list.type2=res.data.serviceTypeList;
            })
      },
      getType(){//获取一级目录
        this.$ajax.post(this.$url.serviceType)
            .then(res=>{
              this.list.type=res.data.serviceFwlxList;
            })
      },
      getRecommend(){//获取推荐服务
        this.$ajax.post(this.$url.serviceRecommend)
            .then(res=>{
              this.list.recommend=res.data.services.slice(0,5);
            })
      },
      getHot(){//获取热门服务（对个人）
        this.type=-1;
        this.$ajax.post(this.$url.serviceHot)
            .then(res=>{
              this.list.list=res.data.services.slice(0,12);
            })
      }
    }
  }
</script>
<style>
    .el-rate__icon{margin-right: 0;}
    .service .bottom .el-rate__icon,.el-rate__text{
        font-size: 12px;
    }
</style>
<style scoped lang="scss">
    .service{
        .subhead{
            .right{
                height: 30px;
                input{
                    background: #069;
                    width: 160px;
                    height: 100%;
                    font-size: 12px;
                    padding: 5px 15px;
                    border-radius: 30px 0 0 30px;
                    border: none;
                }
                button{
                    background: #069;
                    height: 100%;
                    font-size: 12px;
                    padding: 5px 10px;
                    border-radius: 0 30px 30px 0;
                    border: none;
                    i{
                        color: #1295d8;
                    }
                }
            }
        }
        .top{
            @include flex(space-between,stretch);
            width: 1200px;
            margin: 0 auto;
            .recommend{
                width: 784px;
            }
            .deadline{
                width: 399px;
                text-align: center;
                img{
                    height: 200px;
                }
            }
            ul{
                @include flex;
                li:hover{
                    background-color: #eee;
                }
                li{
                    width: 155px;
                    text-align: center;
                    padding: 20px 10px;
                    img{
                        width: 85px;
                        height: 85px;
                    }
                    p{
                        font-size: 14px;
                        margin: 15px 0 0 0;
                        @extend %ellipsis;
                    }
                    span{
                        font-size: 12px;
                        color: #959595;
                    }
                }
            }
        }
        .bottom{
            width: 1200px;
            margin: 0 auto;
            header{
                @include flex(flex-start);
                font-size: 20px;
                ul{
                    @include flex;
                    height: 100%;
                    padding: 1px 0;
                    margin: 0 0 0 40px;
                    li{
                        @include flex;
                        height: 100%;
                        font-size: 14px;
                        font-weight: normal;
                        color: #363f44;
                        padding: 0 10px;
                        cursor: pointer;
                        &.active{
                            color: #fb8c00;
                            border-bottom: 3px solid #fb8c00;
                        }
                    }
                }
            }
            .content{
                @include flex(space-between,flex-start);
                ul.catalog{
                    li{
                        background-color: #2aa8e9;
                        width: 127px;
                        line-height: 43px;
                        font-size: 15px;
                        color: #fff;
                        text-align: center;
                        margin-bottom: 1px;
                        cursor: pointer;
                        &.active{
                            background: #0683c3;
                        }
                    }
                }
                ul.list{
                    @include flex;
                    flex-flow: wrap;
                    width: 1064px;
                    padding: 10px;
                    li{
                        @include flex;
                        width: 338px;
                        height: 90px;
                        border: 1px solid #e5e5e5;
                        margin: 0 0 10px 10px;
                        a:first-child{
                            &:hover{
                                background-color: #eee;
                            }
                            @include flex;
                            width: 270px;
                            padding: 15px 20px;
                            border-right: 1px solid #f0f0f0;
                            img{
                                width: 46px;
                                height: 46px;
                                margin: 0 20px 0 0;
                            }
                            p{
                                width: 152px;
                                font-size: 14px;
                                margin: 0;
                                @extend %ellipsis;
                            }
                            span{
                                font-size: 12px;
                                color: #959595;
                            }
                        }
                        a:last-child{
                            &:hover{
                                background-color: #eee;
                            }
                            flex: 1;
                            @include flex(center);
                            height: 100%;
                            font-size: 20px;
                            color: #2aa8e9;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>