<template>
    <div class="todo">
        <subhead>
            <div><i class="fa fa-tv icon"></i>办事中心 <span>Todo List</span></div>
        </subhead>
        <cardTemp class="nav" v-if="$school.todoType">
            <router-link :class="{choose:item.url === '/todo_create'}" v-for="item in $school.todoType" :to="item.url" @click="chooseType(0)">{{item.name}}</router-link>
        </cardTemp>
        <div class="container noborder">
            <cardTemp class="left">
                <header slot="header">条件过滤</header>
                <el-form class="search" label-position="right" label-width="80px">
                    <el-form-item label="来源">
                        <el-select class="input" v-model="sourceValue" clearable placeholder="请选择来源">
                            <el-option v-for="item in myDone_select_contain" :label="item.name"
                                       :value="item.id" :key="item.value">{{item.name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input class="input" v-model="title"></el-input>
                    </el-form-item>
                    <el-form-item label="办理状态">
                        <el-select class="input" v-model="blStatusValue" clearable placeholder="请选择办理状态">
                            <el-option v-for="item in blStatus" :label="item.name"
                                       :value="item.value">{{item.name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="hidden-xs-only" label="办理时间:">
                        <el-date-picker
                                class="input"
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
                    <el-form-item style="text-align: center">
                        <el-button @click="clear">清空</el-button>
                        <el-button type="primary" class="_theme" @click="getMyList">查询</el-button>
                    </el-form-item>
                </el-form>
            </cardTemp>
            <cardTemp class="right">
                <header slot="header">明细</header>
                <ul class="todoList">
                    <li v-for="i in myList">
                        <a>
                            <div class="left">
                                <p @click.stop="showTitle(i.title)"><em>【{{i.appname}}】</em>{{i.title}}
                                    <small v-if="i.stateno==='1'" class="warning">{{i.state}}</small>
                                    <small v-if="i.stateno==='2'" class="progress">{{i.state}}</small>
                                    <small v-if="i.stateno==='3'" class="light">{{i.state}}</small>
                                    <small v-if="i.stateno==='4'" class="danger">{{i.state}}</small>
                                </p>
                                <span>发起时间：{{i.createtime}}</span>
                                <span>当前环节：<b style="color: #0683c3;" @click.stop="showLink(i.taskid)">{{i.currentnode}}</b></span>
                            </div>
                            <div class="right" @click="openDoneDetail(i.url)"><i class="fa fa-file-text-o"></i> 查看</div>
                        </a>
                    </li>
                    <li v-if="myList.length===0"><img src="/img/no_data.png"/></li>
                </ul>
                <el-pagination v-show="myList.length > 0"
                               background small
                               @current-change="handleCurrentChange_2"
                               :current-page.sync="page"
                               :page-size="limit"
                               layout="total, prev, pager, next"
                               :total="total">
                </el-pagination>
            </cardTemp>
        </div>
        <el-dialog :visible.sync="isShowLink" width="900px">
            <h3 slot="title" class="dialog_h3">流程跟踪详情</h3>
            <el-table :data="linkDetail" border stripe style="width: 100%;padding: 10px">
                <el-table-column prop="hjmc" label="处理环节"></el-table-column>
                <el-table-column prop="clr" label="处理人"></el-table-column>
                <el-table-column prop="bmmc" label="所在部门"></el-table-column>
                <el-table-column prop="cllx" label="处理类型"></el-table-column>
                <el-table-column prop="clyj" label="处理意见"></el-table-column>
                <el-table-column prop="xybclr" label="下一步处理人"></el-table-column>
                <el-table-column prop="clsj" label="处理时间" min-width="100"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Todo_create",
        data() {
            return {
                todoType:this.$school.todoType,
                myDone_select_contain: [],//来源备选项
                sourceValue: '',//来源
                title: '',//标题
                blStatus:[
                    {name:"全部",value:""},
                    {name:"草稿",value:"1"},
                    {name:"审批中",value:"2"},
                    {name:"已通过",value:"3"},
                    {name:"被驳回",value:"4"},],//办理状态
                blStatusValue:"",
                period: '',//查询时间段
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
                myList: [],//我发起的列表
                // appName:""
                isShowLink:false,//false-隐藏环节弹出框
                linkDetail:[]
            }
        },
        methods: {
            //清空
            clear() {
                this.sourceValue = '';
                this.title = '';
                this.period = '';
                this.page = 1;
                this.getMyList();
            },
            //我发起的-左侧条件
            getMySource() {
                this.$ajax.post(this.$url.get_myStarted_apps)
                    .then(res => {
                        this.myDone_select_contain = res.data.apps;
                    })
            },
            //我发起的-右侧明细
            getMyList() {
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
                this.$ajax.post(this.$url.query_myStarted, {
                    appId: this.sourceValue,
                    title: this.title,
                    startDate: startDate,
                    endDate: endDate,
                    page: this.page,
                    limit: this.limit,
                    stateno:this.blStatusValue
                })
                    .then(res => {
                        this.myList = res.data.data.rows;
                        this.page = res.data.data.page;
                        this.total = res.data.data.records;
                        this.limit = res.data.data.pageSize;
                    })
            },
            //打开已办详情
            openDoneDetail(url) {
                window.open(url);
            },
            //我发起的，分页
            handleCurrentChange_2(page) {
                this.page = page;
                this.getMyList();
            },
            //我发起的，点击当前环节弹出框
            showLink(taskid){
                this.$ajax.post(this.$url.query_mystarted_progress, {
                    taskid: taskid,
                })
                    .then(res => {
                        this.linkDetail = res.data.progressList;
                        this.isShowLink = true;
                    })
            },
            //点击将该条新闻标题展示在左侧条件区
            showTitle(title){
                this.title = title;
                this.getMyList();
            }
        },
        mounted() {
            this.getMyList();
            this.getMySource();
        }
    }
</script>

<!--待办为公用样式，统一在common-->