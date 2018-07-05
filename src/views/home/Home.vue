<template>
  <div class="home">
    <subhead>
      {{$store.state.user.name}}，欢迎回来!
      <div class="right">
        <a href="#" target="_blank"><i class="fa fa-question-circle-o"></i>&nbsp;帮助</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <button><i class="fa fa-cog"></i>&nbsp;工作台设置</button>
      </div>
    </subhead>
    <div class="banner">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="i in banner" >
          <a :href="i.url" target="_blank"><img :src="i.img"/></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <div class="a">
        <application></application>
        <file></file>
        <service></service>
        <schedule></schedule>
        <notice></notice>
      </div>
      <div class="b">
        <notice2></notice2>
        <todo></todo>
        <user></user>
        <pay></pay>
        <ranking></ranking>
      </div>
    </div>
  </div>
</template>

<script>
import Application from "./Application";
import File from "./File";
import Schedule from "./Schedule";
import Service from "./Service";
import Notice from "./Notice";
import Notice2 from "./Notice2";
import Todo from "./Todo";
import User from "./User";
import Pay from "./Pay";
import Ranking from "./Ranking";
export default {
  name: "home",
  components: {Ranking, Pay, User, Todo, Notice2, Notice, Service, Application, Schedule,File},
  data(){
    return{
      banner:[],
    }
  },
  created(){
    this.$ajax.post(this.$url.homeBanner,{id: "dashboard"})
        .then(res=>{
          for(let i=0;i<res.data.space.banners.length;i++){
            this.banner.push({
              img:'/api'+res.data.imgUrl+res.data.space.banners[i].url,
              url:res.data.space.banners[i].link
            });
          }
        });
  },
};
</script>

<style scoped lang="scss">
  .subhead{
    font-size: 16px;
    a{
      color: #fff;
    }
    button{
      font-size: 16px;
      color: #fff;
      border: none;
      background: none;
    }
  }
  .banner{
    width: 1200px;
    margin: 0 auto 20px;
    img{
      height: 300px;
      width: 1200px;
    }
  }
  .main{
    @include flex(space-between,flex-start);
    flex-flow: wrap;
    width: 1200px;
    margin: 0 auto;
    .card{
      width: 595px;
    }
  }
</style>
