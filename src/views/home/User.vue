<template>
    <CardTemp>
        <header class="drag" slot="header">个人中心
            <router-link to="/user"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <ul>
            <li v-for="i in userModule" class="border_bottom1">
                <template v-if="i.id==='email'">
                    <a>
                        <img :src="$proxy+'/img/email.png'"/>
                        <div class="right">
                            <div class="name">邮件<br/>
                                <template v-if="i.infos.email!==''">
                                    <span class="pointer _theme_news_fontcolor" @click="enterEmail(i.infos.usertype,i.infos.email)">{{i.infos.email}}</span>
                                    <span class="pointer _theme_news_fontcolor">解绑</span>
                                </template>
                                <template v-else>
                                    <a href="http://mail.ccnu.edu.cn/guide.aspx" target="_blank" class="pointer _theme_news_fontcolor">注册邮箱</a>
                                </template>
                            </div>
                            <div class="info" v-show="i.infos.email!==''">未读：{{i.infos.unread}}，今日：{{i.infos.todayCount}}</div>
                        </div>
                    </a>
                </template>
                <template v-if="i.id==='ecard'">
                    <a>
                        <img :src="$proxy+'/img/school_card.png'"/>
                        <div class="right">
                            <router-link to="/app/ecard" class="name">校园卡<br/>
                                <span class="pointer _theme_news_fontcolor">
                                    <template v-if="i.infos.cardStatus!==''">{{i.infos.cardStatus}}</template>
                                    <template v-else>{{i.errmsg}}</template>
                                </span>
                            </router-link>
                            <div class="info" v-show="i.infos.balance">
                                <i v-show="showEcard">余额：{{i.infos.balance}}元</i>&nbsp;&nbsp;
                                <i class="fa pointer" :class="{'fa-eye':showEcard,'fa-eye-slash':!showEcard}" @click.stop="showEcard = !showEcard"></i>
                            </div>
                        </div>
                    </a>
                </template>
                <template v-if="i.id==='tsg'">
                    <a>
                        <img :src="$proxy+'/img/book.png'"/>
                        <div class="right">
                            <div class="name">图书馆<br/>
                                <span class="pointer _theme_news_fontcolor">
                                    <template v-if="i.infos.bookCount">{{ i.infos.bookCount === 0 ? '暂无借阅图书' : `在借${i.infos.bookCount}本`}}</template>
                                    <template v-else>{{i.errmsg}}</template>
                                </span>
                            </div>
                            <div class="info" v-show="i.infos.qfje">
                                <i>{{i.infos.qfje === 0 ? '无欠费' : `欠费${i.infos.qfje}元`}}</i>
                            </div>
                        </div>
                    </a>
                </template>
                <template v-if="i.id==='network'">
                    <a>
                        <img :src="$proxy+'/img/school_card.png'"/>
                        <div class="right">
                            <div class="name">网络流量<br/>
                                <span class="pointer _theme_news_fontcolor">
                                    <template v-if="i.infos.status">{{i.infos.status}}</template>
                                    <template v-else>{{i.errmsg}}</template>
                                </span>
                            </div>
                            <div class="info" v-show="i.infos.bqljll">
                                <i>本月使用流量：{{i.infos.bqljll}}</i>
                            </div>
                        </div>
                    </a>
                </template>
            </li>
        </ul>
    </CardTemp>
</template>

<script>
    export default {
      name: "User",
      data(){
        return{
          showEcard:false,
        }
      },
      computed: {
        userModule() {
          return this.$store.state.userModule;
        },
      },
      methods:{
        enterEmail(type,email){//进入邮箱
          this.$ajax.post('/user_portal/get_email_url',{type:type,email:email})
              .then(res=>{
                if(res.data.errcode==='0'){
                  window.open(res.data.loginUrl);
                }
              })
        },
      }
    }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
    }
    .pointer{
        cursor: pointer;
    }
    .border_bottom1{
        border-bottom: 1px dashed #e4e4e4;
    }
    ul {
        @include flex;
        flex-flow: wrap;
        li {
            width: 100%;
            padding: 8px 23px;
            a {
                @include flex;
                width: 100%;
                font-size: 14px;
                color: #000;
                img {
                    width: 30px;
                    height: 30px;
                    margin-right: 20px;
                }
                .right {
                    flex: 1;
                    @include flex(space-between);
                    .name{
                        display: inline-block;
                        span{
                            font-size: 12px;
                            margin-right: 10px;
                        }
                        a{
                            font-size: 12px;
                        }
                    }

                }
            }
        }

    }

</style>