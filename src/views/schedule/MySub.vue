<template>
    <div>
        <subhead>
            <div><i class="fa fa-arrow-left hand" style="cursor: pointer" @click="goBack"></i>&nbsp;&nbsp;&nbsp;我的订阅
            </div>
        </subhead>
        <div class="contain">
            <card>
                <template slot="header">已订阅</template>
                <div class="content">
                    <div v-for="item in zxlm" v-if="item.subFlag === '1'" class="block">
                        <div class="block_title"><span>{{item.name}}</span></div>
                        <div class="block_hover _theme_news_fontcolor" @click="cancelSub(item.id)"><span><i class="fa fa-minus-circle"></i>&nbsp;取消订阅</span>
                        </div>
                    </div>
                </div>
            </card>

            <card>
                <template slot="header">未订阅</template>
                <div class="content">
                    <div v-for="item in zxlm" v-if="item.subFlag === '0'" class="block">
                        <div class="block_title"><span>{{item.name}}</span></div>
                        <div class="block_hover _theme_news_fontcolor" @click="saveSub(item.id)"><span><i class="fa fa-plus-circle"></i>&nbsp;我要订阅</span>
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MySub",
        data() {
            return {
                zxlm: []
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            getData() {
                this.$ajax.post(this.$url.get_cals_sub)
                    .then(res => {
                        this.zxlm = res.data.cals;
                    })
            },
            cancelSub(id) {//退订已订阅的栏目
                    this.$ajax.post(this.$url.cancelUserCalendar, {calId: id})
                        .then(res => {
                            this.$notify({
                                title: "提示",
                                message: res.data.errmsg,
                                type: "success",
                                position: "bottom-right"
                            })
                            this.getData();
                        })
            },
            saveSub(id) {//订阅栏目
                this.$ajax.post(this.$url.saveUserCalendar, {calId: id})
                    .then(res => {
                        this.$notify({
                            title: "提示",
                            message: res.data.errmsg,
                            type: "success",
                            position: "bottom-right"
                        })
                        this.getData();
                    })
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped lang="scss">
    .contain {
        width: 1200px;
        margin: 20px auto 0 auto;
        font-size: 14px;
        .content_body {
            margin-bottom: 20px;
            background-color: white;
        }
        .content {
            padding: 20px 23px 0;
            .content_title {
                font-size: 16px;
                margin-bottom: 20px;
            }
            @include flex(flex-start, flex-start);
            flex-wrap: wrap;
            .block {
                cursor: pointer;
                width: 180px;
                height: 55px;
                margin-right: 10px;
                margin-bottom: 20px;
                padding: 0 10px;
                border: 1px solid #e7e7e7;
                display: table;
                &:hover {
                    background-color: #EEEEEE;
                    .block_title {
                        display: none;
                    }
                    .block_hover {
                        display: block;
                    }
                }
                .block_title {
                    font-size: 14px;
                    text-align: center;
                    display: table-cell;
                    vertical-align: middle;
                }
                .block_hover {
                    display: none;
                    line-height: 53px;
                    text-align: center;
                    span {
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
            }

        }

    }

</style>