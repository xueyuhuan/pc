<template>
  <div class="home">
    <subhead>
      {{$store.state.user.name}}，欢迎回来!
      <div class="right">
        <a href="http://one.ccnu.edu.cn/help" target="_blank"><i class="fa fa-question-circle-o"></i>&nbsp;帮助</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="popup"><i class="fa fa-cog"></i>&nbsp;工作台设置</button>
      </div>
    </subhead>
    <div class="banner" v-show="bannerShow">
      <img class="close" @click="closeBanner" :src="$proxy+'/img/banner-close.png'"/>
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="i in banner" >
          <a :href="i.url" target="_blank"><img :src="i.img"/></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <draggable class="drag-list" v-model="A" :options="dragOptions" @end="end">
        <transition-group>
            <component :is="i.componentName" v-for="(i,index) in A" :key="index"></component>
        </transition-group>
      </draggable>
      <draggable class="drag-list" v-model="B" :options="dragOptions" @end="end">
        <transition-group>
          <component :is="i.componentName" v-for="(i,index) in B" :key="index"></component>
        </transition-group>
      </draggable>
    </div>
    <AppSet></AppSet>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import AppSet from "./AppSet";
export default {
  name: "home",
  components: {
    AppSet,
    draggable,
    'Application': () => import('./Application'),
    'File': () => import('./File'),
    'Schedule': () => import('./Schedule'),
    'Service': () => import('./Service'),
    'Notice': () => import('./Notice'),
    'Notice2': () => import('./Notice2'),
    'Todo': () => import('./Todo'),
    'User': () => import('./User'),
    'Pay': () => import('./Pay'),
    'Ranking': () => import('./Ranking'),
  },
  data(){
    return{
      banner:[],//banner列表
      bannerShow:true,//banner是否显示
      home:{},//工作台布局
      A:[],
      B:[],

    }
  },
  computed:{
    dragOptions(){
      return{
        animation: 100,
        group: 'description',
        disable:true,
        handle:'.drag',
        ghostClass: 'ghost'
      }
    },
    type(){//排行的日期
      return this.$store.state.type;
    },
    date(){//日程的日期
      return this.$store.state.date;
    }
  },
  watch:{
    type(){
      this.getRanking();
    },
    date(){
      this.getSchedule();
    }
  },
  created(){
    this.getBanner();
    this.getHome();
    axios.all([
      this.getApp(),
      this.getFile(),
      this.getNotice(),
      this.getNotice2(),
      this.getPay(),
      this.getRanking(),
      this.getSchedule(),
      this.getService(),
      this.getTodo(),
      this.getUser(),
    ]);
    if(localStorage.bannerShow){
      this.bannerShow=localStorage.bannerShow;
    }
  },
  methods:{
    popup(){//打开工作台设置
      this.$store.commit('set_data',{
        data:true,
        name:'popupShow'//弹框显示
      });
      this.$store.commit('set_data',{
        data:"home",
        name:'popupType'//设置弹框类型
      });
    },
    closeBanner(){//关闭banner
      this.bannerShow=false;
      localStorage.bannerShow=this.bannerShow;
    },
    end(){//拖拽结束保存布局
      let layout={A:this.A,B:this.B};
      this.$ajax.post(this.$url.homePageSave,{layout:JSON.stringify(layout),pageId:this.home.id})
          .then(res=>{
            if(res.data.errmsg==='ok'){
              this.$notify.success('布局已保存');
            }
          })
    },
    getHome(){//获取页面布局
      this.$ajax.post(this.$url.homePage)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.pages[0],
              name:'home'
            });
            this.home=res.data.pages[0];
            this.A=this.home.columnWidgets.A;
            for(let i=0;i<this.A.length;i++){
              this.A[i].componentName=this.transform(this.A[i].NAME);
            }
            this.B=this.home.columnWidgets.B;
            for(let i=0;i<this.B.length;i++){
              this.B[i].componentName=this.transform(this.B[i].NAME);
            }
          });
    },
    transform(name){//根据名字转换组件
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
    },
    getBanner(){//获取banner
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
    /**
    每个组件数据获取
     **/
    getApp(){
      return this.$ajax.post(this.$url.homeApp)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.apps,
              name:'app'
            })
          });
    },
    getFile(){
      return this.$ajax.post(this.$url.homeFile)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.gongwenList.slice(0,7),
              name:'file'
            })
          });
    },
    getNotice(){
      return this.$ajax.post(this.$url.homeNotice)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.xntzList.slice(0,7),
              name:'notice'
            })
          });
    },
    getNotice2(){
      return this.$ajax.post(this.$url.homeNotice2,{columnId:"058ac10ab4684d6aaec045196c09a9b7"})
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.news.slice(0,7),
              name:'notice2'
            })
          });
    },
    getPay(){
      return this.$ajax.post(this.$url.homePay)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data,
              name:'pay'
            })
          });
    },
    getRanking(){
      return this.$ajax.post(this.$url.homeServiceRank,{type:this.type})
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.services,
              name:'ranking'
            })
          });
    },
    getSchedule(){
      return this.$ajax.post(this.$url.homeSchedule,{date:this.date})
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.events,
              name:'schedule'
            })
          });
    },
    getService(){
      return this.$ajax.post(this.$url.homeService)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.services,
              name:'service'
            })
          });
    },
    getTodo(){
      return this.$ajax.post(this.$url.homeTodo)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.todoList,
              name:'todo'
            })
          });
    },
    getUser(){
      return this.$ajax.post(this.$url.homeUser)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.services,
              name:'userModule'
            })
          });
    },
  }
};
</script>

<style scoped lang="scss">
  .ghost {
    opacity: .5;
  }
  .drag-list>span{
    display: inline-block;
    width: 595px;
    min-height: 50px;
  }
  .home{
    .card:hover{
      box-shadow: 0 0 30px rgba(0,0,0,.25);
    }
    .drag{
      cursor: pointer!important;
    }
  }
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
    position: relative;
    width: 1200px;
    margin: 0 auto 20px;
    .close{
      position: absolute;
      top:10px;
      right: 10px;
      z-index: 99;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
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
    &>div{
      width: 595px;
    }
  }
</style>
