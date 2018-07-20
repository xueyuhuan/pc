<template>
    <div>
        <div class="top"><img :src="$school.logo" /></div>
        <div class="mid">
            <div class="title">{{$school.loginTitle}}</div>
            <div class="login">
                <div style="margin-bottom: 30px;">账号登录</div>
                <input class="account" v-model="name" type="text" placeholder="姓名"/>
                <input class="password" v-model="password" type="password" placeholder="密码"/>
                <button @click="login">登录</button>
            </div>
        </div>
        <div class="bottom">{{$school.copyright}}</div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data: function () {
            return {
                name: "2006983633",
                password: "12345678",
            }
        },
        methods: {
            login: function () {
                this.$ajax.post(this.$url.login, {username: this.name, password: this.password})
                    .then(res => {
                        this.$store.commit('set_token', res.data.token);//在store.js中设置token
                      if(this.$school.school==='hit'){
                        this.$router.push({path: '/index'});
                      }
                      else this.$router.push({path: '/home'});
                    });
            }
        }
    };
</script>

<style scoped lang="scss">
    input {
        width: 100%;
        height: 40px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: #FAFFBD;
        padding-left: 20px;
        margin-bottom: 30px;
        font-size: 16px;
    }
    button{
        width: 100%;
        height: 40px;
        background-color: #FDA102;
        color: white;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .top{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }
    .mid{
        min-height: 800px;
        background-color: #6474EF;
        padding: 100px 0;
        position: fixed;
        left: 0;
        right: 0;
        top: 60px;
        bottom: 50px;
        .title{
            text-align: center;
            font-size: 26px;
            color: white;
            padding: 30px 0;
        }
        .login {
            margin: 0 auto;
            padding: 30px 50px 50px;
            border-radius: 5px;
            background-color: white;
            width: 400px;
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