<template>
    <card class="user">
        <template slot="header">个人中心
            <router-link to="/user"><i class="fa fa-ellipsis-h"></i></router-link>
        </template>
        <ul>
            <li v-for="i in user" >
                <template v-if="i.id==='email'">
                    <a :href="i.infos.url" target="_blank">
                        <div class="left">
                            <img src="/img/email.png"/>
                            <p>邮件<br/>
                                <span v-if="i.errmsg===''">{{i.infos.email}}</span>
                                <span v-else>{{i.errmsg}}</span>
                            </p>
                        </div>
                    </a>
                    <div class="right" v-show="i.errmsg===''">
                        未读：{{i.infos.unread}}，今日：{{i.infos.todayCount}}
                    </div>
                </template>
                <template v-if="i.id==='ecard'">
                    <router-link :to="'/service/iframe/'+i.infos.cardServiceId"><div class="left">
                        <img src="/img/school_card.png"/>
                        <p>校园卡<br/>
                            <span v-if="i.errmsg===''">今日消费<i v-if="ecardFlag">{{i.infos.todayAmt}}</i><i v-else>…</i>元</span>
                            <span v-else>{{i.errmsg}}</span>
                        </p>
                    </div></router-link>
                    <div class="right" v-show="i.errmsg===''">
                        <template v-if="ecardFlag">余额：{{i.infos.balance}}元</template>
                        <i class="fa" :class="[{'fa-eye-slash':!ecardFlag},{'fa-eye':ecardFlag}]" @click="ecardFlag=!ecardFlag"></i>
                    </div>
                </template>
                <template v-if="i.id==='teacherPage'">
                    <a :href="i.infos.url" target="_blank"><div class="left">
                        <img src="/img/teacher_page.png"/>
                        <p>教师个人主页<br/>
                            <span v-if="i.errmsg===''">{{i.infos.department}}&nbsp;{{i.infos.name}}</span>
                            <span v-else>{{i.errmsg}}</span>
                        </p>
                    </div></a>
                    <div class="right" v-show="i.errmsg===''">
                        今日访问：{{i.infos.cnt_today}}次
                    </div>
                </template>
                <template v-if="i.id==='salary'" v-show="i.errmsg!==''">
                    <router-link :to="'/service/iframe/'+i.infos.salaryServiceId"><div class="left">
                        <img src="/img/salary.png"/>
                        <p>工资查询<br/>
                            <span v-if="i.errmsg===''">{{i.infos.desc}}</span>
                            <span v-else>{{i.errmsg}}</span>
                        </p>
                    </div></router-link>
                    <div class="right" v-show="i.errmsg===''">
                        <template v-if="salaryFlag">{{i.infos.je}}元</template>
                        <i class="fa" :class="[{'fa-eye-slash':!salaryFlag},{'fa-eye':salaryFlag}]" @click="salaryFlag=!salaryFlag"></i>
                    </div>
                </template>
            </li>
            <li>
                <a class="left">
                    <img src="/img/cloud-disk.png"/>
                    <p>HIT云盘<br/>
                        <span>124GB/2000GB</span>
                    </p>
                </a>
                <div class="right">
                    <el-progress color="#149718" :stroke-width="6" :percentage="30.8"></el-progress>
                </div>

            </li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "User",
    data(){
      return{
        proxy:process.env.VUE_APP_PROXY,
        user:[],
        ecardFlag:false,
        salaryFlag:false
      }
    },
    created(){
      this.getData(this.$url.homeUser,'user','services');//个人中心
    },
    methods:{
      getData(url,store,name){
        this.$ajax.post(url)
            .then(res=>{
              this[store]=res.data[name];
            })
      },
    }
  }
</script>

<style scoped lang="scss">
    .user{
        ul{
            li{
                @include flex(space-between);
                padding: 15px;
                border-bottom: 1px solid #e7ecee;
                .left{
                    @include flex;
                    img{
                        width: 31px;
                        height: 31px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    p{
                        font-size: 14px;
                        margin: 0;
                        span{
                            color: #98a6ad;
                            font-size: 12px;
                        }
                    }
                }
                .right{
                    font-size: 14px;
                    color: #27c24c;
                    i{
                        font-size: 14px;
                        color: #000;
                        padding-left: 10px;
                        cursor: pointer;
                    }
                    .el-progress{
                        width: 160px;
                    }
                }
            }
        }
    }
</style>