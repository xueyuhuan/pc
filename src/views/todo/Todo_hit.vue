<template>
    <div>
        <subhead>
            <div><i class="fa fa-tv"></i>&nbsp;&nbsp;&nbsp;办事中心 <span>Todo List</span></div>
        </subhead>
        <div class="contain">
            <!--<CardTemp class="head">-->
                <!--<span class="head_btn" :class="{btn_choosen:flag === 0}" @click="chooseType(0)">我的待办</span>-->
                <!--<span class="head_btn" :class="{btn_choosen:flag === 1}" @click="chooseType(1)">我的已办</span>-->
                <!--<span class="head_btn" :class="{btn_choosen:flag === 2}" @click="chooseType(2)">我发起的</span>-->
            <!--</CardTemp>-->

            <!--&lt;!&ndash;我的待办&ndash;&gt;-->
            <!--<div v-show="flag === 0" class="content">-->
                <!--<div class="content_left">-->
                    <!--<ul>-->
                        <!--<li class="title">待办来源</li>-->
                        <!--<li :class="{todoSourceActive:todoSourceId === ''}"-->
                             <!--@click="switchTodoSource('')"><i class="fa fa-bell-o"></i>全部-->
                        <!--</li>-->
                        <!--<li :class="{todoSourceActive:todoSourceId === item.id}"-->
                             <!--v-for="item in todomenu" @click="switchTodoSource(item.id)"><i class="fa fa-bell-o"></i>{{item.name}}-->
                            <!--<span>（{{item.todoList.length}}）</span>-->
                        <!--</li>-->
                    <!--</ul>-->
                    <!--&lt;!&ndash;<card>&ndash;&gt;-->
                        <!--&lt;!&ndash;<template slot="header">通知公告</template>&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="menuDiv" :class="{todoSourceActive:todoSourceId === ''}"&ndash;&gt;-->
                             <!--&lt;!&ndash;@click="switchTodoSource('')">全部&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="menuDiv" :class="{todoSourceActive:todoSourceId === item.id}"&ndash;&gt;-->
                             <!--&lt;!&ndash;v-for="item in todomenu" @click="switchTodoSource(item.id)">&ndash;&gt;-->
                            <!--&lt;!&ndash;{{item.name}}&ndash;&gt;-->
                            <!--&lt;!&ndash;<span>（{{item.todoList.length}}）</span>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</card>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="content_right">-->
                    <!--<ul></ul>-->
                    <!--<card>-->
                        <!--<template slot="header">待办明细</template>-->
                        <!--<div v-for="item in todomenu">-->
                            <!--<div v-for="i in item.todoList" @click="openTodo(i.url,i.appName)" class="block"-->
                                 <!--v-if="i.appId=== todoSourceId|| todoSourceId ===''">-->
                                <!--<div class="blockLeft">-->
                                    <!--<div class="title">[{{i.appName}}]{{i.title}}</div>-->
                                    <!--<div class="time">{{i.currentTime}}</div>-->
                                <!--</div>-->
                                <!--<div class="blockRight"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;办理</div>-->
                            <!--</div>-->
                            <!--<div style="text-align: center">-->
                                <!--<img v-if="item.todoList.length === 0 && todoSourceId === item.id"-->
                                     <!--src="/img/no_data.png"/>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div style="text-align: center">-->
                            <!--<img v-if="allLength === 0 && todoSourceId === ''"-->
                                 <!--src="/img/no_data.png"/>-->
                        <!--</div>-->
                    <!--</card>-->
                <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;我的已办&ndash;&gt;-->
            <!--<div v-show="flag === 1" class="content">-->
                <!--<div class="content_left">-->
                    <!--<card>-->
                        <!--<template slot="header">条件过滤</template>-->
                        <!--<div class="menuDiv_input">-->
                            <!--<el-form label-position="right" label-width="80px">-->
                                <!--<el-form-item label="来源:">-->
                                    <!--<el-select v-model="sourceValue" clearable filterable placeholder="请选择来源"-->
                                               <!--style="width:266px;">-->
                                        <!--<el-option v-for="item in myDone_select_contain" :label="item.name"-->
                                                   <!--:value="item.id" :key="item.value">{{item.name}}-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="标题:">-->
                                    <!--<el-input v-model="title"></el-input>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="办理时间:">-->
                                    <!--<el-date-picker-->
                                            <!--class="dateInput"-->
                                            <!--v-model="period"-->
                                            <!--type="daterange"-->
                                            <!--align="right"-->
                                            <!--unlink-panels-->
                                            <!--range-separator="-"-->
                                            <!--start-placeholder="开始日期"-->
                                            <!--end-placeholder="结束日期"-->
                                            <!--:picker-options="pickerOptions2">-->
                                    <!--</el-date-picker>-->
                                <!--</el-form-item>-->
                                <!--<el-row style="text-align: center;">-->
                                    <!--<el-button @click="clear">清空</el-button>-->
                                    <!--<el-button type="primary" style="background-color: #1295d8;" @click="getDoneList">查询</el-button>-->
                                <!--</el-row>-->

                            <!--</el-form>-->
                        <!--</div>-->
                    <!--</card>-->
                <!--</div>-->
                <!--<div class="content_right">-->
                    <!--<card>-->
                        <!--<template slot="header">明细</template>-->
                        <!--<div v-for="item in doneList" @click="" class="block">-->
                            <!--<div class="blockLeft">-->
                                <!--<div class="title"> <span>【{{item.appname}}】</span>{{item.title}} </div>-->
                                <!--<div class="time">-->
                                    <!--<span>发起人：{{item.startdept}}{{item.startuser}}</span>-->
                                    <!--<span>发起时间：{{item.createtime.substring(0,16)}}</span>-->
                                    <!--<span>我的办理时间：{{item.opertime.substring(0,16)}}</span>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div @click="openDoneDetail(item.url)" class="blockRight"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;查看</div>-->
                        <!--</div>-->
                        <!--<div v-if="doneList.length > 0" style="text-align: center;padding: 10px 23px;">-->
                            <!--<el-pagination-->
                                    <!--background-->
                                    <!--@current-change="handleCurrentChange_1"-->
                                    <!--:current-page.sync="page"-->
                                    <!--:page-size="limit"-->
                                    <!--layout="prev, pager, next"-->
                                    <!--:total="total">-->
                            <!--</el-pagination>-->
                        <!--</div>-->
                    <!--</card>-->
                    <!--<div style="text-align: center">-->
                        <!--<img v-if="doneList.length === 0"-->
                             <!--src="/img/no_data.png"/>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;我发起的&ndash;&gt;-->
            <!--<div v-show="flag === 2" class="content">-->
                <!--<div class="content_left">-->
                    <!--<card>-->
                        <!--<template slot="header">条件过滤</template>-->
                        <!--<div class="menuDiv_input">-->
                            <!--<el-form label-position="right" label-width="80px">-->
                                <!--<el-form-item label="来源:">-->
                                    <!--<el-select v-model="sourceValue" clearable filterable placeholder="请选择来源"-->
                                               <!--style="width:266px;">-->
                                        <!--<el-option v-for="item in myDone_select_contain" :label="item.name"-->
                                                   <!--:value="item.id" :key="item.value">{{item.name}}-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="标题:">-->
                                    <!--<el-input v-model="title"></el-input>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="办理时间:">-->
                                    <!--<el-date-picker-->
                                            <!--class="dateInput"-->
                                            <!--v-model="period"-->
                                            <!--type="daterange"-->
                                            <!--align="right"-->
                                            <!--unlink-panels-->
                                            <!--range-separator="-"-->
                                            <!--start-placeholder="开始日期"-->
                                            <!--end-placeholder="结束日期"-->
                                            <!--:picker-options="pickerOptions2">-->
                                    <!--</el-date-picker>-->
                                <!--</el-form-item>-->
                                <!--<el-row style="text-align: center;">-->
                                    <!--<el-button @click="clear">清空</el-button>-->
                                    <!--<el-button type="primary" style="background-color: #1295d8;"  @click="getMyList">查询</el-button>-->
                                <!--</el-row>-->
                            <!--</el-form>-->
                        <!--</div>-->
                    <!--</card>-->
                <!--</div>-->
                <!--<div class="content_right">-->
                    <!--<card>-->
                        <!--<template slot="header">明细</template>-->
                        <!--<div v-for="item in myList" @click="" class="block">-->
                            <!--<div class="blockLeft">-->
                                <!--<div class="title"> <span>【{{item.appname}}】</span>{{item.title}} </div>-->
                                <!--<div class="time">-->
                                    <!--<span>发起时间：{{item.createtime}}</span>-->
                                    <!--<span>当前环节：{{item.currentnode}}</span>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div @click="openDoneDetail(item.url)" class="blockRight"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;查看</div>-->
                        <!--</div>-->
                        <!--<div v-if="myList.length > 0" style="text-align: center;padding: 10px 23px;">-->
                            <!--<el-pagination-->
                                    <!--background-->
                                    <!--@current-change="handleCurrentChange_2"-->
                                    <!--:current-page.sync="page"-->
                                    <!--:page-size="limit"-->
                                    <!--layout="prev, pager, next"-->
                                    <!--:total="total">-->
                            <!--</el-pagination>-->
                        <!--</div>-->
                    <!--</card>-->
                    <!--<div style="text-align: center">-->
                        <!--<img v-if="myList.length === 0"-->
                             <!--src="/img/no_data.png"/>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <CardTemp class="head">
                <router-link class="head_btn" to="/todo/hit_todo">我的待办</router-link>
                <router-link class="head_btn" to="/todo/hit_done">我的已办</router-link>
                <router-link class="head_btn" to="/todo/hit_create">我发起的</router-link>
            </CardTemp>
            <router-view></router-view>
        </div>
        <!--我的待办弹出框-->
        <!--<el-dialog title=""-->
                   <!--:visible.sync="dialogVisible"-->
                   <!--width="898px"-->
                   <!--left>-->
            <!--<div slot="title"><h3 class="dialog_h3">跳转至{{appName}}</h3></div>-->
            <!--<div class="dialog_content">-->

                <!--<div>-->
                    <!--<div class="content_title">即将进入{{appName}}的待办,请在新打开的窗口内继续完成的发起工作。</div>-->
                    <!--<div class="content_desc">若办理页面不能自动弹出，请修改浏览器配置</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" @click="dialogVisible = false">确定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
        <Jump></Jump>
    </div>
</template>

<script>
  import Jump from "./Jump";
  export default {
    name: "Todo_hit",
    components: {Jump},
    data() {
      return {
        flag: 0,//0-我的待办，1-我的已办，2-我发起的
        todomenu: [],
        allLength:0,//我的待办所有类的待办事项
        todoSourceId: "",//我的待办来源，每个分类的ID
        dialogVisible: false,
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
        page:1,//我发起的-当前页码
        total:0,//数据总条数
        limit:10,//一页的数据条数
        myList:[],//我发起的列表
          // appName:""
      }
    },
    created() {
      this.getTodoSource();
    },
    methods: {
      //选择待办类型
      chooseType(flag) {
        this.flag = flag;
        this.clear();
        if(flag === 1){//我的已办，刷新左侧条件和右侧明细
          this.get_myDone_apps();
          this.getDoneList();
        }
        if(flag === 2){//我发起的，刷新
          this.getMySource();
          this.getMyList();
        }
      },
      //待办来源
      getTodoSource() {
        this.$ajax.post(this.$url.getTodoResource)
            .then(res => {
              this.todomenu = res.data.apps;
              let allLength = 0;
              for(let i=0;i<this.todomenu.length;i++){
                allLength += this.todomenu[i].todoList.length;
              }
              this.allLength = allLength;
            })
      },
      //切换待办来源
      switchTodoSource(id) {
        console.log(id);
        this.todoSourceId = id;
      },
      //打开跳转弹窗
      openTodo(url,appName) {
        this.$store.commit('set_data',{
          data:true,
          name:'jumpShow'
        });
        this.$store.commit('set_data',{
          data:appName,
          name:'jumpName'
        });
        // this.dialogVisible = true;
        // this.appName = appName;
        window.open(url);
      },
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
        if(this.period && this.period.length === 2 && this.period[0] !== '' && this.period[1] !== '' ){
          date1 = new Date(this.period[0]);
          date2 = new Date(this.period[1]);
          startDate = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
          endDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
          console.log(startDate);
          console.log(endDate);
        }
        this.$ajax.post(this.$url.query_done,{appId:this.sourceValue, title:this.title, startDate:startDate, endDate:endDate, page:this.page, limit:this.limit})
            .then(res => {
              console.log(res.data);
              this.doneList = res.data.data.rows;
              this.page = res.data.data.page;
              this.total = res.data.data.records;
              this.limit = res.data.data.pageSize;
            })
      },
      //打开已办详情
      openDoneDetail(url){
        window.open(url);
      },
      //清空
      clear(){
        this.sourceValue = '';
        this.title = '';
        this.period = '';
        this.page = 1;
      },
      //我发起的-左侧条件
      getMySource(){
        this.$ajax.post(this.$url.get_myStarted_apps)
            .then(res => {
              this.myDone_select_contain = res.data.apps;
            })
      },
      //我发起的-右侧明细
      getMyList() {
        console.log(this.period);
        let date1;
        let date2;
        let startDate = '';
        let endDate = '';
        if(this.period && this.period.length === 2 && this.period[0] !== '' && this.period[1] !== '' ){
          date1 = new Date(this.period[0]);
          date2 = new Date(this.period[1]);
          startDate = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
          endDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
          console.log(startDate);
          console.log(endDate);
        }
        this.$ajax.post(this.$url.query_myStarted,{appId:this.sourceValue, title:this.title, startDate:startDate, endDate:endDate, page:this.page, limit:this.limit})
            .then(res => {
              console.log(res.data);
              this.myList = res.data.data.rows;
              this.page = res.data.data.page;
              this.total = res.data.data.records;
              this.limit = res.data.data.pageSize;
            })
      },
      //我的已办,分页
      handleCurrentChange_1(page){
        this.page = page;
        this.getDoneList();
      },
      //我发起的，分页
      handleCurrentChange_2(page){
        this.page = page;
        this.getMyList();
      }
    },

  }
</script>

<style scoped lang="scss">
    .router-link-active{
        background: #F08625 !important;
    }
    .contain {
        width: 1200px;
        margin: 0 auto;
        .head{
            padding: 10px 28px;
            margin-bottom: 10px;
            .head_btn{
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
                ul{
                    li{
                        &.title{
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
                        &:last-child{
                            border: none;
                        }
                        i{
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
                        span{
                            color: #0683c3;
                        }
                    }
                    .time {
                        font-size: 12px;
                        margin-top: 5px;
                        color: #a0a0a0;
                        span{
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