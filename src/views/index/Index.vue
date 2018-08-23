<template>
    <div id="index">
        <subhead>
            {{$store.state.user.name}}，欢迎回来!
            <div class="week" v-if="week!=null && week.termName!=null">{{week.termName}}第<em>{{week.name}}</em>教学周</div>
        </subhead>
        <div class="content">
            <div class="left">
                <work></work>
                <news></news>
                <service></service>
            </div>
            <div class="right">
                <user></user>
                <div class="ad" v-if="banner.length>0">
                    <el-carousel trigger="click" height="211px">
                        <el-carousel-item v-for="i in banner">
                            <a :href="i.link" :title="i.title" target="_blank"><img :src="$proxy+imgUrl+i.url"/></a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <collect></collect>
                <application></application>
            </div>
        </div>
        <Jump></Jump>
    </div>
</template>

<script>
  import Work from "./Work";
  import News from "./News";
  import Service from "./Service";
  import User from "./User";
  import Collect from "./Collect";
  import Application from "./Application";
  import Jump from "../icon/todo/Jump";
  export default {
    name: "Index",
    components: {Jump, Application, Collect, User, Service, News, Work},
    data(){
      return{
        week:'',
        imgUrl:'',
        banner:[]
      }
    },
    created(){
      this.getData('/week_portal/current','week','current');//学期周
      this.getAd();
    },
    methods:{
      getData(url,store,name){
        this.$ajax.post(url)
            .then(res=>{
              this[store]=res.data[name];
            })
      },
      getAd(){
        this.$ajax.post('/banner_portal/get',{id:'dashboard'})
            .then(res=>{
              this.imgUrl=res.data.imgUrl;
              if(res.data.space){
                this.banner=res.data.space.banners;
              }
            })
      }
    }
  }
</script>

<style scoped lang="scss">
    #index{
        .subhead{
            em{
                font-size: 18px;
                font-weight: bold;
                padding: 0 5px;
            }
        }
        .content{
            @include flex(space-between,flex-start);
            @extend %width;
            .left{
                width: 805px;
            }
            .right{
                width: 380px;
                .ad{
                    margin-bottom: 20px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }

</style>