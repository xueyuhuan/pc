<template>
    <card>
        <header name="header">个人中心
            <router-link to="/user"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <ul>
            <li>
                <a href="#" target="_blank">
                    <img src="/api/img/email.png"/>
                    <div class="right">
                        <div class="name">邮件<br/><span></span><span>解绑</span></div>
                        <div class="info">未读：，今日：</div>
                    </div>
                </a>
            </li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "User",
    computed:{
      data(){
        return this.$store.state.userModule;
      }
    }
  }
</script>

<style scoped lang="scss">
    ul{
        @include flex;
        flex-flow: wrap;
        padding: 10px 20px;
        li{
            width: 100%;
            margin: 0 0 14px 0;
            a{
                @include flex;
                width: 100%;
                font-size: 14px;
                color: #000;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                .right{
                    flex: 1;
                    @include flex(space-between);
                    span{
                        font-size: 12px;
                        color: $skin-card;
                        margin-right: 10px;
                    }
                }
            }
        }

    }

</style>