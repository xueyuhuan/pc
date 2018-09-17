<template>
    <card class="calendar">
        <template slot="header">
            <div class="top">
                <div class="left">
                    <div class="year">
                        <i class="fa fa-angle-double-left" @click="prevYear"></i>
                        <i class="fa fa-angle-left" @click="prevMonth"></i>
                        <span>{{nowDate.year}}年{{nowDate.month+1}}月</span>
                        <i class="fa fa-angle-right" @click="nextMonth"></i>
                        <i class="fa fa-angle-double-right" @click="nextYear"></i>
                    </div>
                    <ul class="hidden-xs-only" v-if="eventType.length>0">
                        <li v-for="i in eventType"><i :style="`background:${i.color};`"></i>{{i.name}}</li>
                    </ul>
                </div>
                <div class="right">
                    <slot name="top-right"></slot>
                </div>
            </div>
        </template>
        <div class="bottom">
            <div class="left">
                <ul class="week">
                    <li v-for="(o,index) in 7" :key="o">{{formatWeek(index)}}</li>
                </ul>
                <ul class="date">
                    <li class="no" v-for="day in lastMonthDays" :key="lastMonthStartDay+day-1"> </li>
                    <li @click="clickEvent" @dblclick="dbClickEvent" v-for="day in nowMonthDays"
                        :class="{choose:day===choose.day&&(nowDate.month+1)===choose.month&&nowDate.year===choose.year,today:day===today.day&&(nowDate.month+1)===today.month&&nowDate.year===today.year}">
                        {{day}}<div><span class="hidden-xs-only" v-for="i in eventMonth" v-if="i.data===day"><i :style="`background:${i.colour};`"></i></span></div>
                    </li>
                    <li class="no" v-for="day in (lastMonthDays+nowMonthDays>35)?(42-lastMonthDays-nowMonthDays):(35-lastMonthDays-nowMonthDays)" :key="day"> </li>
                </ul>
            </div>
            <div class="right">
                <slot name="event-list"></slot>
            </div>
        </div>
    </card>
</template>

<script>
  export default {
    name: "Calendar",
    props: {
      eventType:Array,//事件类型列表
      eventMonth:Array,
      today:{},
    },
    data () {
      return {
        nowDate: this.getDate(new Date()), //当前设置时间 默认为当前系统时间
        choose:{
          year:0,
          month:0,
          day:0
        },
      }
    },
    computed: {
      lastMonthDays () {
        return this.startWeek()//计算当月开始星期
      },
      lastMonthStartDay () {//上月总天数-（当月开始星期-1）
        return this.calcLastMonthDays(this.nowDate.year,this.nowDate.month)-(this.startWeek()-1)
      },
      nowMonthDays () {
        return this.calcDays(this.nowDate.year,this.nowDate.month)//计算某年某月的天数
      }
    },
    created () {
      if(this.setDate) {
        this.nowDate = this.getDate(this.setDate)
      }
    },
    methods: {
      getDate (date) {
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDay(),
          date: date.getDate()
        }
      },
      formatWeek (day) {
        switch (day) {
          case 0:
            return '周日';
          case 1:
            return '周一';
          case 2:
            return '周二';
          case 3:
            return '周三';
          case 4:
            return '周四';
          case 5:
            return '周五';
          case 6:
            return '周六';
        }
      },
      //判断闰年
      isLeapYear (year) {
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
      },
      //根据日子计算星期
      calcWeekend (year,month,day) {
        return new Date(year,month,day).getDay();
      },
      //计算某年某月的天数
      calcDays (year,month) {
        const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(this.isLeapYear(year)&&month===1)
          return 29;
        else
          return monthDay[month]
      },
      //计算上个月天数
      calcLastMonthDays (year,month) {
        if(month===0) {
          return this.calcDays(year-1,11)
        }else {
          return this.calcDays(year,month-1)
        }
      },
      //上月
      prevMonth () {
        if(this.nowDate.month===0) {
          this.nowDate.month = 11;
          this.nowDate.year --
        }else {
          this.nowDate.month --
        }
        this.$emit('year-month-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //下月
      nextMonth () {
        if(this.nowDate.month===11) {
          this.nowDate.month = 0;
          this.nowDate.year ++
        }else {
          this.nowDate.month ++
        }
        this.$emit('year-month-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //去年
      prevYear () {
        this.nowDate.year --;
        this.$emit('year-month-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //下一年
      nextYear () {
        this.nowDate.year ++;
        this.$emit('year-month-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //计算当月开始星期
      startWeek () {
        return this.calcWeekend(this.nowDate.year,this.nowDate.month,1)
      },
      //
      clickEvent (e) {
        let monthNo = this.nowDate.month;
        let month = monthNo<=11?(monthNo+1):0;
        this.choose = {
          year:this.nowDate.year,
          month:month,
          // week: new Date(this.nowDate.year,this.nowDate.month,e.target.innerText).getDay(),
          day:Number(e.target.innerText)
        };
        this.$emit('click-event',this.choose);
      },
      dbClickEvent () {
        this.$emit('db-click-event',this.choose);
      },
    }
  }
</script>

<style scoped lang="scss">
    .calendar{
        @extend %width;
        .top{
            @include flex(space-between);
            width: 100%;
            .left{
                @include flex(space-between,flex-start);
                width: 758px;
                @media only screen and (max-width:767px) {
                    width: auto;
                }
                .year {
                    @include flex;
                    flex: none;
                    i,span{margin-right: 10px;cursor: pointer}
                }
                ul{
                    @include flex;
                    flex-flow: wrap;
                    li{
                        font-size: 14px;
                        color: #101010;
                        i{
                            display: inline-block;
                            height: 10px;
                            width: 10px;
                            border-radius: 50%;
                            margin: 0 5px 0 10px;
                        }
                    }
                }
            }
        }
        .bottom{
            @include flex(space-between,flex-start);
            flex-flow: wrap;
            width: 100%;
            padding: 10px 20px;
            .left{
                width: 758px;
                @media only screen and (max-width:767px) {
                    width: 100%;
                }
                border-top: 1px solid #e4e4e4;
                border-left: 1px solid #e4e4e4;
                ul{
                    @include flex;
                    flex-flow: wrap;
                    width: 100%;
                    li{
                        &.choose{background: #bfbfbf}
                        &.today{background: #eee}
                        @include flex(space-between,flex-start);
                        flex-flow: column;
                        flex: none;
                        width: 108px;
                        @media only screen and (max-width:767px) {
                            width:14.28%;
                            flex: 0 0 14.28%;
                        }
                        font-size: 14px;
                        padding: 10px;
                        border-right: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        cursor: pointer;
                        div{
                            align-self: flex-end;
                            span{
                                i{
                                    display: inline-block;
                                    width: 12px;
                                    height: 12px;
                                    border-radius: 50%;
                                    margin-left: 5px;
                                }
                            }
                        }
                        &.no{
                            color: #999;
                        }
                    }
                    &.week{
                        li{
                            background: #eee;
                            text-align: center;
                        }
                    }
                    &.date{
                        li{
                            height: 108px;
                            @media only screen and (max-width:767px) {
                                height: 48px;
                            }
                        }
                    }
                }

            }
            .right{
                flex: 0 0 370px;
                @media only screen and (max-width:767px) {
                    flex: auto;
                }
            }
        }
    }
</style>