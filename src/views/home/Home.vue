<template>
  <div class="home">
    <subhead>
      {{$store.state.user.name}}，欢迎回来!
      <div class="right hidden-xs-only">
        <a v-if="$school.school==='ccnu'" href="http://one.ccnu.edu.cn/help" target="_blank"><i class="fa fa-question-circle-o"></i>&nbsp;帮助</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="popup"><i class="fa fa-cog"></i>&nbsp;工作台设置</button>
      </div>
    </subhead>
    <div class="banner" v-if="bannerShow&&banner>0">
      <img class="close" @click="closeBanner" src="/img/banner-close.png"/>
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="i in banner" >
          <a :href="i.url" target="_blank"><img :src="i.img"/></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <draggable class="drag-list" v-model="A" :options="dragOptions" @end="end">
        <transition-group>
            <component :is="i.componentName" v-for="(i,index) in A" :id=i.id :key="index"></component>
        </transition-group>
      </draggable>
      <draggable class="drag-list" v-model="B" :options="dragOptions" @end="end">
        <transition-group>
          <component :is="i.componentName" v-for="(i,index) in B" :id=i.id :key="index"></component>
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
    // 'Notice2': () => import('./Notice2'),
    'Todo': () => import('./Todo'),
    'User': () => import('./User'),
    'Pay': () => import('./Pay'),
    'Ranking': () => import('./Ranking'),
    'newslist': () => import('./newslist'),
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
        animation: 100, // ms, animation speed moving items when sorting, `0` — without animation
        group: 'description',// or { name: "...", pull: [true, false, clone], put: [true, false, array] }
        disable:true,// Disables the sortable if set to true.
        handle:'.drag',// Drag handle selector within list items
        ghostClass: 'ghost'// Class name for the drop placeholder
      }
    },
    homeA(){
      return this.$store.state.homeA;
    },
    homeB(){
      return this.$store.state.homeB;
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
    },
    homeA(){
      this.getHome();
    },
    homeB(){
      this.getHome();
    }
  },
  created(){
    this.getBanner();
    this.getHome();
    axios.all([
      // this.getApp(),
      // this.getFile(),
      // this.getNotice(),
      // this.getNotice2(),
      this.getPay(),
      // this.getRanking(),
      // this.getSchedule(),
      // this.getService(),
      // this.getTodo(),
      this.getUserModule(),
    ]);

    if(localStorage.bannerShow==='false'){
      this.bannerShow=false;
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
            this.home=res.data.page;
            this.A=this.home.columnWidgets.A;
            //循环获取数据、生成组件名
            for(let i=0;i<this.A.length;i++){
              if(this.A[i].name!=='个人中心'||this.A[i].name!=='工资查询'){
                this.getComponentData(this.A[i].url,this.A[i].params,this.A[i].id,this.A[i].name,this.A[i].moreLink);
              }
              this.A[i].componentName=this.transform(this.A[i].name);
            }
            this.B=this.home.columnWidgets.B;
            for(let i=0;i<this.B.length;i++){
              if(this.B[i].name!=='个人中心'||this.B[i].name!=='工资查询'){
                this.getComponentData(this.B[i].url,this.B[i].params,this.B[i].id,this.B[i].name,this.B[i].moreLink);
              }
              this.B[i].componentName=this.transform(this.B[i].name);
            }
          });
    },
    getComponentData(url,param,id,name,moreLink){//请求地址，请求参数，id，组件名，跳转地址
      if(param!=='') param=JSON.parse(param);
      this.$ajax.post(url,param)
          .then(res=>{
            this.$store.commit('setComponentData',{
              id:id,
              name:name,
              moreLink:moreLink,
              data:res.data.data
            })
          })
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
        // case '通知公告':x='notice2';break;
        case '学校公文':x='file';break;
        case '我的待办':x='todo';break;
        default: x='newslist';
      }
      return x;
    },
    getBanner(){//获取banner
      this.$ajax.post(this.$url.homeBanner,{id: "dashboard"})
          .then(res=>{
            for(let i=0;i<res.data.banners.length;i++){
              this.banner.push({
                img:this.$proxy+res.data.imgUrl+res.data.banners[i].url,
                url:res.data.banners[i].link
              });
            }
          });
    },
    /**
    每个组件数据获取
     **/

    // getApp(){
    //   return this.$ajax.post(this.$url.homeApp)
    //       .then(res=>{
    //         this.$store.commit('set_data',{
    //           data:res.data.data,
    //           name:'app'
    //         })
    //       });
    // },
    // getFile(){
    //   return this.$ajax.post(this.$url.homeFile)
    //       .then(res=>{
    //         this.$store.commit('set_data',{
    //           data:res.data.data,
    //           name:'file'
    //         })
    //       });
    // },
    // getNotice(){
    //   return this.$ajax.post(this.$url.homeNotice)
    //       .then(res=>{
    //         this.$store.commit('set_data',{
    //           data:res.data.data,
    //           name:'notice'
    //         })
    //       });
    // },
    // getNotice2(){
    //   return this.$ajax.post(this.$url.homeNotice2,{columnId:"058ac10ab4684d6aaec045196c09a9b7"})
    //       .then(res=>{
    //         this.$store.commit('set_data',{
    //           data:res.data.data.data,
    //           name:'notice2'
    //         })
    //       });
    // },
    getPay(){
      return this.$ajax.post(this.$url.homePay)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.data,
              name:'pay'
            })
          });
    },
    getRanking(){//切换时获取服务排行数据
      this.$ajax.post(this.$url.homeServiceRank,{type:this.type})
          .then(res=>{
            this.$store.commit('setComponentData',{
              id:'fwph',
              name:'服务排行',
              moreLink:'',
              data:res.data.data
            })
          });
    },
    getSchedule(){//切换时获取日程排行数据
      this.$ajax.post(this.$url.homeSchedule,{date:this.date})
          .then(res=>{
            this.$store.commit('setComponentData',{
              id:'schedule',
              name:'我的日程',
              moreLink:'',
              data:res.data.data
            })
          });
    },
    // getService(){
    //   return this.$ajax.post(this.$url.homeService)
    //       .then(res=>{
    //         this.$store.commit('set_data',{
    //           data:res.data.data,
    //           name:'service'
    //         })
    //       });
    // },
    getUserModule(){
      return this.$ajax.post(this.$url.homeUser)
          .then(res=>{
            this.$store.commit('set_data',{
              data:res.data.data,
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
    @media only screen and (max-width:767px) {
      width: 100%;
    }
    min-height: 100px;
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
    @extend %width;
    margin-bottom: 20px;
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
    @extend %width;
    @include flex(space-between,flex-start);
    flex-flow: wrap;
    &>div{
      width: 595px;
      @media only screen and (max-width:767px) {
        width: 100%;
      }
    }
  }
</style>
