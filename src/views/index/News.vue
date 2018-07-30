<template>
    <card class="news">
        <template slot="header">校园资讯
            <router-link to="/news"><i class="fa fa-ellipsis-h"></i></router-link>
        </template>
        <div class="content">
            <div class="left">
                <el-carousel trigger="click" height="200px">
                    <el-carousel-item v-for="i in banner.slice(0,5)">
                        <a :href="i.url" target="_blank"><img :src="i.img"/><p>{{i.title}}</p></a>
                    </el-carousel-item>
                </el-carousel>
                <ul class="nav">
                    <li v-for="(i,index) in columns.slice(0,3)" @click="clickNav(i,index)" :class="{active:index===active}"><i class="fa" :class="{'fa-calendar-minus-o':index===0,'fa-book':index===1,'fa-id-card-o':index===2}"></i><p>{{i.columnName}}</p></li>
                    <li><router-link to="/news"><i class="fa fa-newspaper-o"></i><p>资讯中心</p></router-link></li>
                </ul>
            </div>
            <ul class="right">
                <li v-for="i in news.slice(0,7)"><a :href="i.url" target="_blank"><i class="fa fa fa-bookmark-o text_m"></i><p>{{i.title}}</p><time>&nbsp;{{i.publishDate.substring(5,10)}}</time></a></li>
            </ul>
        </div>
    </card>
</template>

<script>
  export default {
    name: "News",
    data(){
      return{
        banner:[],
        columns:[],
        active:0,
        news:[],
        id:'',
      }
    },
    created(){
      this.getBanner();
      this.getNav();//获取轮播图下导航
      this.getNews();
    },
    methods:{

      getBanner(){
        this.$ajax.post('/news_portal/hit_focus')
            .then(res=>{
              this.banner=res.data.result.imgNews;
            })
      },
      getNav(){
        this.$ajax.post('/news_portal/columns_for_widget')
            .then(res=>{
              this.columns=res.data.columns;
              this.id=res.data.columns[0].id;
            })
      },
      getNews(){
        this.$ajax.post('/news_portal/news_for_widget',{columnId:this.id})
            .then(res=>{
              this.news=res.data.news;
            })
      },
      clickNav(i,index){
        this.active=index;
        this.id=i.id;
        this.getNews();
      }
    }
  }
</script>

<style scoped lang="scss">
    .news{
        .content{
            @include flex;
            .left{
                width: 386.5px;
                .el-carousel{
                    a{
                        position: relative;
                        img{
                            height: 200px;
                            width: 100%;
                        }
                        p{
                            position: absolute;
                            bottom: 30px;
                            left: 50%;
                            width: 232px;
                            font-size: 14px;
                            color: #fff;
                            text-align: center;
                            margin: 0;
                            margin-left: -116px;
                        }
                    }
                }
                ul.nav{
                    @include flex;
                    width: 100%;
                    li{
                        &.active{
                            color: #1295d8!important;
                        }
                        &:hover{
                            color: #141719;
                        }
                        flex: 1;
                        color: #a0a0a0;
                        text-align: center;
                        padding: 10px 0 8px;
                        border-right: 1px solid #dee5e7;
                        cursor: pointer;
                        i{
                            font-size: 24px;
                        }
                        p{
                            font-size: 12px;
                            margin: 5px 0 0 0;
                        }
                    }
                }
            }
            ul.right{
                flex: 1;
                padding: 0 0 5px 30px;
                a{
                    &:hover{
                        background: #f0f3f4;
                    }
                    @include flex;
                    font-size: 14px;
                    padding: 9px 10px;
                    border-top: 1px solid #edf1f2;
                    i{
                        font-size: 12px;
                        color: #98a6ad;
                        padding-right: 10px;
                    }
                    p{
                        width: 305px;
                        margin: 0;
                        @extend %ellipsis;
                    }
                    time{
                        color: #98a6ad;
                    }
                }
            }
        }
    }
</style>