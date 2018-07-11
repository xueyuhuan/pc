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
            <header>服务目录</header>
            <div class="content">
                <ul class="catalog">
                    <li>热门服务</li>
                    <li>热门服务</li>
                </ul>
                <ul class="list"><li v-for="i in list.hot">
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
        imgPath:'/api/resource/service?id=',
        list:{
          recommend:[],//推荐服务列表
          hot:[],//热门服务列表
        }
      }
    },
    created(){
      this.getRecommend();
      this.getHot();
    },
    methods:{
      getRecommend(){//获取推荐服务
        this.$ajax.post(this.$url.serviceRecommend)
            .then(res=>{
              this.list.recommend=res.data.services.slice(0,5);
            })
      },
      getHot(){//获取热门服务（对个人）
        this.$ajax.post(this.$url.serviceHot)
            .then(res=>{
              this.list.hot=res.data.services.slice(0,12);
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
            .content{
                @include flex(space-between,flex-start);
                ul.catalog{
                    li{
                        background-color: #2aa8e9;
                        width: 127px;
                        text-align: center;
                        font-size: 15px;
                        color: #fff;
                        line-height: 43px;
                        margin-bottom: 1px;
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
                            flex: 1;
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