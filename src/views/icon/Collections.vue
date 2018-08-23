<template>
    <div>
        <subhead>
            <div><i class="fa fa-star-o"></i>&nbsp;&nbsp;&nbsp;我的收藏 <span>My Collections</span></div>
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
                            <div v-for="item in service" @click="openService(item.url)" class="service_block">
                                <img :src="item.img" />
                                <div>{{item.name}}</div>
                                <i @click.stop="delFavorites(item.id,'service')" class="fa fa-star starColor"></i>
                            </div>
                        </div>
                    </card>
                </div>
                <div class="app">
                    <card>
                        <template slot="header"><span><i class="fa fa-star starColor"></i>&nbsp;&nbsp;应用</span></template>
                        <div class="service_body">
                            <div v-for="item in app" @click="openApp(item.url)" class="service_block">
                                <img :src="$proxy+`/resource/app?id=${item.id}&timestamp=${item.timestamp}`"/>
                                <div>{{item.name}}</div>
                                <i @click.stop="delFavorites(item.id,'app')" class="fa fa-star starColor"></i>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
            <div class="news">
                <card>
                    <template slot="header"><span><i class="fa fa-star starColor"></i>&nbsp;&nbsp;资讯</span></template>
                    <div class="">
                        <div v-for="item in news" class="news_block">
                            <div class="news_title" @click="openNews(item.id)">{{item.title}}</div>
                            <div class="news_desc">
                                <i @click.stop="delFavorites(item.id,'news')" class="fa fa-star starColor">&nbsp;&nbsp;</i>
                                 <span class="starSpan"><i class="fa fa-clock-o"></i>&nbsp;&nbsp;{{item.publishDate.substring(0,10)}}</span>
                            </div>
                        </div>
                    </div>
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
    .contain{
        width: 1200px;
        margin: 0 auto;
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
            .service{
                width: 585px;
            }
            .service_body{
                padding-bottom: 43px;
                @include flex(flex-start,flex-start);
                flex-wrap: wrap;
            }
            .service_block{
                width: 50%;
                padding: 10px 23px;
                cursor: pointer;
                @include flex(flex-start,center);
                img{
                    width: 30px;
                    height: 30px;
                }
                div{
                    width: 180px;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
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
            }
        }
        .news_block{
            width: 50%;
            padding: 10px 23px;
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
            .news_desc{
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