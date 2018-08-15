<template>
    <div>
        <subhead>
            <div><i class="fa fa-tv"></i>&nbsp;&nbsp;&nbsp;办事中心 <span>Todo List</span></div>
        </subhead>
        <div class="contain">
            <CardTemp class="head" v-if="todoType.length > 1">
                <router-link class="head_btn" :class="{btn_choosen:item.url === '/todo_done'}" v-for="item in todoType" :to="item.url">
                    {{item.name}}
                </router-link>
            </CardTemp>
            <div class="content">
                <div class="content_left">
                    <card>
                        <template slot="header">条件过滤</template>
                        <div class="menuDiv_input">
                            <el-form label-position="right" label-width="80px">
                                <el-form-item label="来源:">
                                    <el-select v-model="sourceValue" clearable filterable placeholder="请选择来源"
                                               style="width:266px;">
                                        <el-option v-for="item in myDone_select_contain" :label="item.name"
                                                   :value="item.id" :key="item.value">{{item.name}}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="标题:">
                                    <el-input v-model="title"></el-input>
                                </el-form-item>
                                <el-form-item label="办理时间:">
                                    <el-date-picker
                                            class="dateInput"
                                            v-model="period"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickerOptions2">
                                    </el-date-picker>
                                </el-form-item>
                                <el-row style="text-align: center;">
                                    <el-button @click="clear">清空</el-button>
                                    <el-button type="primary" style="background-color: #1295d8;" @click="getDoneList">查询
                                    </el-button>
                                </el-row>

                            </el-form>
                        </div>
                    </card>
                </div>
                <div class="content_right">
                    <card>
                        <template slot="header">明细</template>
                        <div v-for="item in doneList" @click="" class="block">
                            <div class="blockLeft">
                                <div class="title">
                                    <span>【{{item.appname}}】</span>
                                    <i style="font-style: normal" @click.stop="showTitle(item.title)">{{item.title}}</i>&nbsp;&nbsp;
                                </div>
                                <div class="time">
                                    <span>发起人：{{item.startdept}}{{item.startuser}}</span>
                                    <span>发起时间：{{item.createtime.substring(0,16)}}</span>
                                    <span>我的办理时间：{{item.opertime.substring(0,16)}}</span>
                                </div>
                            </div>
                            <div @click="openDoneDetail(item.url)" class="blockRight"><i
                                    class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;查看
                            </div>
                        </div>
                        <div v-if="doneList.length > 0" style="text-align: center;padding: 10px 23px;">
                            <el-pagination
                                    background
                                    @current-change="handleCurrentChange_1"
                                    :current-page.sync="page"
                                    :page-size="limit"
                                    layout="total, prev, pager, next"
                                    :total="total">
                            </el-pagination>
                        </div>
                    </card>
                    <div style="text-align: center">
                        <img v-if="doneList.length === 0"
                             src="/img/no_data.png"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Todo_done",
        data() {
            return {
                todoType: this.$school.todoType,
                //  我的已办-查询条件
                myDone_select_contain: [],//来源备选项
                sourceValue: '',//来源
                title: '',//标题
                period: '',//查询时间段
                doneList: [],//已办明细列表
                pickerOptions2: {//快捷选择时间段，
                    shortcuts: [{
                        text: '最近三天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近7天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '全部',
                        onClick(picker) {
                            const end = '';
                            const start = '';
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                page: 1,//我发起的-当前页码
                total: 0,//数据总条数
                limit: 10,//一页的数据条数
            }
        },
        methods: {
            //我的已办-左侧下拉框备选项
            get_myDone_apps() {
                this.$ajax.post(this.$url.get_myDone_apps)
                    .then(res => {
                        console.log(res.data);
                        this.myDone_select_contain = res.data.apps;
                    })
            },
            //我的已办-右侧明细
            getDoneList() {
                console.log(this.period);
                let date1;
                let date2;
                let startDate = '';
                let endDate = '';
                if (this.period && this.period.length === 2 && this.period[0] !== '' && this.period[1] !== '') {
                    date1 = new Date(this.period[0]);
                    date2 = new Date(this.period[1]);
                    startDate = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
                    endDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
                    console.log(startDate);
                    console.log(endDate);
                }
                this.$ajax.post(this.$url.query_done, {
                    appId: this.sourceValue,
                    title: this.title,
                    startDate: startDate,
                    endDate: endDate,
                    page: this.page,
                    limit: this.limit
                })
                    .then(res => {
                        console.log(res.data);
                        this.doneList = res.data.data.rows;
                        this.page = res.data.data.page;
                        this.total = res.data.data.records;
                        this.limit = res.data.data.pageSize;
                    })
            },
            //打开已办详情
            openDoneDetail(url) {
                window.open(url);
            },
            //我的已办,分页
            handleCurrentChange_1(page) {
                this.page = page;
                this.getDoneList();
            },
            //清空
            clear() {
                this.sourceValue = '';
                this.title = '';
                this.period = '';
                this.page = 1;
                this.getDoneList();
            },
            //点击将该条新闻标题展示在左侧条件区
            showTitle(title){
                this.title = title;
                this.getDoneList();
            }
        },
        mounted() {
            this.get_myDone_apps();
            this.getDoneList();
        }
    }
</script>

<style scoped lang="scss">
    .contain {
        width: 1200px;
        margin: 0 auto;
        .head {
            padding: 10px 28px;
            margin-bottom: 10px;
            .head_btn {
                display: inline-block;
                background: #BFBFBF;
                height: 30px;
                line-height: 30px;
                width: 90px;
                font-size: 16px;
                color: white;
                text-align: center;
                border-radius: 15px;
                margin-right: 10px;
                cursor: pointer;
            }
            .btn_choosen {
                background: #F08625;
            }
        }
        .content {
            .card {
                border-top: none;
            }
            @include flex(space-between, flex-start);
            .content_left {
                width: 386px;
                background: white;
                ul {
                    li {
                        &.title {
                            font-size: 18px;
                            font-weight: 700;
                            color: #0683c3;
                            cursor: auto;
                        }
                        cursor: pointer;
                        padding: 12px 23px;
                        font-size: 14px;
                        color: #363f44;
                        border-bottom: 1px dashed #eaeaea;
                        &:last-child {
                            border: none;
                        }
                        i {
                            margin-right: 8px;
                        }
                    }
                }
                .todoSourceActive {
                    background: #efefef;
                }
                .menuDiv_input {
                    padding: 20px;
                    .dateInput {
                        width: 266px;
                    }
                }
            }
            .content_right {
                width: 784px;
                background-color: white;
                .block {
                    padding: 12px 23px;
                    font-size: 14px;
                    border-bottom: 1px dashed #eaeaea;
                    cursor: pointer;
                    &:hover {
                        background-color: #efefef;
                    }
                    @include flex(space-between, center);
                    .title {
                        width: 650px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        span {
                            color: #0683c3;
                        }
                    }
                    .time {
                        font-size: 12px;
                        margin-top: 5px;
                        color: #a0a0a0;
                        span {
                            padding-left: 20px;
                        }
                    }
                    .blockRight {
                        font-size: 14px;
                        color: #f7b47f;
                    }
                }
            }
        }
    }

    .dialog_content {
        @include flex(center, center);
        .content_title {
            font-size: 18px;
        }
        .content_desc {
            font-size: 14px;
            padding-top: 5px;
            color: #959595;
        }
    }

    .pad15 {
        padding: 0 15px;
    }
</style>