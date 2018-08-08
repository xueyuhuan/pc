<template>
    <div id="log">
        <subhead>
            <div><i class="fa fa-copy"></i>&nbsp;&nbsp;&nbsp;成长日记</div>
        </subhead>
        <div class="main">
            <div class="banner">
                <img class="bg" src="/img/bg_log.jpg"/>
                <div class="info">
                    <div class="left">
                        <img :src="'/img/'+$school.school+'/logo_mini.png'"/>
                        <div class="text">
                            <h4>门户成长日记</h4>
                            <p>门户{{version}}于{{time}}更新!</p>
                        </div>
                    </div>
                    <div class="right">
                        <p>{{count}}<br/><span>更新次数</span></p>
                        <p>{{version}}<br/><span>最新版本</span></p>
                    </div>
                </div>
            </div>
            <div class="content">
                <ul class="nav">
                    <li v-for="(i,index) in nav" :class="{active:index===navActive}" @click="clickNav(index,i)">{{i}}年</li>
                </ul>
                <ul class="list">
                    <li v-for="(i,index) in list">
                        <span class="version" :style="{'background':colors[index%3]}">{{i.version}}</span>
                        <h5>{{i.updateTime}}</h5>
                        <span class="textarea" v-html="i.content.replace(/\n/g, '<br/>')"></span>
                    </li>
                    <li v-show="page<total" class="more"><span class="more" @click="clickMore">更多</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "log",
    data(){
      return {
        bg:this.$proxy+'/img/icon_upgrade_bg.jpg',
        version:'',//版本
        time:'',//更新时间
        count:'',//更新次数
        nav:[],//年份
        navActive:0,
        page:1,
        limit:20,
        year:'',
        list:[],
        total:[],
        listMore:[],
        moreCount:0,//点击加载更多次数
        colors:['rgb(255, 90, 42)','#9CCB6F','rgb(255, 163, 0)'],
      }
    },
    created(){
      this.$ajax.post('/uplog_portal/years')
          .then(res=>{
            if(res.data.errcode==='0'){
              this.version=res.data.latest.version;
              this.time=res.data.latest.updateTime;
              this.count=res.data.logCount;
              this.nav=res.data.years;
              this.year=res.data.years[0];
              this.getList();
            }
          })
    },
    methods:{
      clickNav(n,year){
        this.page=1;//重置页数
        this.navActive=n;
        this.year=year;
        this.getList();
      },
      clickMore(){
        this.moreCount++;
        this.page++;//页数+1
        this.getListMore();
      },
      getList(){
        this.$ajax.post('/uplog_portal/query',{page:1,limit:this.limit,year:this.year})
            .then(res=>{
              if(res.data.errcode==='0'){
                this.list=res.data.page.rows;
                this.total=res.data.page.total;
              }
            })
      },
      getListMore(){
        this.$ajax.post('/uplog_portal/query',{page:this.page,limit:this.limit,year:this.year})
            .then(res=>{
              if(res.data.errcode==='0'){
                this.list=this.list.concat(res.data.page.rows);
              }
            })
      }
    }
  }
</script>

<style scoped lang="scss">
    #log{
        .main{
            width: 1170px;
            margin: 0 auto;
            .banner{
                position: relative;
                height: 200px;
                width: 100%;
                .bg{
                    position: absolute;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                }
                .info{
                    @include flex(space-between);
                    height: 180px;
                    color: #fff;
                    .left{
                        @include flex;
                        img{
                            width: 80px;
                            margin: 0 20px;
                        }
                        .text{
                            h4{
                                font-size: 18px;
                                font-weight: normal;
                                margin: 0;
                            }
                            p{
                                font-size: 12px;
                                margin: 10px 0 0 0;
                            }
                        }
                    }
                    .right{
                        p{
                            display: inline-block;
                            font-size: 14px;
                            font-weight: 700;
                            text-align: center;
                            margin: 0;
                            span{
                                font-weight: 500;
                            }
                            &:last-child{
                                margin: 0 90px 0 40px;
                            }
                        }
                    }
                }
            }
            .content{
                background: #fff;
                padding: 15px;
                border: 1px solid transparent;
                border-radius: 2px;
                box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
                ul.nav{
                    @include flex;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #dee5e7;
                    li{
                        font-size: 14px;
                        font-weight: 700;
                        color: #58666e;
                        padding: 6px 12px;
                        border: 1px solid #dedede;
                        border-radius: 10px;
                        box-shadow: 0 1px 1px rgba(90,90,90,.1);
                        margin-right: 15px;
                        cursor: pointer;
                        &.active{
                            background: #27c24c;
                            color: #fff;
                        }
                    }
                }
                ul.list{
                    li{
                        position: relative;
                        padding: 15px 0 15px 20px;
                        border-left: 2px solid #dee5e7;
                        margin-left: 6em;
                        span.version{
                            position: absolute;
                            top: 50%;
                            left: 0;
                            z-index: 998;
                            transform: translate(-50%,-50%);
                            @include flex(center);
                            width: 60px;
                            height: 60px;
                            font-weight: bolder;
                            border-radius: 50%;
                            background: #9CCB6F;
                            color: #fff;
                        }
                        h5{
                            font-size: 16px;
                            font-weight: bolder;
                            margin: 0 0 0 30px;
                        }
                        span.textarea{
                            display: inline-block;
                            background: #F6F6F6;
                            line-height: 1.4;
                            font-size: 13px;
                            font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
                            color: #333;
                            word-break: break-all;
                            word-wrap: break-word;
                            padding: 9.5px;
                            border: 1px solid #dee5e7;
                            border-radius: 4px;
                            margin: 10px 15px 20px 40px;
                        }
                        &.more{
                            border: none;
                            span.more{
                                position: absolute;
                                top: 0;
                                left: 0;
                                transform: translate(-50%,-50%);
                                background: #fff;
                                line-height: 1.5;
                                font-size: 12px;
                                color: #58666e;
                                padding: 5px 15px;
                                border: 1px solid #dee5e7;
                                box-shadow: 0 1px 1px rgba(90,90,90,.1);
                                border-radius: 50px;
                                cursor: pointer;
                                &:hover{
                                    background: #edf1f2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>