<template>
    <header>
        <div class="content">
            <nav>
                <img :src="$school.logo"/>
                <ul>
                    <li v-for="i in nav" :class="{active:active===i.url}" @click="click(i.url)"><router-link :to="i.url">{{i.name}}</router-link></li>
                </ul>
            </nav>
            <ul class="personal">
                <li><a href="#">
                    <el-tooltip class="item" effect="light" content="主题" placement="bottom"><i class="fa fa-universal-access"></i></el-tooltip>
                </a></li>
                <li @click="click('/todo')"><router-link to="/todo">
                    <el-tooltip class="item" effect="light" content="办事中心" placement="bottom"><i class="fa fa-tv" :class="{active:active==='/todo'}"></i></el-tooltip>
                </router-link></li>
                <li @click="click('/collections')"><router-link to="/collections">
                    <el-tooltip class="item" effect="light" content="收藏中心" placement="bottom"><i class="fa fa-star-o" :class="{active:active==='/collections'}"></i></el-tooltip>
                </router-link></li>
                <li @click="click('/message')"><router-link to="/message">
                    <el-tooltip class="item" effect="light" content="消息中心" placement="bottom"><i class="fa fa-bell-o" :class="{active:active==='/message'}"></i></el-tooltip>
                </router-link></li>
                <li><router-link to="/user">{{user.name}}<i class="fa fa-caret-down"></i></router-link></li>
                <li><router-link to="/user"><img :src="user.userFace"/></router-link></li>
            </ul>
        </div>
    </header>
</template>

<script>
  export default {
    name: "Navigation",
    data(){
      return{
        nav:this.$school.nav,
        active:"",
      }
    },
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    created(){
      this.active=this.$route.path;
      this.$ajax.post(this.$url.getUser)
          .then(res=>{
            this.$store.commit('set_user',res.data.user);
          });
    },
    methods:{
      click(url){
        this.active=url;
      }
    }
  }
</script>

<style scoped lang="scss">
    header{
        nav{
            .active{
                background: $skin-light;
                border-bottom: 3px solid #f7b47f;
            }
        }
     background: $skin;
        .content{
            @include flex(space-between);
            width: 1200px;
            height: 90px;
            margin: 0 auto;
            nav{
                @include flex;
                height: 100%;
                img{
                    height: 50px;
                    margin-right: 100px;
                }
                ul{
                    @include flex;
                    height: 100%;
                    li{
                        height: 100%;
                        padding: 0;
                        a{
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
            ul.personal{
                @include flex;
                height: 100%;
                li{
                    height: 100%;
                    padding: 0 15px;
                    color: #fff;
                    &:nth-child(5){
                        i{
                            margin-left: 5px;
                        }

                    }
                    &:last-child{
                        padding: 0;
                        img{
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                    a{
                        @include flex;
                        height: 100%;
                        font-size: 14px;
                        color: #fff;
                        i{
                            line-height: 25px;
                            &.active{
                                color: #f7b47f;
                            }
                        }
                    }
                }
            }
        }
    }
</style>