<template>
  <div id="app" class="theme_blue">
    <navigation v-if="this.$route.path!=='/login'"></navigation>
      <router-view/>
    <!--回到顶部按钮-->
    <a href="javascript:;" v-show="top > 200" title="回到顶部" @click="toTop" class="toTop"><i class="fa fa-chevron-up"></i></a>
  </div>
</template>

<script>
    import '@/assets/scss/color.scss';
    export default {
      data(){
          return{
              exclude_name:'NewsDetail',
              top:0
          }
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
        created(){
          this.bindScroll();
        }
    }
</script>
<style scoped lang="scss">
    .theme_blue{
        color: #1390d3;
    }
    .theme_green{
        color: #00697e;
    }
    .theme_orange{
        color: #f18b2e;
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
      background-color: #1390d3;
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