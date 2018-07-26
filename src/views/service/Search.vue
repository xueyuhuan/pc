<template>
    <div class="search">
        <subhead>
            <div class="left">
                <i class="fa" :class="[{'fa-arrow-left':$school.school==='ccnu'},{'fa-list':$school.school==='hit'}]" style="cursor: pointer" @click="routerBack"></i>&nbsp;&nbsp;&nbsp;服务中心&nbsp;<span>Service&nbsp;Center</span>
            </div>
            <SubheadInput>
                <input slot="input" v-model="searchData.key" placeholder="服务搜索"/><button @click="getList"><i class="fa fa-search"></i></button>
            </SubheadInput>
        </subhead>
        <CardTemp class="menu">
            <section><div class="name">服务领域：</div>
                <span class="all _theme_card_span" :class="{active:active.type2===-1}" @click="conditionSelect('',-1,'type2')">全部</span>
                <ul>
                    <li v-for="(i,index) in FWLY"><span class="_theme_card_span" :class="{active:index===active.type2}" @click="conditionSelect(i,index,'type2')">{{i.name}}</span></li>
                </ul>
            </section>
            <section><div class="name">负责部门：</div>
                <span class="all _theme_card_span" :class="{active:active.managerDeptId===-1}" @click="conditionSelect('',-1,'managerDeptId')">全部</span>
                <ul>
                    <li v-for="(i,index) in FZBM"><span class="_theme_card_span" :class="{active:index===active.managerDeptId}" @click="conditionSelect(i,index,'managerDeptId')">{{i.name}}</span></li>
                </ul>
            </section>
            <section><div class="name">服务方式：</div>
                <span class="all _theme_card_span" :class="{active:active.lineAble===-1}" @click="conditionSelect('',-1,'lineAble')">全部</span>
                <ul>
                    <li v-for="(i,index) in FWFS"><span class="_theme_card_span" :class="{active:index===active.lineAble}" @click="conditionSelect(i,index,'lineAble')">{{i.name}}</span></li>
                </ul>
            </section>
            <section v-if="$school.school==='hit'"><div class="name">服务地点：</div>
                <span class="all _theme_card_span" :class="{active:active.isJzdt===-1}" @click="conditionSelect('',-1,'isJzdt')">全部</span>
                <ul>
                    <li v-for="(i,index) in FWDD"><span class="_theme_card_span" :class="{active:index===active.isJzdt}" @click="conditionSelect(i,index,'isJzdt')"><i v-if="index===0" class="fa fa-building-o">&nbsp;</i>{{i.name}}</span></li>
                </ul>
            </section>
            <section><div class="name">服务对象：</div>
                <span class="all _theme_card_span" :class="{active:active.userGroupId===-1}" @click="conditionSelect('',-1,'userGroupId')">全部</span>
                <ul>
                    <li v-for="(i,index) in FWDX"><span class="_theme_card_span" :class="{active:index===active.userGroupId}" @click="conditionSelect(i,index,'userGroupId')">{{i.groupName}}</span></li>
                </ul>
            </section>
        </CardTemp>
        <div class="condition" v-show="condition.type2||condition.managerDeptId||condition.lineAble||condition.isJzdt||condition.userGroupId||searchData.key">检索条件：
            <span class="item" v-show="condition.type2">服务领域：{{condition.type2}}</span>
            <span class="item" v-show="condition.managerDeptId">负责部门：{{condition.managerDeptId}}</span>
            <span class="item" v-show="condition.lineAble">服务方式：{{condition.lineAble}}</span>
            <span class="item" v-show="condition.isJzdt">服务地点：{{condition.isJzdt}}</span>
            <span class="item" v-show="condition.userGroupId">服务对象：{{condition.userGroupId}}</span>
            <span class="item" v-show="searchData.key">检索词：{{searchData.key}}</span>
            <span class="clear" @click="conditionClear"><i class="fa fa-close"></i>&nbsp;清空检索条件</span>
        </div>
        <card class="list">
            <template slot="header">
                <div class="left">共为您检索到<em>{{data.count}}</em>项服务，<template v-if="$school.school==='hit'"><em>{{data.jzdtCount}}</em>项已经进驻师生服务中心, </template><em>{{data.lineCount}}</em>项可部分或全部线上办理</div>
                <div class="right">
                    排序：<i class="fa fa-eye" @click="order('view')" :class="{active:searchData.orderBy==='view'}">&nbsp;热度</i><i class="fa fa-star" @click="order('fav')" :class="{active:searchData.orderBy==='fav'}">&nbsp;收藏</i>
                    <span></span>
                    排列：<router-link to="/service/search/list"><i class="fa fa-align-justify" :class="{active:show==='list'}" @click="show='list'">&nbsp;列表方式</i></router-link>
                    <router-link to="/service/search/icon"><i class="fa fa-th" :class="{active:show==='icon'}" @click="show='icon'">&nbsp;图标方式</i></router-link>
                </div>
            </template>
            <router-view></router-view>
            <el-pagination v-show="data.count>12"
                           background
                           layout="prev, pager, next"
                           @current-change="handlePageChange"
                           @prev-click="handlePageChange"
                           @next-click="handlePageChange"
                           :page-size=searchData.limit
                           :total="data.count">
            </el-pagination>
        </card>
    </div>
</template>

<script>
  export default {
    name: "Search",
    data(){
      return{
        FWLY:[],
        FZBM:[],
        FWFS:[{name:"线上服务",id:"1"}, {name:"线下服务",id:"0"},],
        FWDD:[{name:"进驻师生服务中心",id:"1"}, {name:"未进驻师生服务中心",id:"0"},],
        FWDX:[],
        active:{//检索项选中状态
          type2:-1,
          managerDeptId:-1,
          lineAble:-1,
          isJzdt:-1,
          userGroupId:-1,
        },
        condition:{//检索条件
          type2:"",
          managerDeptId:"",
          lineAble:"",
          isJzdt:"",
          userGroupId:"",
        },
        searchData:{//请求列表数据格式
          page:1,
          limit:20,
          key:"",
          orderBy:"",
          type2:"",
          managerDeptId:"",
          lineAble:"",
          userGroupId:"",
          isJzdt:""
        },
        data:{
          count:0,//总数
          jzdtCount:0,//进驻数
          lineCount:0,//线上数
          list:[],//列表
        },
      }
    },
    computed:{
      show:{//排列显示方式list or icon
        get() {
          return this.$route.path.indexOf('icon')>0?'icon':'list';
        },
        set() {

        }
      }
    },
    created(){
      if(localStorage.active||localStorage.condition||localStorage.searchData){
        this.active=JSON.parse(localStorage.active);
        this.condition=JSON.parse(localStorage.condition);
        this.searchData=JSON.parse(localStorage.searchData);
        this.searchData.page=1;
      }
      this.getFWLY();
      this.getFZBM();
      this.getFWDX();
      this.getList();
    },
    methods:{
      conditionSelect(i,index,type,clear){
        this.active[type]=index;
        this.condition[type]=type==='userGroupId'?i.groupName:i.name;
        this.searchData.page=1;
        this.searchData[type]=i.id;
        if(clear!=='y'){
          this.getList();
        }
      },
      conditionClear(){
        this.conditionSelect('',-1,'type2',"y");
        this.conditionSelect('',-1,'managerDeptId',"y");
        this.conditionSelect('',-1,'lineAble',"y");
        this.conditionSelect('',-1,'isJzdt',"y");
        this.conditionSelect('',-1,'userGroupId',"y");
        this.searchData.key='';
        this.getList();
      },
      order(type){
        this.searchData.orderBy=type;
        this.getList();
      },
      routerBack(){
        this.$router.push("/service");
      },
      getFWLY(){
        this.$ajax.post(this.$url.serviceFWLY)
            .then(res=>{
              this.FWLY=res.data.serviceTypeList;
            })
      },
      getFZBM(){
        this.$ajax.post(this.$url.serviceFZBM)
            .then(res=>{
              this.FZBM=res.data.depts;
            })
      },
      getFWDX(){
        this.$ajax.post(this.$url.serviceFWDX)
            .then(res=>{
              this.FWDX=res.data.groups;
            })
      },
      getList(){
        this.$ajax.post(this.$url.serviceSearch,this.searchData)
            .then(res=>{
              localStorage.active=JSON.stringify(this.active);
              localStorage.condition=JSON.stringify(this.condition);
              localStorage.searchData=JSON.stringify(this.searchData);
              this.data.count=res.data.page.records;
              this.data.jzdtCount=res.data.jzdtCount;
              this.data.lineCount=res.data.lineCount;
              this.data.list=res.data.page.rows;
              this.$store.commit('set_data',{
                data:res.data.page,
                name:'search'
              })
            })
      },
      handlePageChange(n){//监听页数改变
        this.searchData.page=n;
        this.getList();
      },
    }
  }
</script>
<style scoped lang="scss">
    .search{
        .subhead{
            .right{
                height: 30px;
                input{
                    background: #069;
                    width: 160px;
                    height: 100%;
                    font-size: 12px;
                    color: $skin-card;
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
        .menu{
            width: 1200px;
            padding: 10px 20px;
            margin: 0 auto;
            section{
                @include flex(flex-start,flex-start);
                font-size: 14px;
                color: #000;
                padding: 10px 0;
                .name{
                    flex: 0 0 80px;
                }
                .all{
                    flex: 0 0 45px;
                    margin: 0 30px 0 10px;
                }
                span{
                    display: inline-block;
                    text-align: center;
                    padding: 3px 5px;
                    border-radius: 2px;
                    cursor: pointer;
                }
                span:hover{
                    color: #f39b42;
                }
                span.active{
                    color: #fff;
                    background: $skin-card;
                }
                ul{
                    @include flex(flex-start,flex-start);
                    flex-flow: wrap;
                    li{
                        margin-right: 5px;
                    }
                }
            }
        }
        .condition{
            background: #fff;
            width: 1200px;
            font-size: 14px;
            padding: 10px 20px;
            margin: 4px auto 0;
            .item{
                color: #0683c3;
                margin-left: 20px;
            }
            .clear{
                margin-left: 100px;
                cursor: pointer;
            }
        }
        .list{
            width: 1200px;
            padding: 0 0 30px 0;
            margin: 20px auto;
            header{
                .left{
                    font-size: 14px;
                    font-weight: normal;
                    color: #000;
                    em{
                        color: #f39b42;
                    }
                }
                .right{
                    font-size: 14px;
                    font-weight: normal;
                    color: #000;
                    span{
                        border-right: 1px solid #cecece;
                        margin: 0 0 0 15px;
                    }
                    i{
                        margin-left: 10px;
                        cursor: pointer;
                    }
                    i.active{
                        color: $skin-card;
                    }
                }
            }
            .el-pagination{
                text-align: right;
                margin: 20px 0 0 0;
            }
        }
    }
</style>