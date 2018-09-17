<template>
  <div id="app" :class="skin" v-cloak>
    <navigation v-if="$route.path!=='/login'&&$route.path!=='/loading'&&$route.path!=='/404'"></navigation>
    <div style="padding-bottom: 50px;">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!--回到顶部按钮-->
    <div v-show="top > 200" title="回到顶部" @click="toTop" class="toTop"><i class="el-icon-caret-top _theme_font"></i></div>
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
      position: fixed;
      right: 20px;
      bottom: 80px;
      background: rgba(255,255,255,0.5);
      width: 40px;
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
      transition: .3s;
      box-shadow: 0 0 6px rgba(0,0,0,.12);
      i{
          display: block;
          line-height: 40px;
          text-align: center;
          font-size: 18px;
      }
  }
  .toTop:hover{
    transform: scale(1.2,1.2);
  }
</style>