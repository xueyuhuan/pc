<template>
    <card class="calendar">
        <template slot="header">
            <div class="top">
                <div class="left">
                    <div class="year">
                        <i @click="prevYear">«</i>
                        <i @click="prevMonth">‹</i>
                        <span>{{nowDate.year}}年{{nowDate.month+1}}月</span>
                        <i @click="nextMonth">›</i>
                        <i @click="nextYear">»</i>
                    </div>
                    <ul v-if="eventType.length>0">
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
                    <li @click="clickEvent" v-for="day in nowMonthDays">{{day}}<div><span v-for="i in eventMonth" v-if="i.data===day"><i :style="`background:${i.colour};`"></i></span></div></li>
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
    },
    data () {
      return {
        nowDate: this.getDate(new Date()), //当前设置时间 默认为当前系统时间
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
        this.$emit('month-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //下月
      nextMonth () {
        if(this.nowDate.month===11) {
          this.nowDate.month = 0;
          this.nowDate.year ++
        }else {
          this.nowDate.month ++
        }
        this.$emit('month-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //去年
      prevYear () {
        this.nowDate.year --;
        this.$emit('year-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //下一年
      nextYear () {
        this.nowDate.year ++;
        this.$emit('year-change',{year:this.nowDate.year,month:this.nowDate.month+1});
      },
      //计算当月开始星期
      startWeek () {
        return this.calcWeekend(this.nowDate.year,this.nowDate.month,1)
      },
      //
      clickEvent (e) {
        let monthNo = this.nowDate.month;
        let month = monthNo<=11?(monthNo+1):0;
        let date = {
          year:this.nowDate.year,
          month:month,
          week: new Date(this.nowDate.year,this.nowDate.month,e.target.innerText).getDay(),
          day:Number(e.target.innerText)
        };
        this.$emit('click-event',date);
      }
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
            width: 100%;
            padding: 10px 20px;
            .left{
                width: 758px;
                border-top: 1px solid #e4e4e4;
                border-left: 1px solid #e4e4e4;
                ul{
                    @include flex;
                    flex-flow: wrap;
                    width: 100%;
                    li{
                        @include flex(space-between,flex-start);
                        flex-flow: column;
                        flex: 0 0 108px;
                        font-size: 14px;
                        padding: 10px;
                        border-right: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
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
                        }
                    }
                }

            }
            .right{
                flex: 0 0 370px;
            }
        }
    }
</style>