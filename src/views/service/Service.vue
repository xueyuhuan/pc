<template>
    <div class="service">
        <subhead>
            <div class="left">
                <i class="fa fa-list"></i>&nbsp;&nbsp;&nbsp;服务中心&nbsp;<span>Service&nbsp;Center</span>
            </div>
            <SubheadInput>
                <input slot="input" v-model="key" placeholder="服务搜索"/><router-link to="/service/search/icon"><button><i class="fa fa-search"></i></button></router-link>
            </SubheadInput>
        </subhead>
        <div class="top">
            <card class="recommend">
                <template slot="header">推荐服务</template>
                <ul>
                    <li v-for="i in list.recommend"><router-link :to="'/service/detail/'+i.id">
                        <img :src="$proxy+imgPath+i.id"/>
                        <p :title="i.name">{{i.name}}</p>
                        <span>{{i.type2Name}}</span>
                        <el-rate v-model="i.score" disabled></el-rate>
                    </router-link></li>
                </ul>
            </card>
            <card class="deadline">
                <template slot="header">限时办理</template>
                <div style="overflow: hidden;height: 204px;">
                    <ul v-if="list.deadline.length>0" :class="{anim:animate}">
                        <li v-for="i in list.deadline">
                            <a @click="enterService(i)">
                                <img :src="$proxy+imgPath+i.id"/>
                                <div class="info">
                                    <p :title="i.name">{{i.name}}</p>
                                    <span>到期时间：{{i.deadlineEnd}}</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <img v-else src="/img/no_data.png"/>
                </div>
            </card>
        </div>
        <CardTemp class="bottom">
            <header slot="header">服务目录
                <ul v-show="type!==-1">
                    <li @click="clickType2('',-1)" :class="{active:type2===-1}">全部</li>
                    <li v-for="(i,index) in list.type2" @click="clickType2(i.id,index)" :class="{active:type2===index}">{{i.name}}</li>
                </ul>
            </header>
            <div class="content">
                <ul class="catalog">
                    <li class="_theme" @click="getHot" :class="{active:type===-1}">热门服务</li>
                    <li class="_theme" v-for="(i,index) in list.type" @click="clickType1(i.id,index)" :class="{active:type===index}">{{i.name}}</li>
                </ul>
                <div>
                    <ul class="list"><li v-for="i in list.list">
                        <a @click="enterService(i)">
                            <img :src="$proxy+imgPath+i.id"/>
                            <div class="info">
                                <p :title="i.name">{{i.name}}</p>
                                <span>{{i.type2Name}}</span>
                                <el-rate v-model="i.score" disabled show-score score-template=" {value}分"></el-rate>
                            </div>
                        </a>
                        <router-link :to="'/service/detail/'+i.id"><i class="fa fa-question-circle _theme_font"></i></router-link>
                    </li></ul>
                    <el-pagination v-show="type!==-1&&total>1"
                            background
                            layout="prev, pager, next"
                            @current-change="handlePageChange"
                            @prev-click="handlePageChange"
                            @next-click="handlePageChange"
                            :page-count="total">
                    </el-pagination>
                </div>
            </div>
        </CardTemp>
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
        imgPath:'/resource/service?id=',
        type:-1,//一级目录选中标识
        typeID:"",
        type2:-1,//二级目录选中标识
        type2ID:"",
        list:{
          recommend:[],//推荐服务列表
          deadline:[],
          type:[],//纵向一级目录
          type2:[],//横向二级目录
          list:[],
        },
        animate:false
      }
    },
    created(){
      this.getRecommend();
      this.$ajax.post(this.$url.serviceDeadline)
          .then(res=>{
            this.list.deadline=res.data.services;
          })
          .then(()=>{
            if(this.list.deadline.length>3){
              setInterval(this.scroll,5000);
            }
          });
      this.getHot();
      this.getType();
    },
    methods:{
      //进入服务
      enterService(i){
        if(i.lineAble==='1'){//线上
          if(i.fwfs==='0'){//访问限制
            this.$ajax.post('/service_portal/validate_fwfs')
                .then(res=>{
                  if(res.data.errmsg===''){
                    this.openService(i);
                  }
                  else {
                    this.$notify.error(res.data.errmsg);
                  }
                })
          }
          else {
            this.openService(i);
          }
        }
        else{
          this.$router.push({path: '/service/detail/'+i.id});
        }
      },
      //打开服务
      openService(i){
        if(i.openType==='1'){
          this.$router.push({path: '/service/iframe/'+i.id});
        }
        else{
          window.open(i.url);
        }
      },
      scroll() {
        this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.list.deadline.push(this.list.deadline[0]);  // 将数组的第一个元素添加到数组的
          this.list.deadline.shift();               //删除数组的第一个元素
          this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
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
    .anim {
        transition: all 0.5s;
        margin-top: -68px;
    }
    .service{
        .top{
            @include flex(space-between,stretch);
            width: 1200px;
            margin: 0 auto;
            .recommend{
                width: 784px;
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
                            color: #000;
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
            .deadline{
                width: 399px;
                text-align: center;
                ul{
                    @include flex;
                    flex-flow: column;
                    height: 204px;
                    overflow: hidden;
                    li{
                        flex: 0 0 68px;
                        height: 68px;
                        width: 100%;
                        a{
                            &:hover{
                                background-color: #eee;
                            }
                            @include flex;
                            height: 100%;
                            width: 100%;
                            text-align: left;
                            padding: 15px 20px;
                            cursor: pointer;
                            img{
                                width: 46px;
                                height: 46px;
                                margin: 0 20px 0 0;
                            }
                            p{
                                width: 152px;
                                font-size: 14px;
                                color: #000;
                                margin: 0;
                                @extend %ellipsis;
                            }
                            span{
                                font-size: 12px;
                                color: #959595;
                            }
                        }
                    }
                }
                img{
                    height: 200px;
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
                            cursor: pointer;
                            img{
                                width: 46px;
                                height: 46px;
                                margin: 0 20px 0 0;
                            }
                            p{
                                width: 152px;
                                font-size: 14px;
                                color: #000;
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