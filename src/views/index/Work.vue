<template>
    <card class="work">
        <template slot="header">工作台</template>
        <ul class="nav">
            <li v-for="(i,index) in work" @click="clickWork(index)" :class="{active:index===workActive}">
                <img :src="i.img"/>{{i.name}}
                <em v-show="index===0&&todoList.length>0">{{todoList.length}}</em>
                <em v-show="index===1&&email">{{email.unreadCntAll}}</em>
                <em v-show="index===2&&myStartedList.length>0">{{myStartedList.length}}</em>
            </li>
        </ul>
        <ul class="list" v-show="workActive===0">
            <template v-if="todoList&&todoList.length>0">
                <li v-for="i in todoList.slice(0,5)" @click="openTodo(i.url,i.appName)"><a>
                    <div class="left">
                        <p><em>【{{i.appName}}】</em>{{i.title}}</p>
                        <span>当前环节：{{i.currentNode}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发起人：{{i.startUser}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发起时间：{{i.currentTime}}</span>
                    </div>
                    <div class="right"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;办理</div>
                </a></li>
            </template>
            <li v-else><a><p>暂无待办</p></a></li>
            <li class="more"><router-link to="/todo">进入办事中心</router-link></li>
        </ul>
        <ul class="list email" v-show="workActive===1">
            <template v-if="emailList&&emailList.length>0">
                <li v-for="i in emailList.slice(0,5)"><a :href="i.url" target="_blank">
                    <div class="left">
                        <p>{{i.subject}}</p>
                        <span>{{i.sender}}</span>
                    </div>
                    <div class="right">{{i.time}}</div>
                </a></li>
            </template>
            <li v-else><a><p>暂无邮件</p></a></li>
            <li class="more"><a :href="email.loginUrl" target="_blank">查看更多</a></li>
        </ul>
        <ul class="list" v-show="workActive===2">
            <template v-if="myStartedList&&myStartedList.length>0">
                <li v-for="i in myStartedList.slice(0,5)"><a :href="i.url" target="_blank">
                    <div class="left">
                        <p><em>【{{i.appname}}】</em>{{i.title}}</p>
                        <span>当前环节：{{i.currentnode}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发起时间：{{i.createtime}}</span>
                    </div>
                    <div class="right"><i class="fa fa-file-text-o"></i>&nbsp;&nbsp;查看</div>
                </a></li>
            </template>
            <li v-else><a><p>暂无数据</p></a></li>
            <li class="more"><router-link to="/todo">进入办事中心</router-link></li>
        </ul>
    </card>
</template>

<script>
  import Jump from "../todo/Jump";
  export default {
    name: "Work",
    components: {Jump},
    data(){
      return{
        work:[
          {img:'/img/banner_1.png',name:'我的待办'},
          {img:'/img/banner_2.png',name:'未读邮件'},
          {img:'/img/banner_3.png',name:'我发起的'}
        ],
        workActive:0,
        todoList:[],
        email:'',
        emailList:[],
        myStartedList:[],
      }
    },
    created(){
      this.getData('/week_portal/current','week','current');//学期周
      this.getData('/task_portal/query_todo_all','todoList','todoList');//待办
      this.getData('/email_portal/unread','emailList','list','email','email');//邮件①未读列表②邮箱
      this.getData('/task_portal/query_mystarted_all','myStartedList','myStartedList');//我发起的
    },
    methods:{
      clickWork(index){
        this.workActive=index;
      },
      //打开跳转弹窗
      openTodo(url,appName) {
        this.$store.commit('set_data',{
          data:true,
          name:'jumpShow'
        });
        this.$store.commit('set_data',{
          data:appName,
          name:'jumpName'
        });
        window.open(url);
      },
      getData(url,store,name,store2,name2){
        this.$ajax.post(url)
            .then(res=>{
              if(res.data[name]){
                this[store]=res.data[name];
                if(res.data[name2]&&store2){
                  this[store2]=res.data[name2];
                }
              }
            })
      }
    }
  }
</script>

<style scoped lang="scss">
    .work{
        ul.nav{
            @include flex;
            li{
                &.active{
                    background: #8475f6;
                    color: #fff;
                    em{
                        color: #fff!important;
                    }
                }
                flex: 1;
                @include flex(center);
                height: 60px;
                font-size: 14px;
                color: #000;
                border-right: 1px solid #dee5e7;
                cursor: pointer;
                img{
                    width: 40px;
                }
                em{
                    font-size: 24px;
                    font-style: italic;
                    font-weight: 700;
                    color: #948dd8;
                    margin-left: 10px;
                }
            }
            li:last-child{
                border: none;
            }
        }
        ul.list{
            li.more{
                a{
                    display: block;
                    padding: 10px 15px !important;
                    font-size: 12px;
                    color: #0683c3;
                    text-align: right;
                }
            }
            li{
                cursor: pointer;
                a{
                    @include flex(space-between);
                    padding: 15px;
                    border-top: 1px solid #edf1f2;
                    p{
                        em{
                            color: #0683c3;
                        }
                        font-size: 14px;
                        color: #363f44;
                        margin: 0;
                    }
                    span{
                        color: #98a6ad;
                        font-size: 12px;
                    }
                    .right{
                        flex: 0 0 150px;
                        font-size: 14px;
                        color: #f7b47f;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>