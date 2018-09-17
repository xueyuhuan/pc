<template>
    <div class="bg_color">
        <subhead>
            <div><i class="fa fa-arrow-left hand" style="cursor: pointer" @click="goBack"></i>&nbsp;&nbsp;&nbsp;我的订阅</div>
        </subhead>
        <div class="contain">
            <card>
                <template slot="header">已订阅</template>
                    <div class="content" v-for="item in zxlm" v-if="item.subscribe.length > 0">
                        <div class="content_title">{{item.COLUMN_CATEGORY}}</div>
                        <div class="content_block">
                            <div class="block" v-for="b in item.subscribe">
                                <div class="block_title"><span>{{b.COLUMN_NAME}}</span></div>
                                <div class="block_hover _theme_font" @click="cancelSub(b)"><span><i class="fa" :class="{'fa-minus-circle': (b.SCOPE === 'user'),'fa-ban' : b.SCOPE === 'all'}"></i>&nbsp;{{b.SCOPE === 'all' ? '强制订阅' : '取消订阅'}}</span></div>
                            </div>
                        </div>
                    </div>
            </card>

            <card>
                <template slot="header">未订阅</template>
                <div class="content" v-for="item in zxlm" v-if="item.unsubscribe.length > 0">
                    <div class="content_title">{{item.COLUMN_CATEGORY}}</div>
                    <div class="content_block">
                        <div class="block" v-for="b in item.unsubscribe">
                            <div class="block_title"><span>{{b.COLUMN_NAME}}</span></div>
                            <div class="block_hover _theme_font" @click="saveSub(b.ID)"><span><i class="fa fa-plus-circle"></i>&nbsp;我要订阅</span></div>
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsSub",
        data(){
            return{
                zxlm:[]
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            getData(){
                this.$ajax.post(this.$url.columns_subscribe)
                    .then(res => {
                        this.zxlm = res.data.categorys;
                    })
            },
            cancelSub(b){//退订已订阅的栏目
                if(b.SCOPE === 'all'){
                    return;
                }else{
                    this.$ajax.post(this.$url.cancelNews,{columnId:b.ID})
                        .then(res => {
                          this.$notify.success(res.data.errmsg);
                            this.getData();
                        })
                }
            },
            saveSub(id){//订阅栏目
                this.$ajax.post(this.$url.saveNews,{columnId:id})
                    .then(res => {
                      this.$notify.success(res.data.errmsg);
                        this.getData();
                    })
            }
        },
        created(){
            this.getData();
        }
    }
</script>

<style scoped lang="scss">
    .contain{
        @extend %width;
        font-size: 14px;
        .content_body{
            margin-bottom: 20px;
            background-color: white;
        }
        .content{
            padding: 20px 23px 0;
            .content_title{
                font-size: 16px;
                margin-bottom: 20px;
            }
            .content_block{
                @include flex(flex-start,flex-start);
                flex-wrap: wrap;
                .block{
                    cursor: pointer;
                    width: 180px;
                    height: 55px;
                    margin-right: 10px;
                    margin-bottom: 20px;
                    padding: 0 10px;
                    border: 1px solid #e7e7e7;
                    display: table;
                    &:hover{
                        background-color: #EEEEEE;
                        .block_title{
                            display: none;
                        }
                        .block_hover{
                            display: block;
                        }
                    }
                    .block_title{
                        font-size: 14px;
                        text-align: center;
                        display: table-cell;
                        vertical-align: middle;
                    }
                    .block_hover{
                        display: none;
                        line-height: 53px;
                        text-align: center;
                        span{
                            font-size: 14px;
                            /*color: #1295d8;*/
                            font-weight: 700;
                        }
                    }
                }
            }
        }

    }

</style>