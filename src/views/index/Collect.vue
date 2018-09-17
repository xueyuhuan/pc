<template>
    <card class="collect">
        <template slot="header">
            <div class="left">
                我的收藏
                <div class="btn">
                    <span @click="click('service')" :class="{active:active==='service'}">服务</span>
                    <span @click="click('app')" :class="{active:active==='app'}">应用</span>
                    <span @click="click('news')" :class="{active:active==='news'}">资讯</span></div>
            </div>
            <router-link to="/collections"><i class="fa fa-ellipsis-h"></i></router-link>
        </template>
        <ul class="list service" v-show="active==='service'">
            <template v-if="service&&service.length>0">
                <li v-for="i in service"><router-link :to="'/service/detail/'+i.id"><img :src="$proxy+imgPath+i.id"/><p>{{i.name}}</p></router-link></li>
            </template>
            <li v-else class="no">温馨提示:您一个收藏也没有哦，进入服务的详情页面，点击五角星就可以收藏啦！</li>
        </ul>
        <ul class="list app" v-show="active==='app'">
            <template v-if="app&&app.length>0">
                <li v-for="i in app"><a><img :src="$proxy+imgPath2+i.id"/><p>{{i.name}}</p></a></li>
            </template>
            <li v-else class="no">温馨提示:您一个收藏也没有哦，进入应用的详情页面，点击五角星就可以收藏啦！</li>
        </ul>
        <ul class="list news" v-show="active==='news'">
            <template v-if="news&&news.length>0">
                <li v-for="i in news"><router-link :to="'/news/detail?id='+i.id">{{i.title}}</router-link></li>
            </template>
            <li v-else class="no">温馨提示:您一个收藏也没有哦，进入资讯的详情页面，点击五角星就可以收藏啦！</li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "Collect",
    data(){
      return{
        imgPath:'/resource/service?id=',
        imgPath2:'/resource/app?id=',
        active:'service',
        list:[],
        service:[],
        app:[],
        news:[]
      }
    },
    created(){
      this.getData('/service_portal/get_user_favorites','service','services');//热门
      this.getData('/app_portal/get_user_favorites','app','apps');//应用
      this.getData('/news_portal/getMyNews','news','result');//资讯
    },
    methods:{
      click(type){
        this.active=type;
        this.list=this[type];
      },
      getData(url,store,name){
        this.$ajax.post(url)
            .then(res=>{
              this[store]=res.data[name];
              if(store==='service'){
                this.list=res.data[name];
              }
            })
      },
    }
  }
</script>

<style scoped lang="scss">
    header{
        .left{
            @include flex;
            .btn{
                display: inline-block;
                margin-left: 30px;
                span{
                    display: inline-block;
                    background: #bfbfbf;
                    width: 40px;
                    height: 21px;
                    line-height: 21px;
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                    border-radius: 15px;
                    margin-right: 10px;
                    cursor: pointer;
                    &.active{
                        background: #f08625;
                    }
                }
            }
        }
    }
    ul.list{
        @include flex;
        flex-flow: wrap;
        padding: 15px;
        li{
            width: 50%;
            a{
                @include flex;
                width: 100%;
                padding: 5px;
                img{
                    flex: 0 0 25px;
                    width: 25px;
                    height: 25px;
                }
                p{
                    font-size: 12px;
                    padding-left: 30px;
                    margin: 0;
                    @extend %ellipsis;
                }
            }
        }
        li.no{
            width: 100%;
            font-size: 12px;
            color: #a0a0a0;
        }
    }
    ul.news{
        li{
            width: 100%;
            font-size: 12px;
        }
    }
</style>