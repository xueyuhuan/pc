<template>
    <div class="todo">
        <subhead>
            <div><i class="fa fa-tv icon"></i>办事中心 <span>Todo List</span></div>
        </subhead>
        <cardTemp class="nav" v-if="$school.todoType">
            <router-link :class="{choose:item.url === '/todo_done'}" v-for="item in $school.todoType" :to="item.url" @click="chooseType(0)">{{item.name}}</router-link>
        </cardTemp>
        <div class="container noborder">
            <cardTemp class="left">
                <header slot="header">条件过滤</header>
                <el-form class="search" label-position="right" label-width="70px">
                    <el-form-item label="来源">
                        <el-select class="input" v-model="sourceValue" clearable placeholder="请选择来源">
                            <el-option v-for="item in myDone_select_contain" :label="item.name" :value="item.id" :key="item.value">
                                {{item.name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input class="input" v-model="title"></el-input>
                    </el-form-item>
                    <el-form-item class="hidden-xs-only" label="办理时间">
                        <el-date-picker class="input" v-model="period" type="daterange" align="right" unlink-panels
                                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button @click="clear">清空</el-button>
                        <el-button class="_theme" type="primary" @click="getDoneList">查询</el-button>
                    </el-form-item>
                </el-form>
            </cardTemp>
            <cardTemp class="right">
                <header slot="header">明细</header>
                <ul class="todoList">
                    <li v-for="i in doneList">
                        <a>
                            <div class="left">
                                <p @click.stop="showTitle(i.title)"><em>【{{i.appname}}】</em>{{i.title}}</p>
                                <span>发起人：{{i.startdept}} {{i.startuser}}</span>
                                <span>发起时间：{{i.createtime.substring(0,16)}}</span>
                                <span>我的办理时间：{{i.opertime.substring(0,16)}}</span>
                            </div>
                            <div class="right" @click="openDoneDetail(i.url)"><i class="fa fa-file-text-o"></i> 查看</div>
                        </a>
                    </li>
                    <li v-if="doneList.length===0"><img src="/img/no_data.png"/></li>
                </ul>
                <el-pagination v-show="total>0"
                        background small
                        @current-change="handleCurrentChange_1"
                        :current-page.sync="page"
                        :page-size="limit"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </cardTemp>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Todo_done",
        data() {
            return {
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
                        this.myDone_select_contain = res.data.apps;
                    })
            },
            //我的已办-右侧明细
            getDoneList() {
                let date1;
                let date2;
                let startDate = '';
                let endDate = '';
                if (this.period && this.period.length === 2 && this.period[0] !== '' && this.period[1] !== '') {
                    date1 = new Date(this.period[0]);
                    date2 = new Date(this.period[1]);
                    startDate = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
                    endDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();

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

<!--待办为公用样式，统一在common-->