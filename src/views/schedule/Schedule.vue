<template>
    <div>
        <subhead>
            <div><i class="fa fa-calendar icon"></i>日程 <span>Schedule</span></div>
        </subhead>
        <calendar @click-event="handleClick" @db-click-event="addSchedule" @year-month-change="handleYearMonth" :event-type="eventType" :event-month="eventMonth" :today="today" ref="calendar">
            <div class="top-right" slot="top-right">
                <span @click="addSchedule"><i class="fa fa-calendar"></i>&nbsp;添加日程</span>
                <span @click="qrDialog"><i class="fa fa-mobile"></i>&nbsp;手机订阅</span>
                <span @click="subscribe"><i class="fa fa-plus-square-o"></i>&nbsp;订阅</span>
            </div>
            <div class="event-list" slot="event-list">
                <el-collapse v-model="activeNames" v-if="eventDayLength>0">
                    <el-collapse-item v-for="(i,index) in eventDay" v-if="i.events.length>0" :name="index">
                        <div class="title" slot="title" :style="'border-top-color:'+i.color">{{i.name}}</div>
                        <ul>
                            <li v-for="j in i.events" @click="seeSchedule(j.url,j.id)">
                                <div>
                                    {{j.dtstart}}
                                    <span v-if="!j.url" style="float: right;">
                                        <i class="fa fa-pencil" @click.stop="editFormData(j.id)"></i>&nbsp;&nbsp;
                                        <i class="fa fa-trash-o" @click.stop="delSchedule(j.id)"></i>
                                    </span>
                                </div>
                                <div>
                                    <i class="fa fa-bookmark-o fa-fw"></i>&nbsp;{{j.title}}
                                    <template v-if="j.location" style="margin-left: 5px;"><i class="fa fa-location-arrow"></i>&nbsp;{{j.location}}</template>
                                </div>
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
                <p v-else>暂无信息</p>
            </div>
        </calendar>
        <!--弹窗-->
        <el-dialog :visible="showSchedule" width="900px" @close="showSchedule=false">
            <h3 slot="title" class="dialog_h3">{{dialogName}}日程</h3>
            <div class="form_body">
                <el-form :model="formData" ref="formData" :rules="rules" :disabled="readOnly" label-position="right" label-width="150px">
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
                <template v-if="!readOnly"><button class="_theme _theme_border" @click="submitFormData">确定</button><button @click="showSchedule = false">取消</button></template>
                <button v-else @click="showSchedule= false">关闭</button>
            </div>
        </el-dialog>
        <!--手机二维码dialog-->
        <el-dialog :visible.sync="showQR" width="900px">
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
                <button @click="showQR= false">关闭</button>
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
        activeNames: [],
        eventType: [],//事件类型
        eventDay:[],//日事件
        eventDayLength:0,//日事件件数
        eventMonth:[],//月事件
        today:{},//今天
        choose:{},//选中天

        showQR:false,//是否显示手机订阅
        showSchedule: false,//是否显示日程框
        readOnly: true,//是否只读
        dialogName:'',//弹框名字

        timeRange:[2],//时间范围
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
        // showNoData:true//右侧如果没数据
      }
    },
    watch:{
      timeRange(value){
        this.formData.timeRange=value;
      },
      showSchedule(value){
        if(!value){
          this.$refs['formData'].resetFields();
        }
      }
    },
    created() {
      this.$ajax.post(this.$url.scheduleEventType)
          .then(res => {
            this.eventType = res.data.cals;
          })
          .then(()=>{
            for(let i=0;i< this.eventType.length;i++){
              this.activeNames.push(i);
            }
          });//事件类型
      this.today=this.getDate(new Date());
      //设置默认范围时间
      this.timeRange=[new Date(this.today.year,this.today.month-1,this.today.day,8,0),new Date(this.today.year,this.today.month-1,this.today.day,9,0)];
      this.getEventDay(this.today);//日事件
      this.getEventMonth(this.today);//月事件
    },
    methods: {
      //监听点击日事件
      handleClick(date){
        if (this.choose.day=== date.day) {//防止连重复选中一天
          return;
        }
        //设置默认范围时间
        this.timeRange=[new Date(date.year,date.month-1,date.day,8,0),new Date(date.year,date.month-1,date.day,9,0)];
        this.choose=date;
        this.getEventDay(date);
      },
      //监听年月改变
      handleYearMonth(date){
        this.getEventMonth(date);
      },
      //从date（一个Date对象）获取年月日
      getDate (date) {
        return {
          year: date.getFullYear(),
          month: date.getMonth()+1,
          day: date.getDate()
        }
      },
      //获取事件类型
      getEventType() {

      },
      //获取日事件
      getEventDay(date){
        this.$ajax.post(this.$url.scheduleEventDay,date)
            .then(res => {
              this.eventDay = res.data.calObjs;
              this.eventDayLength=0;
              for(let i in this.eventDay){
                this.eventDayLength+=this.eventDay[i].events.length;
              }
            })
      },
      //获取月事件
      getEventMonth(date){
        this.$ajax.post(this.$url.scheduleEventMonth,date)
            .then(res => {
              this.eventMonth=res.data.days;
            })
      },
      //点击添加日程
      addSchedule() {
        this.clear();
        this.readOnly=false;//非只读
        this.showSchedule = true;
        this.openModalFlag = 1;
        this.dialogName='添加';
      },
      //编辑日程
      editFormData(id) {
        this.getFormData(id);//获取表单数据
        this.readOnly=false;//添加非只读
        this.showSchedule = true;
        this.openModalFlag = 2;
        this.dialogName='编辑';
      },
      //提交个人日程表单
      submitFormData() {// 1-新增 2-编辑
        this.$refs['formData'].validate((valid)=>{//rules校验
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
                    this.$notify.success('操作成功');
                    //添加成功后，刷新数据
                    this.showSchedule = false;
                    this.getEventDay(this.choose);
                    this.getEventMonth(this.choose);
                  }
                  else this.$notify.warning(res.data.errmsg)
                });
          }
          else return false;
        });
      },
      //查看日程
      seeSchedule(url, id) {
        if (url) {//有url则直接跳转
          window.open(url);
        } else {//没有url则打开模态框查看该日程,只读,获取该日程信息，渲染到视图层
          this.getFormData(id);//获取表单数据
          this.readOnly=true;//添加只读
          this.showSchedule = true;
          this.dialogName='查看';
        }
      },
      //根据id获取弹框表单数据
      getFormData(id) {
        this.$ajax.post(this.$url.get_private_event, {id: id})
            .then(res => {
              this.formData=res.data.event;
              this.timeRange=[res.data.event.start,res.data.event.end];
            })
      },
      //删除日程
      delSchedule(id) {
        this.$confirm('确定删除该日程吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$ajax.post(this.$url.remove_private_events, {id: id})
              .then(res => {
                if (res.data.errcode === '0') {
                  //删除成功后，刷新数据
                  this.getEventDay(this.choose);
                  this.getEventMonth(this.choose);
                  this.$notify.success(res.data.errmsg);
                }
                else this.$notify.warning(res.data.errmsg);
              })
        }).catch(()=>{});
      },
      //订阅
      subscribe(){
        this.$router.push({ path: '/schedule/MySub' })
      },
      //二维码
      qrDialog(){
        this.showQR = true;
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

  }
</script>

<style scoped lang="scss">
    .top-right{
        font-size: 14px;
        font-weight: 500;
        color: #000;
        span{
            cursor: pointer;
            i{
                color: #959595;
                margin: 0 5px 0 20px;
            }
        }
    }
    .event-list{
        .el-collapse{
            border-top: none;
        }
        .el-collapse-item__content{
            padding-bottom: 0!important;
        }
        .title{
            border-top: 3px solid;
            margin-top: 20px;
        }
        ul{
            li{
                margin-bottom: 10px;
                cursor: pointer;
            }
        }
    }
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