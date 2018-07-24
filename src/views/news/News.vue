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
                <template slot="header">新闻资讯 <router-link to="/news/sub" class="dingyue"><i class="fa fa-plus-square-o"></i>&nbsp;订阅</router-link></template>
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
                <div class="news_div" v-for="news in newsList" @click="newsDetail(news.id)">
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
                <template slot="header">
                    <span>阅读排行</span>
                    <div class="date_div">
                        <div :class="{'rank_date_active':rank_date_value === item.value}" v-for="item in rank_date" @click="toggle_rank(item.value)">{{item.name}}</div>
                    </div>
                </template>
                <div v-for="item in rank_news">{{item.title}}</div>
                <div class="nodata" v-if="rank_news.length == 0">暂无数据</div>
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
                rank_date:[{name:'今日',value:'day'},{name:'本周',value:'week'},{name:'本月',value:'month'}],//阅读排行
                rank_date_value:'day',//阅读排行值
                rank_news:[]
            }
        },
        methods:{
            searchTitle(){
                this.getNewsList();
            },
            //获取所有咨询栏目
            get_zxlm(){
                this.$ajax.post(this.$url.columns_subscribe)
                    .then(res => {
                        this.zxlm = res.data.categorys;
                    })
            },
            //选择咨询栏目
            choose_zxlm(id){
                this.id = id;
                this.getNewsList();
            },
            choose_date(index){
                this.date_index = index + 1;
                this.getNewsList();
            },
            //新闻列表
            getNewsList(){
                this.$ajax.post(this.$url.news_list,{page:this.page,columnId:this.id,dateIndex:this.date_index,key:this.input_value})
                    .then(res => {
                        console.log(res.data);
                        this.newsList_length = res.data.count;
                        this.newsList = res.data.news;
                    })
            },
            //选择页码
            handleCurrentChange(page){
                this.page = page;
                this.getNewsList();
            },
            //新闻详情
            newsDetail(id){
                this.$router.push({path:"/news/detail",query: {id}});
            },
            //获取阅读排行
            get_rank(){
                this.$ajax.post(this.$url.rank_news,{type:this.rank_date_value})
                    .then(res => {
                        console.log(res.data);
                       this.rank_news = res.data.news;
                    })
            },
            //切换阅读排行
            toggle_rank(value){
                this.rank_date_value = value;
                this.get_rank();
            }
        },
        created(){
            this.get_zxlm();//获取所有咨询栏目
            this.getNewsList();
            this.get_rank();
        }
    }
</script>
<style scoped lang="scss">
    .bg_color {
        @extend %bg1;
    }
    .nodata{
        font-size: 14px;
        padding: 10px;
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
            .dingyue{
                font-size: 14px;
                color: #363f44;
                text-decoration: none;
                line-height: 25px;
            }
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
                        background-color: #65637b;
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
            .date_div{
                @include flex(flex-start,justify-content);
                margin-right: 100px;
                div{
                    font-size: 12px;
                    background-color: #bfbfbf;
                    color: #fff;
                    margin-right: 10px;
                    border-radius: 15px;
                    height: 21px;
                    line-height: 21px;
                    width: 40px;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .rank_date_active{
                background-color: #f08625 !important;
            }
        }
    }
</style>