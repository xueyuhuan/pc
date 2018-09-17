<template>
    <div>
        <subhead>
            <div><i class="fa fa-star-o icon"></i>我的收藏 <span>My Collections</span></div>
        </subhead>
        <div class="contain">
            <div class="myCollections _theme_card">
                <div class="title">我的收藏概况</div>
                <div class="band">
                    <div class="band_block">
                        <div class="band_title">全部收藏</div>
                        <div class="band_num" style="color: #6254b2;">{{sum}}</div>
                    </div>
                    <div class="band_block">
                        <div class="band_title">&nbsp;</div>
                        <div class="band_num" style="width: 1px;height: 40px;background-color: black;"></div>
                    </div>
                    <div class="band_block">
                        <div class="band_title">服务</div>
                        <div class="band_num">{{service.length}}</div>
                    </div>
                    <div class="band_block">
                        <div class="band_title">应用</div>
                        <div class="band_num">{{app.length}}</div>
                    </div>
                    <div class="band_block">
                        <div class="band_title">资讯</div>
                        <div class="band_num">{{news.length}}</div>
                    </div>
                    <div class="band_block">
                        <div class="band_title">其他</div>
                        <div class="band_num">0</div>
                    </div>
                </div>
            </div>
            <div class="serviceApp">
                <div class="service">
                    <card>
                        <template slot="header"><span><i class="fa fa-star starColor"></i>&nbsp;&nbsp;服务</span></template>
                        <div class="service_body">
                            <template v-if="service.length>0">
                                <div v-for="item in service" @click="openService(item.url)" class="service_block">
                                    <img :src="item.img" />
                                    <div>{{item.name}}</div>
                                    <i @click.stop="delFavorites(item.id,'service')" class="fa fa-star starColor"></i>
                                </div>
                            </template>
                            <div v-else class="no-data">温馨提示:您一个收藏也没有哦，进入服务的详情页面，点击五角星就可以收藏啦！</div>
                        </div>
                    </card>
                </div>
                <div class="app">
                    <card>
                        <template slot="header"><span><i class="fa fa-star starColor"></i>&nbsp;&nbsp;应用</span></template>
                        <div class="service_body">
                            <template v-if="app.length>0">
                                <div v-for="item in app" @click="openApp(item.url)" class="service_block">
                                    <img :src="$proxy+`/resource/app?id=${item.id}&timestamp=${item.timestamp}`"/>
                                    <div>{{item.name}}</div>
                                    <i @click.stop="delFavorites(item.id,'app')" class="fa fa-star starColor"></i>
                                </div>
                            </template>
                            <div v-else class="no-data">温馨提示:您一个收藏也没有哦，进入应用的详情页面，点击五角星就可以收藏啦！</div>
                        </div>
                    </card>
                </div>
            </div>
            <div class="news">
                <card>
                    <template slot="header"><span><i class="fa fa-star starColor"></i>&nbsp;&nbsp;资讯</span></template>
                    <template v-if="news.length>0">
                        <div v-for="item in news" class="news_block">
                            <div class="news_title" @click="openNews(item.id)">{{item.title}}</div>
                            <div class="news_desc">
                                <i @click.stop="delFavorites(item.id,'news')" class="fa fa-star starColor">&nbsp;&nbsp;</i>
                                 <span class="starSpan"><i class="fa fa-clock-o"></i>&nbsp;&nbsp;{{item.publishDate.substring(0,10)}}</span>
                            </div>
                        </div>
                    </template>
                    <div v-else class="no-data">温馨提示:您一个收藏也没有哦，进入资讯的详情页面，点击五角星就可以收藏啦！</div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Collections",
        data(){
            return{
                service:[],
                app:[],
                news:[]
            }
        },
        computed:{
            sum(){
                return this.service.length + this.app.length + this.news.length;
            }
        },
        methods:{
            getService(){
                this.$ajax.post(this.$url.collectionService)
                    .then(res => {
                        this.service = res.data.services;
                    })
            },
            openService(url){
                window.open(url);
            },
            getApp(){
                this.$ajax.post(this.$url.collectionApp)
                    .then(res => {
                        this.app = res.data.apps;
                    })
            },
            openApp(url){
                window.open(url)
            },
            getNews(){
                this.$ajax.post(this.$url.collectionNews)
                    .then(res => {
                        this.news = res.data.result;
                    })
            },
            openNews(id){
                this.$router.push({path:"/news/detail",query: {id}});
            },
            delFavorites(id,type){
                this.$ajax.post(this.$url.delFavorites,{thirdId:id,type:type,newsType:1})
                    .then(res => {
                        if(res.data.errcode == '0'){
                            this.$notify.success(res.data.errmsg);
                            if(type === 'service'){
                                this.getService();
                            }
                            if(type === 'app'){
                                this.getApp();
                            }
                            if(type === 'news'){
                                this.getNews();
                            }
                        }else{
                            this.$notify.warning(res.data.errmsg)
                        }

                    })
            }
        },
        created(){
            this.getService();
            this.getApp();
            this.getNews();
        }
    }
</script>

<style scoped lang="scss">
    .no-data{
        font-size: 12px;
        color: #a0a0a0;
        padding: 10px 20px;
    }
    .contain{
        @extend %width;
        .starColor{
            color: #fad733;
            cursor: pointer;
        }
        .myCollections{
            background-color: #fff;
            padding: 12px 0;
            margin-bottom: 20px;
            .title{
                font-size: 18px;
                padding: 10px 0;
                text-align: center;
            }
            .band{
                @include flex(space-around,center);
                .band_block{
                    text-align: center;
                    .band_title{
                        font-size: 16px;
                        margin: 15px 0;
                    }
                    .band_num{
                        color: yellowgreen;
                        font-size: 30px;
                    }
                }
            }
        }
        .serviceApp{
            @include flex(space-between,flex-start);
            flex-flow: wrap;
            .service{
                width: 585px;
                @media only screen and (max-width:767px) {
                    width: 100%;
                }
            }
            .service_body{
                @include flex(flex-start,flex-start);
                flex-wrap: wrap;
            }
            .service_block{
                width: 50%;
                padding: 10px 20px;
                cursor: pointer;
                @include flex(flex-start,center);
                img{
                    width: 30px;
                    height: 30px;
                }
                div{
                    font-size: 14px;
                    @extend %ellipsis;
                    margin: 0 15px;
                }
                &>i{
                    display: none;
                }
                &:hover>i{
                    cursor: pointer;
                    display: block;
                }
            }
            .app{
                width: 585px;
                @media only screen and (max-width:767px) {
                    width: 100%;
                }
            }
        }
        .news_block{
            width: 50%;
            @media only screen and (max-width:767px) {
                width: 100%;
            }
            padding: 10px 20px;
            border-bottom: 1px dashed #e4e4e4;
            font-size: 14px;
            &:hover{
                background-color: #efefef;
            }
            &:hover>span>i{
                display: block;
            }
            @include flex(space-between,center);
            .news_title{
                font-size: 14px;
                width: 437px;
                @media only screen and (max-width:767px) {
                    width: auto;
                }
                @extend %ellipsis;
                cursor: pointer;
            }
            .news_desc{
                flex: 0 0 100px;
                .starSpan{
                    font-size: 13px;
                    color: #a0a0a0;
                    i{
                        display: none;
                    }
                }
            }
        }
    }
</style>