<template>
    <CardTemp>
        <header class="drag" slot="header">个人中心
            <router-link to="/user"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <ul>
            <li v-for="i in userModule" class="border_bottom1">
                <template v-if="i.id==='email' && $school.school==='ccnu'">
                    <a>
                        <img src="/img/email.png"/>
                        <div class="right">
                            <div class="name">邮件<br/>
                                <template v-if="i.infos.email!==''">
                                    <span class="pointer _theme_font" @click="enterEmail(i.infos.usertype,i.infos.email)">{{i.infos.email}}</span>
                                    <span class="pointer _theme_font" @click="unbindEmail()">解绑</span>
                                </template>
                                <template v-else>
                                    <a href="http://mail.ccnu.edu.cn/sso.aspx" target="_blank" class="pointer _theme_font">注册邮箱</a>
                                </template>
                            </div>
                            <div class="info" v-show="i.infos.email!==''">未读：{{i.infos.unread}}，今日：{{i.infos.todayCount}}</div>
                        </div>
                    </a>
                </template>
                <template v-if="i.id==='ecard' && $school.school==='ccnu'">
                    <a>
                        <img src="/img/school_card.png"/>
                        <div class="right">
                            <router-link to="/app/ecard" class="name">校园卡<br/>
                                <span class="pointer _theme_font">
                                    <template v-if="i.errmsg===null || i.errmsg===''">{{i.infos.cardStatus}}</template>
                                    <template v-else>{{i.errmsg}}</template>
                                </span>
                            </router-link>
                            <div class="info" v-show="i.errmsg===null || i.errmsg===''">
                                <i v-show="showEcard">余额：{{i.infos.balance}}元</i>&nbsp;&nbsp;
                                <i class="fa pointer" :class="{'fa-eye':showEcard,'fa-eye-slash':!showEcard}" @click.stop="showEcard = !showEcard"></i>
                            </div>
                        </div>
                    </a>
                </template>
                <template v-if="i.id==='tsg' && $school.school==='ccnu'">
                    <a>
                        <img src="/img/book.png"/>
                        <div class="right">
                            <div class="name">图书馆<br/>
                                <span class="pointer _theme_font">
                                    <template v-if="i.errmsg===null || i.errmsg===''">{{ i.infos.bookCount>0 ? '在借图书${i.infos.bookCount}本':'暂无借阅图书'}}</template>
                                    <template v-else>{{i.errmsg}}</template>
                                </span>
                            </div>
                            <div class="info" v-if="i.errmsg==null || i.errmsg===''">
                                <i>{{i.infos.qfje>0 ? '欠费${i.infos.qfje}元':'无欠费'}}</i>
                            </div>
                        </div>
                    </a>
                </template>
                <template v-if="i.id==='network' && $school.school==='ccnu'">
                    <a>
                        <img src="/img/school_card.png"/>
                        <div class="right">
                            <div class="name">网络流量<br/>
                                <span class="pointer _theme_font">
                                    <template v-if="i.errmsg===null || i.errmsg===''">{{i.infos.status}}</template>
                                    <template v-else>{{i.errmsg}}</template>
                                </span>
                            </div>
                            <div class="info" v-show="i.errmsg===null || i.errmsg===''">
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
          unbindEmail(){
              this.$confirm('确认解绑吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$ajax.post('/user_portal/unbind_email',{})
                      .then(res=>{
                          if(res.data.errcode==='0'){
                              for(var i=0; i<this.userModule.length; i++){
                                  if(this.userModule[i].id=='email'){
                                      this.userModule[i].infos.email='';
                                  }
                              }
                              this.$notify.success('解绑成功');
                          }
                          else{
                              this.$notify.error('解绑失败');
                          }
                      })
              }).catch(()=>{

              })
          }
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