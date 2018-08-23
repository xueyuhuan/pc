<template>
    <div>
        <subhead>
            <div><i class="fa fa-calendar icon"></i>日程 <span>Schedule</span></div>
        </subhead>
        <div class="content">
            <card>
                <template slot="header">
                    <div style="width: 758px;">
                        <div class="head_left">
                            <i class="fa fa-chevron-left" @click="prevMonth"></i>
                            <span>{{year}}年{{month}}月</span>
                            <i class="fa fa-chevron-right" @click="nextMonth"></i>
                        </div>
                        <div class="head_mid">
                            <div class="eventType" v-for="item in eventType">
                                <span :style="`background-color:${item.color};`"></span>&nbsp;{{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="head_right">
                        <span @click="addSchedule"><i class="fa fa-calendar"></i>&nbsp;添加日程</span>
                        <span @click="qrDialog"><i class="fa fa-mobile"></i>&nbsp;手机订阅</span>
                        <span @click="subscribe"><i class="fa fa-plus-square-o"></i>&nbsp;订阅</span>
                    </div>
                </template>
                <div class="body">
                    <div class="body_left">
                        <table border="1" cellpadding="0" cellspacing="0" bordercolor="#e4e4e4">
                            <tr>
                                <th style="color: #959595;"> 周日</th>
                                <th>周一</th>
                                <th>周二</th>
                                <th>周三</th>
                                <th>周四</th>
                                <th>周五</th>
                                <th style="color: #959595;">周六</th>
                            </tr>
                            <tr v-for="item in calendars.days">
                                <td v-for="i in item"
                                    @dblclick="addSchedule"
                                    @click="chooseDay(i)"
                                    :class="{today : calendars.year === current_year && calendars.month === current_month && i.day === current_day , chooseDay : i.day === day}">
                                    <div v-if="i.day !== 0" class="num">{{i.day}}</div>
                                    <div class="dot"><span :style="'background-color:' + b.color + ';'"
                                                           v-for="b in i.objList"></span></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="body_right">
                        <div v-for="(item,index) in date_events" v-if="item.events.length > 0"
                             :style="'border-top: 3px solid' + item.color + ';'" class="board">
                            <div class="board_head">
                                <span>{{item.name}}</span>
                                <i @click="toggleIndex(index)"
                                   :class="{'fa fa-chevron-up':toggle_index === index || toggle_index === -1,'fa fa-chevron-down' : toggle_index !== index && toggle_index !== -1}"></i>
                            </div>
                            <div v-show="toggle_index === index || toggle_index === -1" v-for="i in item.events"
                                 class="board_body">
                                <div @click="seeSchedule(i.url,i.id)" class="board_body_block">
                                    <div class="block_time">{{i.dtstart}}
                                        <span v-if="!i.url" style="float: right;">
                                            <i class="fa fa-pencil" @click.stop="editFormData(i.id)"></i>&nbsp;&nbsp;
                                            <i class="fa fa-trash-o" @click.stop="showDeleteDialog(i.id)"></i>
                                        </span>
                                    </div>
                                    <div class="block_content">
                                        <i class="fa fa-bookmark-o fa-fw"></i>&nbsp;{{i.title}}
                                        <span v-if="i.location" style="margin-left: 5px;">
                                            <i class="fa fa-location-arrow"></i>&nbsp;{{i.location}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="noData" v-show="item.events.length === 0">暂无信息</div>
                        </div>
                        <div v-if="showNoData" style="color: #000;font-size: 14px;">暂无数据</div>
                    </div>
                </div>
            </card>
        </div>
        <!--弹窗-->
        <el-dialog :visible="personalSchedule" width="900px" @close="personalSchedule=false">
            <h3 slot="title" class="dialog_h3">{{dialogName}}日程</h3>
            <div class="form_body">
                <el-form :model="formData" ref="formData" :rules="rules" :disabled="formDisabled_readOnly" label-position="right" label-width="150px">
                    <el-form-item label="日程主题" prop="title">
                        <el-input v-model="formData.title"></el-input>
                    </el-form-item>
                    <el-form-item label="时间" prop="timeRange">
                        <el-date-picker
                                v-model="timeRange"
                                type="datetimerange"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="地点">
                        <el-input v-model="formData.location"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="5" v-model="formData.info"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog_footer">
                <template v-if="!formDisabled_readOnly"><button class="_theme _theme_border" @click="submitFormData">确定</button><button @click="personalSchedule = false">取消</button></template>
                <button v-else @click="personalSchedule= false">关闭</button>
            </div>
        </el-dialog>
        <!--手机二维码dialog-->
        <el-dialog :visible.sync="qrDialogShow" width="900px">
            <h3 slot="title" class="dialog_h3">订阅日程</h3>
            <div style="padding:30px 0 0 15px"><i class="fa fa-info-circle"></i> 通过订阅功能，在手机、平板电脑或者其他日历软件中查看日程</div>
            <div class="qr_div">
                <div>
                    <h2 style="text-align: center;font-size: 18px;font-weight: 700;">在 iPad 和 iPhone 上订阅</h2>
                    <div style="text-align: center"><img :src="qrUrl" /></div>
                </div>
                <div>
                    <h2 style="text-align: center;font-size: 18px;font-weight: 700;">在其他日程管理软件中订阅</h2>
                    <div style="font-size: 18px;padding: 20px;text-align: center"><a :href="string" target="_blank">订阅</a></div>
                </div>
            </div>
            <div slot="footer" class="dialog_footer">
                <button @click="qrDialogShow= false">关闭</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import QRCode from 'qrcode';
  import date from '../../utils/date';
  import Calendar from "../../components/Calendar";
  export default {
    name: "Schedule",
    components: {Calendar},
    data() {
      return {
        eventType: [],
        year: "",//左上角显示的年月，传参拿日程数据
        month: "",
        choose_year:"",//选中的年月日
        choose_month:"",
        day: "",
        current_year: "",
        current_month: "",
        current_day: "",//今天
        calendars: [],//日历
        date_events: [],//右侧显示的某天的日程和事件
        toggle_index: -1,//右侧栏目index，初始化为-1，
        personalSchedule: false,//个人日程模态框是否显示
        dialogName:'',//弹框名字
        // personalSchedule_readOnly: false,//只读的弹出框是否显示
        // deleteSchedule_show:false,//删除日程模态框是否显示
        qrDialogShow:false,//手机订阅
        deleteSchedule_id:"",//待删除的日程的id
        timeRange:[],//时间范围
        formData: {//添加日程表单
          className: "bg-success bg",
          type: "private",
          notify: false,
          timeRange:[],//时间范围
          start: "",
          end: "",
          title: "",
          location: "",
          info: "",
          id: ""
        },
        openModalFlag: 1,//打开日程模态框标识符，提交表单时用于区分是新增还是修改， 默认为新增 1-新增日程,2-修改日程
        buttonText: "",//表单里面的文字
        formDisabled_readOnly: true,//只读表单
        rules: {
          title: [
            {required: true, message: '请输入日程主题', trigger: 'blur'}
          ],
          timeRange:[
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
        },
        string:"",//二维码连接
        qrUrl:"",//二维码图片的src
        showNoData:true//右侧如果没数据
      }
    },
    watch:{
      timeRange(value){
        this.formData.timeRange=value;
      },
      personalSchedule(value){
        if(!value){
          this.$refs['formData'].resetFields();
        }
      }
    },
    methods: {
      //获取事件类型
      getEventType() {
        this.$ajax.post(this.$url.getCalendarObjs)
            .then(res => {
              this.eventType = res.data.cals;
            })
      },
      //初始化年月日
      initDate() {
        let date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.current_year = date.getFullYear();
        this.current_month = date.getMonth() + 1;
        this.current_day = date.getDate();
        //直接点击添加日程时设置时间为当前8-9点
        this.timeRange=[new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0), new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0)];
      },
      //获取日历信息
      getCalendar() {
        this.$ajax.post(this.$url.getCalendar, {year: this.year, month: this.month})
            .then(res => {
              this.calendars = res.data;
            })
      },
      //下个月
      nextMonth() {
        if (this.month === 12) {
          this.month = 1;
          this.year = this.year + 1;
        } else {
          this.month = this.month + 1;
        }
        this.day = "";
        this.getCalendar();
      },
      //上个月
      prevMonth() {
        if (this.month === 1) {
          this.month = 12;
          this.year = this.year - 1;
        } else {
          this.month = this.month - 1;
        }
        //置空
        this.day = "";
        this.toggle_index = -1;
        this.getCalendar();
      },
      //获取某天的日程数据，展示在右侧
      getDayEvent() {
        this.$ajax.post(this.$url.getEvents, {year: this.year, month: this.month, day: this.day})
            .then(res => {
              this.date_events = res.data.calObjs;
              let totalEvents = 0;
              for(let i=0;i<this.date_events.length;i++){
                totalEvents += this.date_events[i].events.length;
              }
              this.showNoData = totalEvents === 0;
            })
      },
      //选择某天,并且更新该天日程数据
      chooseDay(i) {
        if (i.day === 0) {//点击空白部分
          return;
        }
        if (this.day === i.day) {//防止连重复选中一天
          return;
        }
        //设置弹出框时间范围
        this.timeRange=[new Date(i.year, i.month-1, i.day, 8, 0), new Date(i.year, i.month-1, i.day, 9, 0)];
        //存储选中的日期
        this.day = i.day;
        this.toggle_index = -1;
        this.getDayEvent();
      },
      //点击添加日程
      addSchedule() {
        this.clear();
        this.formDisabled_readOnly=false;//添加非只读
        this.personalSchedule = true;
        this.openModalFlag = 1;
        this.dialogName='添加';
      },
      //提交个人日程表单
      submitFormData() {// 1-新增 2-编辑
        this.$refs['formData'].validate((valid)=>{
          if(valid){
            if(this.formData.timeRange[0].constructor.name==='Date'){
              this.formData.start=date.dateFormat("yyyy-MM-dd hh:mm",this.formData.timeRange[0]);
              this.formData.end=date.dateFormat("yyyy-MM-dd hh:mm",this.formData.timeRange[1])
            }
            else {
              this.formData.start=this.formData.timeRange[0];
              this.formData.end=this.formData.timeRange[1];
            }
            this.$ajax.post(this.openModalFlag===1?this.$url.add_private_event:this.$url.edit_private_event, this.formData)
                .then(res => {
                  if (res.data.errcode === '0') {
                    this.$notify.success('添加成功');
                    //添加成功后，刷新数据
                    this.personalSchedule = false;
                    this.getDayEvent();
                    this.getCalendar();
                    this.clear();
                  }
                  else this.$notify.warning(res.data.errmsg)
                });
          }
          else return false;
        });
      },
      //编辑日程
      editFormData(id) {
        this.getFormData(id);//获取表单数据
        this.formDisabled_readOnly=false;//添加非只读
        this.personalSchedule = true;
        this.openModalFlag = 2;
        this.dialogName='编辑';
      },
      //查看日程
      seeSchedule(url, id) {
        if (url) {//有url则直接跳转
          window.open(url);
        } else {//没有url则打开模态框查看该日程,只读,获取该日程信息，渲染到视图层
          this.getFormData(id);//获取表单数据
          this.formDisabled_readOnly=true;//添加只读
          this.personalSchedule = true;
          this.dialogName='查看';
        }
      },
      //获取该日程已有数据，渲染到表单视图层
      getFormData(id) {
        this.$ajax.post(this.$url.get_private_event, {id: id})
            .then(res => {
              this.formData=res.data.event;
              this.timeRange=[res.data.event.start,res.data.event.end];
            })
      },
      //切换展示的事件
      toggleIndex(index) {
        if (this.toggle_index === index || this.toggle_index === -1) {
          this.toggle_index = ""
        } else {
          this.toggle_index = index;
        }
      },
      //弹出提示是否删除该日程
      showDeleteDialog(id){
        this.$confirm('确定删除该日程吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.deleteSchedule_id = id;
          this.deleteSchedule();
        }).catch(()=>{});
      },
      //删除日程
      deleteSchedule() {
        this.$ajax.post(this.$url.remove_private_events, {id: this.deleteSchedule_id})
            .then(res => {
              if (res.data.errcode === '0') {
                //删除成功后，刷新数据
                this.getDayEvent();
                this.getCalendar();
                this.$notify.success(res.data.errmsg);
              }
              else this.$notify.warning(res.data.errmsg);
            })
      },
      //订阅
      subscribe(){
        this.$router.push({ path: '/schedule/MySub' })
      },
      //二维码
      qrDialog(){
        this.qrDialogShow = true;
        this.$ajax.post(this.$url.subscription_private)
            .then(res => {
              if(res.data.errcode === '0'){
                this.string = res.data.subscriptionPath;
                QRCode.toDataURL(this.string)
                    .then(url => {
                      this.qrUrl = url;
                    })
              }

            })
      },
      //表单提交成功后，需要清除表单的数据
      clear(){
        this.formData.title = "";
        this.formData.start = "";
        this.formData.end = "";
        this.formData.info = "";
        this.formData.location = "";
        this.formData.id = "";
      }
    },
    created() {
      this.getEventType();
      this.initDate();
      this.getCalendar();
      this.getDayEvent();
    }
  }
</script>

<style scoped lang="scss">
    .content {
        padding: 0 0 15px 0;
        margin: auto;
        width: 1200px;
    }

    .head_left {
        i {
            cursor: pointer;
        }
        span {
            display: inline-block;
            width: 120px;
            text-align: center;
        }
    }

    .head_mid {
        @include flex(flex-start, center);
        flex-direction: row-reverse;
        flex-wrap: wrap;
        .eventType {
            margin-left: 10px;
            color: #101010;
            font-size: 14px;
            font-weight: normal;
            span {
                display: inline-block;
                margin-left: 5px;
                width: 10px;
                height: 10px;
                border-radius: 30px;
                cursor: pointer;
            }
        }
    }

    .head_right {
        font-weight: normal;
        span {
            display: inline-block;
            margin-left: 20px;
            cursor: pointer;
            font-size: 14px;
            line-height: 24px;
            color: #000;
        }
        i {
            color: #959595;
        }
    }

    .body {
        padding: 10px 23px;
        @include flex(space-between, flex-start);
        .body_left {
            width: 758px;
            table {
                width: 100%;
                border-collapse: collapse;
                th {
                    padding: 10px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: normal;
                    background-color: #eee;
                    cursor: pointer;
                }
                td {
                    height: 108px;
                    padding: 10px;
                    position: relative;
                    cursor: pointer;
                    .num {
                        text-align: left;
                        position: absolute;
                        top: 10px;
                        left: 10px;
                    }
                    .dot {
                        position: absolute;
                        right: 10px;
                        bottom: 10px;
                        span {
                            display: inline-block;
                            margin-left: 5px;
                            width: 12px;
                            height: 12px;
                            border-radius: 30px;
                            cursor: pointer;
                        }

                    }
                }
                .today {
                    background-color: #eee !important;
                }
                .chooseDay {
                    background-color: #bfbfbf;
                }
            }
        }
        .body_right {
            width: 369px;
            .board {
                width: 100%;
                background-color: #eee;
                margin-bottom: 20px;
                font-size: 14px;
                .board_head {
                    padding: 10px 18px;
                    @include flex(space-between, center);
                    i {
                        cursor: pointer;
                    }
                }
                .board_body {
                    .board_body_block {
                        cursor: pointer;
                        padding: 12px 18px;
                        border-top: 1px dashed #fff;
                        .block_time {
                            color: #959595;
                            i{
                                color: #067EBE;
                            }
                        }
                        .block_content {
                            i {
                                color: #067EBE;
                            }
                        }
                    }
                }
                .noData {
                    padding: 12px 18px;
                    border-top: 1px dashed #fff;
                }
            }
        }
    }

    .form_body {
        width: 800px;
        margin: 0 auto;
        padding: 30px 100px 0 0;
    }
    .qr_div{
        @include flex(flex-start,flex-start);
        &>div{
            width: 50%;
        }
    }
</style>