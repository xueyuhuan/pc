<template>
  <div id="app" :class="skin" v-cloak>
    <navigation v-if="$route.path!=='/login'&&$route.path!=='/loading'&&$route.path!=='/404'"></navigation>
    <div style="padding-bottom: 50px;"><router-view/></div>
    <!--回到顶部按钮-->
    <a href="javascript:;" v-show="top > 200" title="回到顶部" @click="toTop" class="toTop _theme_toTop_bgcolor"><i class="fa fa-chevron-up"></i></a>
    <Footer v-if="$route.path!=='/login'&&$route.path!=='/loading'&&$route.path!=='/404'"></Footer>
  </div>
</template>

<script>
    export default {
      data(){
          return{
            exclude_name:'NewsDetail',
            top:0,
            skin:'_theme_blue',
            token:'',
          }
      },
      created(){
        if(localStorage.skin){
          this.skin=localStorage.skin;
        }
        this.bindScroll();
      },
      methods:{
        //滚动条回顶部
        toTop(){
          scroll(0,0);
        },
        //监听滚动条位置
        bindScroll(){
          window.onscroll = () => {
            //获取滚动条的滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.top = scrollTop;
          }
        }
      },
    }
</script>
<style>
  [v-cloak]{
    display: none;
  }
</style>
<style lang="scss">
  #app{
    position: relative;
    min-height: 100%;
    padding-top: 90px;
  }
    .toTop{
      display:block;
      width: 50px;
      height: 50px;
      cursor: pointer;
      text-align: center;
      line-height: 50px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      position: fixed;
      right: 20px;
      bottom: 80px;
      color: #fff;
      transition: transform .1s ease-in-out;
      font-size: 1.5em;
    }
  .toTop:hover{
    transform: scale(1.2,1.2);
  }
</style>