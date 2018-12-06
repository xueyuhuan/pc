<template>
    <div id="loading">
        <i class="fa fa-spinner fa-pulse fa-2x"></i><br/>
        加载中
    </div>
</template>

<script>
  export default {
    name: "Loading",
    created(){
      this.token=this.getCookie('PORTAL_TOKEN');
      this.$ajax.post('/security_portal/validate_login',{token:this.token})
          .then(res=>{
            if(res.data.loginFlag==='true'){
              this.$store.commit('set_token', res.data.token);//在store.js中设置token
              this.$router.push({path: this.$school.url});
            }
            else{
              this.$router.push({path: '/login'});
              // window.location.href='http://one.ccnu.edu.cn/index#/app/home/main';
              // if(res.data.casUsing==='true'){
              //   window.location.href=process.env.VUE_APP_ServerApi+'/cas/login_portal';
              // }
              // else{
              //   this.$router.push({path: '/login'});
              // }
            }
          });
    },
    methods:{
      //获取cookie
      getCookie(name){
        let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
          return decodeURIComponent(arr[2]);
        else
          return false;
      },
    }
  }
</script>

<style scoped lang="scss">
    #loading{
        text-align: center;
    }
</style>