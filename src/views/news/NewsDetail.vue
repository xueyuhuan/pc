<template>
    <div>
        <subhead>
            <div>新闻资讯&nbsp;<i class="fa fa-angle-double-right"></i>&nbsp;{{news_current.columnName}}</div>
        </subhead>
        <div class="news_div">
            <div class="news_head">{{news_current.title}}</div>
            <div class="news_desc">
                <i class="fa fa-clock-o _theme_font"></i>&nbsp;&nbsp;&nbsp;{{news_current.publishDate}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fa fa-bar-chart-o _theme_font"></i>&nbsp;&nbsp;&nbsp;来源&nbsp;&nbsp;&nbsp;
                <a :href="news_current.url" target="_blank">{{news_current.origin}}</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i :class="{'fa fa-star' : collect,'fa fa-star-o' : !collect}" @click="toggle_collect" style="cursor: pointer;font-size: 16px;color: #fad733;"></i>
            </div>
            <div class="news_content" v-html="news_current.content"></div>
            <div class="news_foot">
                <a v-if="news_pre" @click="updateData(news_pre.id)">上一篇：{{news_pre ? news_pre.title : ''}}</a>
                <a v-if="news_next" @click="updateData(news_next.id)">下一篇：{{news_next ? news_next.title : ''}}</a>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "NewsDetail",
        data(){
            return{
                id:"",
                news_current:{},
                news_next:{},
                news_pre:{},
                collect:false//是否收藏，true-收藏，false-未收藏
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.getData();
        },
        methods:{
            getData(){
                this.$ajax.post(this.$url.news_detail,{id:this.id})
                    .then(res => {
                        this.news_current = res.data.news.current;
                        this.news_next = res.data.news.next;
                        this.news_pre = res.data.news.prev;
                        this.collect = res.data.news.flag;
                    })
            },
            updateData(id){
                this.$ajax.post(this.$url.news_detail,{id:id})
                    .then(res => {
                        this.news_current = res.data.news.current;
                        this.news_next = res.data.news.next;
                        this.news_pre = res.data.news.prev;
                        this.collect = res.data.news.flag;
                        scrollTo(0,0);
                    })
            },
            toggle_collect(){
                let url;
                if(this.collect){//已经收藏，点击后变为未收藏
                    url = this.$url.delFavorites;
                }else{//现未收藏，点击后变为已收藏
                    url = this.$url.addFavorites;
                }
                this.$ajax.post(url,{thirdId:this.news_current.id,type:'news',newsType:0})
                    .then(res => {
                        this.collect = !this.collect;
                        this.$notify.success(res.data.errmsg);
                    })
            }

        },
    }
</script>

<style scoped lang="scss">
    .news_div{
        @extend %width;
        @media only screen and (max-width:767px) {
            padding: 0 8px;
        }
        padding: 0 140px;
        margin-top: 20px;
        background-color: white;
        font-size: 14px;
        .news_head{
            padding: 30px 0;
            color: black;
            text-align: center;
            font-size: 18px;
            margin: 0;
        }
        .news_desc{
            padding-bottom: 20px;
            border-bottom: 1px solid #dee5e7;
            text-align: center;
            font-size: 14px;
            color: #000;
            margin-bottom: 25px;
            &>a{
                max-width: 100px;
                color: blue;
                text-decoration: none;
            }
        }
        .news_content{
            border-bottom: 1px solid #dee5e7;
            p{
                text-indent: 28px;
            }
        }
        .news_foot{
            padding: 20px 0;
            a{
                display: inline-block;
                height: 100%;
                width: 50%;
                padding: 10px 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                color: #7266ba;
                font-size: 13px;
            }
        }
    }
</style>