<template>
    <div>
        <div class="top"><img :src="'/img/'+info.schoolPrefix+'/logo_blue.png'" /></div>
        <div class="mid">
            <div class="title">{{info.systemName}}</div>
            <div class="login">
                <div style="margin-bottom: 30px;font-size: 20px;">账号登录</div>
                <input class="account" v-model="name" type="text" placeholder="请输入用户名" autocomplete="off"/>
                <input @keyup.enter="login" class="password" v-model="password" type="password" placeholder="请输入密码" autocomplete="off"/>
                <button @click="login">登 录</button>
            </div>
        </div>
        <div class="bottom" v-html="info.copyright"></div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data: function () {
            return {
              name: "2006983633",
              password: "123456",
              info:''
            }
        },
      created(){
        this.$ajax.post('/system_portal/info')
            .then(res => {
              this.info=res.data;
            });
      },
        methods: {
          login: function () {
            this.$ajax.post(this.$url.login, {username: this.name, password: this.password})
                .then(res => {
                  if (res.data.errcode === '0') {
                    this.$store.commit('set_token', res.data.token);//在store.js中设置token
                    this.$router.push({path: this.$school.url});
                  }
                  else {
                    this.$notify.error(res.data.errmsg);
                  }
                });
          }
        }
    };
</script>

<style scoped lang="scss">
    input {
        width: 100%;
        height: 40px;
        border: 1px solid #c7c7c7;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        padding-left: 50px;
        margin-bottom: 30px;
        font-size: 16px;
    }
    .account{
        background: url("/img/input_bg1.gif") no-repeat left center;
    }
    .password{
        background: url("/img/input_bg2.gif") no-repeat left center;
    }
    button{
        width: 100%;
        height: 40px;
        font-size: 18px;
        background: #FDA102;
        color: white;
        border: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .top{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: 79px;
        img{
            height: 69px;
            margin-top: 5px;
            margin-left: 100px;
            @media only screen and (max-width:767px) {
                margin-left: 0;
            }
        }
    }
    .mid{
        min-height: 800px;
        background-color: #6474EF;
        padding: 100px 0;
        position: fixed;
        left: 0;
        right: 0;
        top: 79px;
        bottom: 50px;
        background-image: url("/img/login_bg.gif");
        background-repeat: no-repeat;
        background-position: center bottom 0;
        .title{
            text-align: center;
            font-size: 30px;
            color: white;
            padding: 30px 0;
        }
        .login {
            margin: 0 auto;
            padding: 30px 50px 50px;
            border-radius: 5px;
            background-color: white;
            width: 400px;
            @media only screen and (max-width:767px) {
                width: 100%;
                border-radius: 0;
            }
        }
    }
    .bottom{
        background-color: #E2E2E2;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        color: #878585;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>