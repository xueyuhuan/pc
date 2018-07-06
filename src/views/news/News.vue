<template>
    <div class="bg_color">
        <subhead>
            <div><i class="fa fa-th-large"></i>&nbsp;&nbsp;&nbsp;资讯中心 <span>News Center</span></div>
            <el-input :placeholder="placeholder" v-model="input_value" size="small">
                <el-button slot="append" icon="el-icon-search" @click="searchTitle"></el-button>
            </el-input>
        </subhead>
        <div class="contain">
            <card class="left_div">
                <header slot="header">新闻资讯</header>
                <div class="new_condition">
                    <div class="new_condition1">
                        <div class="title_div">资讯栏目：</div>
                        <span class="span_all" :class="{active:id === ''}" @click="choose_zxlm('')">全部</span>
                        <div class="content_div"><label v-for="item in zxlm"><span :class="{active:id === i.ID}" v-for="i in item.subscribe" @click="choose_zxlm(i.ID)">{{i.COLUMN_NAME}}</span></label></div>
                    </div>
                    <div class="new_condition1">
                        <div class="title_div">发布时间：</div>
                        <span class="span_all" :class="{active: date_index === 0}" @click="choose_date(-1)">全部</span>
                        <div class="content_div"><span :class="{active:index + 1 === date_index}" v-for="(item,index) in date" @click="choose_date(index)">{{item}}</span></div>
                    </div>
                </div>
                <div class="news_div" v-for="(news,id) in newsList" @click="newsDetail(id)">
                    <div class="news">
                        <div class="news_title">{{news.title}}</div>
                        <div class="source">来源：{{news.origin}}</div>
                    </div>
                    <div class="time">{{news.publishDate.substring(5,10)}}</div>
                </div>
                <div class="block">
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-size="10"
                            layout="prev, pager, next"
                            :total="newsList_length">
                    </el-pagination>
                </div>
            </card>
            <card class="right_div">
                <header slot="header">阅读排行</header>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "News",
        data(){
            return{
                placeholder:"",
                input_value:"",
                zxlm:[],//资讯栏目所有内容
                id:"",//资讯栏目的id
                date:["今天","近三天","近一周","本月","1个月前"],
                date_index:0,//发布时间0-今天，以此类推
                newsList:[],//新闻列表
                newsList_length:0,
                page:1,
            }
        },
        methods:{
            searchTitle(){

            },
            get_zxlm(){
                this.$ajax.post(this.$url.columns_subscribe)
                    .then(res => {
                        this.zxlm = res.data.categorys;
                    })
            },
            choose_zxlm(id){
                this.id = id;
                this.getNewsList();
            },
            choose_date(index){
                this.date_index = index + 1;
                this.getNewsList();
            },
            getNewsList(){
                this.$ajax.post(this.$url.news_list,{page:this.page,columnId:this.id,dateIndex:this.date_index})
                    .then(res => {
                        console.log(res.data);
                        this.newsList_length = res.data.count;
                        this.newsList = res.data.news;
                    })
            },
            handleCurrentChange(page){
                this.page = page;
                this.getNewsList();
            },
            newsDetail(id){
                this.$router.push({path:"/news/detail",query:id});
            }
        },
        created(){
            this.get_zxlm();//获取所有咨询栏目
            this.getNewsList();
        }
    }
</script>

<style scoped lang="scss">
    .bg_color {
        @extend %bg1;
    }
    .contain {
        @extend %content;
        @include flex(space-between, flex-start);
        .left_div {
            width: 784px;
            background: #fff;
            border-top: 3px solid $skin-card;
            margin-bottom: 20px;
            font-size: 14px;
            color: rgb(0,0,0);
            .new_condition{
                padding: 13px 23px;
                border-bottom: 1px dashed #eaeaea;
                .new_condition1{
                    padding: 5px 0;
                    @include flex(flex-start,flex-start);
                    .title_div{
                        width: 80px;
                        padding: 3px 0;
                        flex: 0 0 80px;
                    }
                    .content_div{
                        flex: 0 0 600px;
                    }
                    .span_all{
                        display: block;
                        flex: 0 0 50px;
                        text-align: center;
                    }
                    span{
                        display: inline-block;
                        margin-left: 5px;
                        padding: 3px 5px;
                        cursor: pointer;
                    }
                    .active{
                        color: #fff;
                        background-color: #1295d8;
                        border-radius: 2px;
                    }
                }
            }
            .news_div{
                padding: 10px 23px;
                border-bottom: 1px dashed #eaeaea;
                @include flex(space-between,flex-start);

                &:hover{
                    background-color: #eee;
                    cursor: pointer;
                }
                .news{
                    border-left: 3px solid #1295d8;
                    padding-left: 10px;
                    .news_title{
                        width: 650px;
                        font-size: 14px;
                        color: #000;
                    }
                    .source{
                        font-size: 12px;
                        color: #959595;
                    }
                }
            }
            .block{
                padding: 10px 23px;
                text-align: center;

            }
        }
        .right_div {
            width: 399px;
        }
    }
</style>