<template>
    <footer>
        <div class="hidden-xs-only">
            <span v-html="copyright"></span>
            <router-link to="/log">升级日志</router-link>
        </div>
        <ul class="hidden-sm-and-up">
            <li @click="click('/feedback')" v-if="$school.school==='hit'">
                <router-link to="/feedback" :class="{_theme_font:active==='/feedback'}">
                    <i class="iconfont icon-fankuiwenti"></i>
                    <br/>意见反馈
                </router-link>
            </li>
            <li @click="click('/todo')">
                <router-link to="/todo" :class="{_theme_font:active==='/todo'}">
                    <el-badge :value="8" :max="9" class="item" :hidden="todoCount === 0">
                        <i class="icon-screen-desktop"></i>
                    </el-badge>
                    <br/>办事中心
                </router-link>
            </li>
            <li @click="click('/collections')">
                <router-link to="/collections" :class="{_theme_font:active==='/collections'}">
                    <i class="icon-star"></i>
                    <br/>收藏中心
                </router-link>
            </li>
            <li @click="click('/message')" v-if="$school.school==='ccnu'">
                <router-link to="/message" :class="{_theme_font:active==='/message'}">
                    <el-badge :value="unreadCount" :max="9" class="item" :hidden="unreadCount === 0">
                        <i class="icon-bell"></i>
                    </el-badge>
                    <br/>消息中心
                </router-link>
            </li>
            <li @click="click('/log')">
                <router-link to="/log" :class="{_theme_font:active==='/log'}">
                    <i class="fa fa-edit"></i>
                    <br/>版本日志
                </router-link>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
      name: "Footer",
      data(){
        return{
          copyright:''
        }
      },
      computed: {
        active:{
          set() {},
          get(){
            return this.$route.path;
          }
        },
        unreadCount() {//未读消息数
          return this.$store.state.unreadCount;
        },
        todoCount(){//待办数
          return this.$store.state.todo.length;
        }
      },
      created(){
        this.$ajax.post('/system_portal/copyright')
            .then(res => {
              this.copyright=res.data.copyright;
            });
      },
      methods:{
        click(url) {
          this.active = url;
        }
      }
    }
</script>

<style scoped lang="scss">
    footer{
        position: absolute;
        @media only screen and (max-width:767px) {
            position: fixed;
        }
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        @media screen and (min-width: 768px) {
            background:#747474;
        }
        &>div{
            @include flex(space-between);
            @extend %width;
            height: 50px;
            color: #fff;
        }
        &>ul{
            @include flex;
            background: #fafafa;
            padding: 8px 0 8px;
            border-top: 1px solid #dfdfdf;
            li{
                i{font-size: 15px}
                flex: 1;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
        }
    }
</style>