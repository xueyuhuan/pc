<template>
    <div id="ecard">
        <subhead>
            <div><i class="fa fa-credit-card icon"></i>一卡通 <span>Personal Card</span></div>
        </subhead>
        <section>
            <div class="left">
                <h4>消费流水查询</h4>
                <div class="row">
                    <span class="name">快捷查询：</span>
                    <span class="btn" v-for="(i,index) in date" :class="{active:index===dateActive}" @click="clickQuickDate(i.day,index)">{{i.name}}</span>
                </div>
                <div class="row last">
                    <span class="name hidden-xs-only">按日期查询：</span>
                    <el-date-picker class="date" v-model="dateStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>至
                    <el-date-picker class="date" v-model="dateEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                    <button @click="getList">查询流水</button>
                </div>
            </div>
            <div class="right">
                <div class="ecard">
                    <img src="/img/ccnu/card_1.png"/>
                    <p><span>姓名：<i>{{card.xm}}</i></span><span><i class="money">{{card.balance}}</i>元</span></p>
                    <p><span>编号：<i>{{card.username}}</i></span><span class="blod">卡内余额</span></p>
                    <p><span>部门：<i>{{card.deptName}}</i></span><img src="/img/ccnu/card_2.png"/></p>
                </div>
            </div>
        </section>
        <section>
            <header>
                <h4>查询结果：</h4>
                <ul><li class="btn" v-for="(i,index) in type" :class="{active:index===typeActive}" @click="clickType(i.type,index)">{{i.name}}</li></ul>
            </header>
            <ul class="list">
                <li><span>流水号</span><span>时间</span><span>消费类型</span><span>消费金额</span><span>余额</span><span class="hidden-xs-only">消费地点</span></li>
                <li v-for="i in list">
                    <span>{{i.transNo}}</span><span>{{i.dealDate}}</span><span>{{i.dealName}}</span><span>{{i.transMoney}}</span><span>{{i.outMoney}}</span><span class="hidden-xs-only">{{i.orgName}}</span>
                </li>
            </ul>
            <el-pagination class="page hidden-xs-only" v-if="total>limit"
                           background
                           layout="prev, pager, next"
                           @current-change="handlePageChange"
                           @prev-click="handlePageChange"
                           @next-click="handlePageChange"
                           :page-size="limit"
                           :total="total">
            </el-pagination>
            <el-pagination class="page hidden-sm-and-up" v-if="total>limit"
                           background
                           small
                           layout="prev, pager, next"
                           @current-change="handlePageChange"
                           @prev-click="handlePageChange"
                           @next-click="handlePageChange"
                           :page-size="limit"
                           :total="total">
            </el-pagination>
        </section>
    </div>
</template>

<script>
  export default {
    name: "Ecard",
    data(){
      return{
        date:[{name:"近一周",day:6},{name:"近一个月",day:30},{name:"近三个月",day:90}],
        dateActive:0,
        dateStart:'',
        dateEnd:'',
        type:[{name:'全部',type:''},{name:'消费',type:'20'},{name:'现金充值',type:'01'},{name:'主机补助',type:'70'},{name:'圈存充值',type:'04'}],
        typeActive:0,
        typeSelect:'',
        card:{},//卡信息
        page:1,
        limit:10,
        total:0,//总条数
        list:[],
      }
    },
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    created(){
      //初始近一周
      this.dateEnd=this.formatDate(new Date());
      this.oldDate(6);
      this.getCard();
      this.getList();
    },
    methods:{
      //格式化日期yyyy-mm-dd
      formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + "-" + month + "-" + strDate;
      },
      //n天前日期
      oldDate(n){
        let date = new Date();
        let milliseconds=date.getTime()-1000*60*60*24*n;
        let newDate= new Date(milliseconds);
        this.dateStart=this.formatDate(newDate);
      },
      //点击快捷日期
      clickQuickDate(day,index){
        this.dateEnd=this.formatDate(new Date());
        this.oldDate(day);
        this.dateActive=index;
        this.getList();
      },
      //点击查询类型
      clickType(type,index){
        this.typeSelect=type;
        this.typeActive=index;
        this.page=1;
        this.getList();
      },
      handlePageChange(n){//监听页数改变
        this.page=n;
        this.getList();
      },
      getCard(){
        this.$ajax.post('/ecard_portal/get_info')
            .then(res=>{
              this.card=res.data.cardInfo;
            })
      },
      getList(){
        if(this.dateStart===null){
          this.$notify.error("开始时间不能为空");
        }
        else if(this.dateEnd===null){
          this.$notify.error("结束时间不能为空");
        }
        else{
          this.$ajax.post('/ecard_portal/query_trans',{page:this.page,limit:this.limit,tranType:this.typeSelect,start:this.dateStart,end:this.dateEnd})
              .then(res=>{
                if(res.data.result){
                  this.total=res.data.result.records;
                  this.list=res.data.result.rows;
                }
                else{
                    this.total=0;
                    this.list=[];
                }
              })
        }
      },
    }
  }
</script>

<style scoped lang="scss">
    #ecard{
        section{
            @include flex(space-between,start-flex);
            flex-flow: wrap;
            background: #fff;
            @extend %width;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            h4{
                font-size: 16px;
                font-weight: 700;
                color: #3c81f2;
                margin: 0;
            }
            span.btn,li.btn{
                font-size: 12px;
                color: #58666e;
                padding: 5px 10px;
                border: 1px solid #f2f2f2;
                box-shadow: 0 1px 1px rgba(90,90,90,.1);
                border-radius: 3px;
                margin: 0 25px 0 15px;
                @media only screen and (max-width:767px) {
                    margin: 0;
                }
                cursor: pointer;
                &.active{
                    color: #3c81f2;
                }
                &:hover{
                    background: #edf1f2;
                }
            }
            .left{
                flex: 0 0 650px;
                @media only screen and (max-width:767px) {
                    flex: auto;
                    width: 100%;
                }
                padding-left: 15px;
                .row{
                    @include flex;
                    &.last{
                        @media only screen and (max-width:767px) {
                            justify-content: center;
                        }
                    }
                    flex-flow: wrap;
                    font-size: 12px;
                    margin-top: 25px;
                    span.name{
                        flex: 0 0 85px;
                        font-size: 14px;
                        color: #666;
                        text-align: left;
                    }

                    .date{
                        width: 150px;
                        margin: 0 15px;
                        @media only screen and (max-width:767px) {
                            width: 140px;
                            margin: 0 5px 10px;
                        }
                    }
                    button{
                        background: #3c81f2;
                        font-size: 12px;
                        color: #fff;
                        padding: 5px 15px;
                        border: none;
                        border-radius: 5px;
                        @media only screen and (max-width:767px) {
                            margin-bottom: 5px;
                        }
                    }
                }
            }
            .right{
                margin-right: 85px;
                @media only screen and (max-width:767px) {
                    margin: 10px 0 0 15px;
                }
                .ecard{
                    width: 320px;
                    height: 200px;
                    padding: 10px;
                    border: 1px solid #f2f2f2;
                    border-radius: 8px;
                    img:first-child{
                        width: 140px;
                        margin-bottom: 20px;
                    }
                    img:last-child{
                        width: 90px;
                        vertical-align: top;
                        margin-top: -15px;
                    }
                    p{
                        margin: 0 0 15px 20px;
                        span:first-child{
                            display: inline-block;
                            width: 180px;
                        }
                        font-size: 16px;
                        color: #999;
                        i{
                            color: #666;
                        }
                        i.money{
                            font-size: 20px;
                            font-weight: 700;
                            color: #ff3721;
                        }
                        .blod{
                            font-weight: 700;
                            color: #333;
                        }
                    }
                }
            }
        }
        section:last-child{
            display: block;
            header{
                @include flex;
                width: 100%;
                padding: 15px 20px;
                border-bottom: 1px dashed #bfbfbf;
                ul{
                    @include flex;
                    li{
                        margin: 0 0 0 15px!important;
                    }
                }
            }
            ul.list{
                padding: 0 40px;
                @media only screen and (max-width:767px) {
                    padding: 0;
                }
                margin: 30px 0 0 0;
                li:first-child{
                    span{
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                li{
                    @include flex;
                    border-bottom: 1px solid #f2f2f2;
                    span{
                        flex: 1;
                        font-size: 12px;
                        color: #666;
                        text-align: center;
                        padding: 15px 0;
                    }
                }
            }
            .page{
                text-align: right;
                margin: 25px;
            }
        }
    }
</style>