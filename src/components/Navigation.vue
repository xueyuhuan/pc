<template>
    <header id="nav" class="_theme ">
        <div class="content">
            <nav>
                <router-link :to="$school.url"><img :src="'/img/'+$school.school+'/logo.png'"/></router-link>
                <ul>
                    <li v-for="i in nav" class="_theme_light" :class="{active:active===i.url}" @click="click(i.url)">
                        <router-link :to="i.url">{{i.name}}</router-link>
                    </li>
                </ul>
            </nav>
            <ul class="icon">
                <li @click="click('/feedback')" v-if="$school.school==='hit'">
                    <router-link to="/feedback">
                        <el-tooltip class="item" effect="light" content="意见反馈" placement="bottom">
                            <i class="iconfont icon-fankuiwenti" :class="{active:active==='/feedback'}"></i>
                        </el-tooltip>
                    </router-link>
                </li>
                <li>
                    <a>
                        <el-dropdown trigger="click" @command="toggleTheme">
                            <el-tooltip class="item" effect="light" content="主题" placement="bottom"><i class="iconfont icon-pifu" style="color:#fff;"></i></el-tooltip>
                            <el-dropdown-menu slot="dropdown" class="theme_dropdown">
                                <el-dropdown-item command="blue"><span class="themeSpan_blue"></span> 蓝色</el-dropdown-item>
                                <el-dropdown-item v-if="$school.school==='ccnu'" command="green"><span class="themeSpan_green"></span> 绿色</el-dropdown-item>
                                <el-dropdown-item v-if="$school.school==='ccnu'" command="orange"><span class="themeSpan_orange"></span> 橙色</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </a>
                </li>
                <li @click="click('/todo')">
                    <router-link to="/todo">
                        <el-tooltip class="item" effect="light" content="办事中心" placement="bottom">
                            <el-badge :value="todoCount" :max="9" class="item" :hidden="todoCount === 0">
                                <i class="icon-screen-desktop" :class="{active:active==='/todo'}"></i>
                            </el-badge>
                        </el-tooltip>
                    </router-link>
                </li>
                <li @click="click('/collections')">
                    <router-link to="/collections">
                        <el-tooltip class="item" effect="light" content="收藏中心" placement="bottom">
                            <i class="icon-star" :class="{active:active==='/collections'}"></i></el-tooltip>
                    </router-link>
                </li>
                <li @click="click('/message')" v-if="$school.school==='ccnu'">
                    <router-link to="/message">
                        <el-tooltip class="item" effect="light" content="消息中心" placement="bottom">
                            <el-badge :value="unreadCount" :max="9" class="item" :hidden="unreadCount === 0">
                                <i class="icon-bell" :class="{active:active==='/message'}"></i>
                            </el-badge>
                        </el-tooltip>
                    </router-link>
                </li>
                <li>
                    <a @click="panelShow=!panelShow">{{user.name}}<i class="fa fa-caret-down"></i><img class="_common_m-l-sm" :src="user.userFace?user.userFace:'/img/a0.jpg'"/></a>
                </li>
            </ul>
            <template v-if="$school.school==='ccnu'">
                <el-collapse-transition>
                    <div class="panel panel-ccnu" v-show="panelShow">
                        <ul>
                            <li><router-link @click.native="panelShow=false" to="/user"><i class="icon icon-user"></i>个人中心</router-link></li>
                            <li><a @click="panelShow=false" href="http://bigdata.ccnu.edu.cn" target="_blank"><i class="icon icon-directions"></i>我的华师足迹</a></li>
                            <li><a @click="logout"><i class="icon icon-logout"></i>注销</a></li>
                        </ul>
                    </div>
                </el-collapse-transition>
            </template>
            <template v-else-if="$school.school==='hit'">
                <el-collapse-transition>
                    <div class="panel panel-hit" v-show="panelShow">
                        <div class="name">
                            <span>{{user.name}}<i :class="{'icon-user-female female':user.xb==='女','icon-user male':user.xb!=='女'}"></i></span>
                            <router-link @click.native="panelShow=false" to="/user"><i class="icon-settings"></i>门户设置</router-link>
                        </div>
                        <div class="number">{{(user.usertype=='4'||user.usertype=='6')?'学号':'职工号'}}：{{user.username}}</div>
                        <div class="type">{{user.deptName}}</div>
                        <div class="other"><a @click="panelShow=false" href="http://ids.hit.edu.cn/authserver" target="_blank"><i class="icon-user-follow"></i>统一身份认证设置</a><button @click="logout">退出登录</button></div>
                    </div>
                </el-collapse-transition>
            </template>
            <template v-else>
                <el-collapse-transition>
                    <div class="panel panel-ccnu" v-show="panelShow">
                        <ul>
                            <li><router-link @click.native="panelShow=false" to="/user"><i class="fa fa-user"></i>个人中心</router-link></li>
                            <li><a @click="logout"><i class="fa fa-sign-out fa-rotate-180"></i>注销</a></li>
                        </ul>
                    </div>
                </el-collapse-transition>
            </template>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
              nav: this.$school.nav,//主文字导航
              panelShow:false,//个人中心面板标识
              todoCount:0,//待办数
              unreadCount:0,//未读消息数
            }
        },
        computed: {
          active:{
            set() {},
            get(){
              return this.$route.path;
            }
          },
          user() {//用户信息
            return this.$store.state.user;
          },
          token(){
            return this.$store.state.token;
          }
        },
        created() {
          this.$ajax.post(this.$url.getUser)
              .then(res => {
                this.$store.commit('set_user', res.data.user);
              });
          this.getUnreadCount();
          this.getTodo();
        },
        methods: {
          click(url) {
            this.active = url;
          },
          toggleTheme(command) {//换肤
            document.getElementById('app').className='_theme_'+command;
            localStorage.skin='_theme_'+command;
          },
          logout(){//注销
            this.panelShow=false;
            this.$confirm('确认注销吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.commit('del_token');
              this.setCookie("PORTAL_TOKEN", "", -1);
              this.$router.push('/loading');
            }).catch(()=>{

            })
          },
          //设置cookie
          setCookie(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
          },
          getTodo(){
            return this.$ajax.post(this.$url.homeTodo)
                .then(res=>{
                  this.todoCount=res.data.data.length;
                  this.$store.commit('set_data',{
                    data:res.data.todoList,
                    name:'todo'
                  })
                });
          },
          getUnreadCount(){
            if(this.$school.isWebsocket){
              this.websocket();
            }
          },
          websocket () {
            let ws = new WebSocket('ws://msg.ccnu.edu.cn:8080/msgsocket/websocket?token='+sessionStorage.token);
            ws.onmessage = evt => {
              this.unreadCount=JSON.parse(evt.data).unReadTotal;
            };
          }
        }
    }
</script>

<style scoped lang="scss">
    header#nav{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        .content {
            @include flex(space-between);
            position: relative;
            @extend %width;
            height: 90px;
            nav {
                @include flex;
                height: 100%;
                img {
                    height: 50px;
                    margin-right: 100px;
                }
                ul {
                    @include flex;
                    height: 100%;
                    li {
                        &.active{
                            border-bottom: 3px solid #f7b47f;
                        }
                        height: 100%;
                        padding: 0;
                        a {
                            @include flex;
                            height: 100%;
                            font-size: 20px;
                            font-weight: 700;
                            color: #fff;
                            padding: 0 15px;
                        }
                    }
                }
            }
            ul.icon {
                @include flex;
                height: 100%;
                li{
                    height: 100%;
                    padding: 0 15px;
                    color: #fff;
                    &:nth-child(5) {
                        i {
                            margin-left: 5px;
                        }

                    }
                    &:last-child {
                        padding-right: 0;
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                    a {
                        @include flex;
                        height: 100%;
                        font-size: 14px;
                        color: #fff;
                        cursor: pointer;
                        i {
                            line-height: 25px;
                            &.active {
                                color: #f7b47f;
                            }
                        }
                    }
                }
            }
            .panel{
                position: absolute;
                top: 90px;
                right: 0;
                z-index: 999;
                background: #fff;
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 2px;
                box-shadow: 0 2px 6px rgba(0,0,0,.1);
            }
            .panel-ccnu{
                width: 200px;
                ul{
                    li{
                        border-bottom: 1px solid #e5e5e5;
                        padding: 10px 0;
                        a{
                            i{
                                margin-right: 4px;
                            }
                            display: block;
                            font-size: 14px;
                            color: #333;
                            padding: 5px 15px;
                            cursor: pointer;
                            &:hover{
                                background: #eee;
                            }
                        }
                    }
                }
            }
            .panel-hit{
                width: 280px;
                padding: 15px 10px;
                .name{
                    @include flex(space-between);
                    span{
                        font-size: 18px;
                        font-weight: 700;
                        color: #323332;
                        i{
                            color: #0062ef;
                            margin-left: 8px;
                        }
                    }
                    a{
                        font-size: 14px;
                        color: #1c9bd6;
                        i{
                            color: #999;
                            margin-right: 8px;
                        }
                    }
                }
                .number{
                    color: #ccc;
                    font-size: 9pt;
                }
                .type{
                    color: #666;
                    font-size: 14px;
                }
                .other{
                    @include flex(space-between);
                    margin: 30px 0 0 0;
                    a{
                        i{
                            color: #484848;
                            margin-right: 8px;
                        }
                        font-size: 14px;
                        color: #1c9bd6;
                    }
                    button{
                        background: #f08625;
                        font-size: 14px;
                        color: #fff;
                        padding: 3px 10px;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .themeSpan_blue{
        display: inline-block;
        width: 10px;
        height: 10px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: $blue;
    }
    .themeSpan_green{
        display: inline-block;
        width: 10px;
        height: 10px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: $green;
    }
    .themeSpan_orange{
        display: inline-block;
        width: 10px;
        height: 10px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: $orange;
    }
</style>