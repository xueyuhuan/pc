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
      <draggable v-model="A" :options="{group:'people'}">
        <transition-group>
          <div v-for="(i,index) in A" :key="index">
            <component :is="i.componentName" keep-alive></component>
          </div>
        </transition-group>
      </draggable>
      <draggable v-model="B" :options="{group:'people'}">
        <transition-group>
          <div v-for="(i,index) in B" :key="index">
            <component :is="i.componentName" keep-alive></component>
          </div>
        </transition-group>
      </draggable>
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
import draggable from 'vuedraggable'
export default {
  name: "home",
  components: {draggable,Ranking, Pay, User, Todo, Notice2, Notice, Service, Application, Schedule,File},
  data(){
    return{
      banner:[],
      page:{},
      A:[],
      B:[],
    }
  },
  created(){
    this.getBanner();
    this.getPage();
  },
  methods:{
    getPage(){
      this.$ajax.post(this.$url.homePage)
          .then(res=>{
            this.page=res.data.pages[0];
            this.A=this.page.columnWidgets.A;
            for(let i=0;i<this.A.length;i++){
              this.A[i].componentName=this.transform(this.A[i].NAME);
            }
            this.B=this.page.columnWidgets.B;
            for(let i=0;i<this.B.length;i++){
              this.B[i].componentName=this.transform(this.B[i].NAME);
            }
          });
    },
    getBanner(){
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
    transform(name){
      let x;
      switch (name) {
        case '我的日程':x='schedule';break;
        case '我的应用':x='application';break;
        case '我的服务':x='service';break;
        case '服务排行':x='ranking';break;
        case '工资查询':x='pay';break;
        case '个人中心':x='user';break;
        case '校内通知':x='notice';break;
        case '通知公告':x='notice2';break;
        case '学校公文':x='file';break;
        case '我的待办':x='todo';break;
      }
      return x;
    }
  }
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
