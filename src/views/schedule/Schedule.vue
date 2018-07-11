<template>
    <div>
        <subhead>
            <div><i class="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;日程 <span>Schedule</span></div>
        </subhead>
        <div class="content">
            <card>
                <header slot="header">
                    <div class="head_left">
                        <i class="fa fa-chevron-left" @click="prevMonth"></i>
                        <span>{{year}}年{{month}}月</span>
                        <i class="fa fa-chevron-right" @click="nextMonth"></i>
                    </div>
                    <div class="head_mid">
                        <div class="eventType" v-for="item in eventType">
                            <span :style="'background-color:' + item.color + ';'"></span>&nbsp;{{item.name}}
                        </div>
                    </div>
                    <div class="head_right">
                        <span><i class="fa fa-calendar"></i>&nbsp;添加日程</span>
                        <span><i class="fa fa-mobile"></i>&nbsp;手机订阅</span>
                        <span><i class="fa fa-plus-square-o"></i>&nbsp;订阅</span>
                    </div>
                </header>
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
                                    @click="chooseDay(i.day)"
                                    :class="{today : calendars.year === current_year && calendars.month === current_month && i.day === current_day , chooseDay : i.day === day}">
                                    <div v-if="i.day !== 0" class="num">{{i.day}}</div>
                                    <div class="dot"><span :style="'background-color:' + b.color + ';'" v-for="b in i.objList"></span></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="body_right">
                        <div v-for="item in date_events" :style="'border-top: 3px solid' + item.color + ';'" class="board">
                            <div class="board_head">
                                <span>{{item.name}}</span>
                                <i class="fa fa-chevron-up"></i>
                            </div>
                            <div v-for="i in item.events" class="board_body">
                                <div v-for="e in i" class="board_body_block">
                                    <div class="block_time">{{e.dtstart}}</div>
                                    <div class="block_content"><i class="fa fa-bookmark-o fa-fw"></i>&nbsp;{{e.title}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </card>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Schedule",
        data(){
            return{
                eventType:[],
                year:"",//显示的年月日，传参拿日程数据
                month:"",
                day:"",
                current_year:"",
                current_month:"",
                current_day:"",//今天
                calendars:[],//日历
                date_events:[]//右侧显示的某天的日程和事件
            }

        },
        methods:{
            //获取事件类型
            getEventType(){
                this.$ajax.post(this.$url.getCalendarObjs)
                    .then(res => {
                        this.eventType = res.data.cals;
                    })
            },
            //初始化年月日
            initDate(){
                let date = new Date();
                this.year = date.getFullYear();
                this.month = date.getMonth() + 1;
                this.day = date.getDate();
                this.current_year = date.getFullYear();
                this.current_month = date.getMonth() + 1;
                this.current_day = date.getDate();
            },
            //获取日历信息
            getCalendar(){
                this.$ajax.post(this.$url.getCalendar,{year:this.year,month:this.month})
                    .then(res => {
                        this.calendars = res.data;
                    })
            },
            //下个月
            nextMonth(){
                if(this.month === 12){
                    this.month = 1;
                    this.year = this.year + 1;
                }else{
                    this.month = this.month + 1;
                }
                this.getCalendar();
            },
            //上个月
            prevMonth(){
                if(this.month === 1){
                    this.month = 12;
                    this.year = this.year - 1;
                }else{
                    this.month = this.month - 1;
                }
                this.getCalendar();
            },
            //获取某天的日程数据，展示在右侧
            getDayEvent(){
                this.$ajax.post(this.$url.getEvents,{year:this.year,month:this.month,day:this.day})
                    .then(res => {
                        this.date_events = res.data.calObjs;
                    })
            },
            //选择某天,并且更新该天日程数据
            chooseDay(day){
                if(day === 0){//点击空白部分
                    return;
                }
                this.day = day;
                this.getDayEvent();
            }
        },
        created(){
            this.getEventType();
            this.initDate();
            this.getCalendar();
            this.getDayEvent();
        }
    }
</script>

<style scoped lang="scss">
    .content{
        padding: 0 0 15px 0;
        margin: auto;
        width: 1200px;
    }
    .head_left{
        i{
            cursor: pointer;
        }
        span{
            display: inline-block;
            width: 120px;
            text-align: center;
        }
    }
    .head_mid{
        @include flex(flex-start,center);
        .eventType{
            margin-left: 10px;
            color: #101010;
            font-size: 14px;
            span{
                display: inline-block;
                margin-left: 5px;
                width: 10px;
                height: 10px;
                border-radius: 30px;
                cursor: pointer;
            }
        }
    }
    .head_right{
        span{
            display: inline-block;
            margin-left: 20px;
            cursor: pointer;
            font-size: 14px;
            line-height: 24px;
            color: #000;
        }
        i{
            color: #959595;
        }
    }
    .body{
        padding: 10px 23px;
        @include flex(space-between,flex-start);
        .body_left{
            width: 758px;
            table{
                width: 100%;
                border-collapse: collapse;
                th{
                    padding: 10px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: normal;
                    background-color: #eee;
                    cursor: pointer;
                }
                td{
                    height: 108px;
                    padding: 10px;
                    position: relative;
                    cursor: pointer;
                    .num{
                        text-align: left;
                        position: absolute;
                        top: 10px;
                        left: 10px;
                    }
                    .dot{
                        position: absolute;
                        right: 10px;
                        bottom: 10px;
                        span{
                            display: inline-block;
                            margin-left: 5px;
                            width: 12px;
                            height: 12px;
                            border-radius: 30px;
                            cursor: pointer;
                        }

                    }
                }
                .today{
                    background-color: #eee !important;
                }
                .chooseDay{
                    background-color: #bfbfbf;
                }
            }
        }
        .body_right{
            width: 369px;
            .board{
                width: 100%;
                background-color: #eee;
                margin-bottom: 20px;
                font-size: 14px;
                .board_head{
                    padding: 10px 18px;
                    @include flex(space-between,center);
                }
                .board_body{
                    .board_body_block{
                        padding: 12px 18px;
                        border-top: 1px dashed #fff;
                        .block_time{
                            color: #959595;
                        }
                        .block_content{

                        }
                    }
                }
            }
        }
    }

</style>