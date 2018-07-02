<template>
  <div class="login">
    <input v-model="name" type="text" placeholder="姓名"/>
    <input v-model="password" type="password" placeholder="密码"/>
    <button @click="login">登录</button>
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
      this.$ajax.post(this.$url.login,{username: this.name,password: this.password})
          .then(res => {
            this.$store.commit('set_token',res.data.token);//在store.js中设置token
            this.$router.push({path: '/'});
          });
    }
  }
};
</script>

<style scoped lang="scss">
  .login{
    margin: 100px;
  }
  input[type='text']{
    width: 100%;
  }
</style>