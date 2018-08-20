<template>
    <div id="feedback">
        <subhead>
            <div><i class="iconfont icon-fankuiwenti"></i>&nbsp;&nbsp;&nbsp;意见反馈&nbsp;<span>Feedback</span></div>
        </subhead>
        <cardTemp>
            <ul class="nav"><li v-for="(i,index) in nav" @click="navActive=index" :class="{active:index===navActive}">{{i.name}}</li></ul>
            <template v-if="navActive===0">
                <ul class="form">
                    <li>工号学号<input class="left number" v-model="user.username" disabled/></li>
                    <li>问题类别
                        <select class="left" v-model="data.type">
                            <option disabled value="">请选择</option>
                            <option :value="i" v-for="i in types">{{i}}</option>
                        </select></li>
                    <li>联系方式<input v-model="data.tel" placeholder="请留下联系电话或邮箱，方便我们及时告知您处理结果" class="left"/></li>
                    <li>内容描述<textarea v-model="data.content" placeholder="请详细描述您遇到的问题、您的意见及建议" class="left"></textarea></li>
                </ul>
                <div class="btn"><button @click="add">提交</button></div>
            </template>
            <template v-else>
                <ul class="list"><li v-for="i in list.rows" @click="see(i)">
                    <div class="text"><p>{{i.content}}</p><span>{{i.type}}&nbsp;&nbsp;&nbsp;&nbsp;{{i.whenCreatedStr}}</span></div>
                    <i class="fa fa-file-text">&nbsp;&nbsp;查看</i>
                </li></ul>
                <el-pagination v-show="list.total>0"
                               background
                               layout="prev, pager, next"
                               @current-change="handlePageChange"
                               @prev-click="handlePageChange"
                               @next-click="handlePageChange"
                               :page-count="list.total">
                </el-pagination>
            </template>
        </cardTemp>
        <div class="popup" v-show="popupShow">
            <div class="content">
                <h3>详情</h3>
                <ul class="form">
                    <li>问题类型<input v-model="detail.type" class="left number" disabled/></li>
                    <li>联系方式<input v-model="detail.tel" class="left number" disabled/></li>
                    <li>内容描述<textarea v-model="detail.content" class="left number" disabled></textarea></li>
                </ul>
                <div class="btn"><button @click="popupShow=false">关闭</button></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "feedback",
    data(){
      return{
        nav:[{name:"我要反馈"},{name:"我的反馈"}],
          types:['BUG反馈','功能建议', '其他问题'],
        navActive:0,
        data:{
          username: "",
          tel: "",
          type: "",
          content: ""
        },
        page:1,
        limit:10,
        list:[],
        popupShow:false,
        detail:''
      }
    },
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    created(){
      this.getList();
    },
    methods:{
      add(){
        if(this.data.type===''){
          this.$notify.error('请选择问题类型');
        }
        else if(this.data.tel===''){
          this.$notify.error('请输入联系方式');
        }
        else if(this.data.content===''){
          this.$notify.error('请输入内容描述');
        }
        else{
          this.data.username=this.user.username;
          this.$ajax.post('/advice_portal/add',this.data)
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.navActive=1;
                  this.getList();
                  this.$notify.success('提交成功');
                  this.data.type="";
                  this.data.tel="";
                  this.data.content="";
                }
              })
        }
      },
      see(detail){
        this.popupShow=true;
        this.detail=detail;
        console.log(this.detail);
      },
      getList(){
        this.$ajax.post('/advice_portal/mylist',{page:this.page,limit:this.limit})
            .then(res=>{
              this.list=res.data.page;
            })
      },
      handlePageChange(n){//监听页数改变
        this.page=n;
        this.getList();
      },
    }
  }
</script>

<style scoped lang="scss">
    #feedback{
        ul.form{
            padding: 0 15px;
            li{
                font-size: 14px;
                text-align: center;
                padding: 15px 0;
                border-bottom: 1px dashed #dee5e7;
                .left{
                    width: 547px;
                    font-size: 14px;
                    color: #555;
                    padding: 6px 12px;
                    border: 1px solid #cfdadd;
                    border-radius: 2px;
                    margin-left: 30px;
                }
                .number{
                    cursor: not-allowed;
                    background-color: #eee;
                }
                textarea{
                    height: 134px;
                }
                &:last-child{
                    @include flex(center,flex-start);
                }
            }
        }
        .btn{
            text-align: center;
            padding: 15px;
            button{
                background: #067ebe;
                font-size: 14px;
                color: #fff;
                padding: 6px 12px;
                border: none;
                border-radius: 2px;
                cursor: pointer;
            }
        }
        .card{
            @extend %width;
            padding: 10px 20px;
            ul.nav{
                @include flex;
                padding: 0 0 10px 0;
                border-bottom: 1px dashed #dee5e7;
                li{
                    &.active{
                        background: #f08625;
                    }
                    background: #bfbfbf;
                    height: 30px;
                    line-height: 30px;
                    width: 90px;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    border-radius: 15px;
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
            ul.list{
                li{
                    &:hover{
                        background: #eaeaea;
                    }
                    @include flex(space-between);
                    font-size: 14px;
                    padding: 10px 20px;
                    border-bottom: 1px dashed #eaeaea;
                    cursor: pointer;
                    .text{
                        width: 670px;
                        p{
                            @extend %ellipsis;
                            color: #363f44;
                            margin: 0 0 5px 0;
                        }
                        span{
                            font-size: 12px;
                            color: #a0a0a0;
                        }
                    }
                    i{
                        color: #f7b47f;
                    }
                }
            }
            .el-pagination{
                text-align: right;
                margin: 5px 0;
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
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 6px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                margin: 150px auto;
                h3{
                    font-size: 24px;
                    font-weight: 500;
                    color: #000;
                    padding: 15px;
                    border-bottom: 1px solid #e5e5e5;
                    margin: 0;
                }
                .btn{
                    text-align: right;
                }
            }
        }
    }
</style>