<template>
    <CardTemp>
        <header class="drag" slot="header">工资查询
            <router-link :to="'/service/iframe/'+data.serviceId"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <div class="pay">
            <template v-if="data.salary">
                <div class="text">
                    <p>{{data.title}}</p>
                    <p>当月总收入：{{data.salary.currentMonthTotal}}</p>
                    <p>上月津贴：{{data.salary.XNJT}}</p>
                    <p>应发工资：{{data.salary.YFHJ}}</p>
                    <p>扣款合计：{{data.salary.KKHJ}}</p>
                    <p>实发工资：{{data.salary.SFGZ}}</p>
                </div>
                <div id="pie"></div>
            </template>
            <span v-else class="no">服务器连接错误</span>
        </div>
    </CardTemp>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legendScroll'
  export default {
    name: "Pay",
    props:{
      id:''
    },
    computed:{
      data(){
        return this.$store.state.pay;
      },
    },
    mounted(){
      if(this.data.salary){
        this.drawPie();
      }
    },
    methods:{
      drawPie(){
        let salary=this.data.salary;
        let pie=echarts.init(document.getElementById("pie"));
        pie.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{b}({d}%)"
          },
          legend: {
            orient: 'vertical',
            right:'right',
            top:'center',
          },
          series: [
            {
              type:'pie',
              center:['40%','50%'],
              radius: ['50%', '70%'],
              label:{
                show:false
              },
              labelLine: {
                show:false
              },
              data:[
                {value:salary.GWGZ, name:'岗位工资：'+salary.GWGZ},
                {value:salary.XJGZ, name:'薪级工资：'+salary.XJGZ},
                {value:salary.JXGZ, name:'绩效：'+salary.JXGZ},
                {value:salary.BFHJ, name:'补发：'+salary.BFHJ},
                {value:salary.other, name:'其他：'+salary.other},
                {value:salary.XNJT, name:'上月津贴：'+salary.XNJT}
              ]
            }
          ],
          color:['#c12e34','#e6b600','#0098d9','#2b821d','#005eaa','#339ca8']
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
    }
    .pay{
        @include flex;
        padding: 0 20px;
        .no{
            display: inline-block;
            color: rgb(137, 137, 137);
            font-size: 14px;
            padding: 10px 0;
        }
        .text{
            flex: 1;
            :first-child{
                margin: 0 0 20px 0;
            }
            p{
                font-size: 14px;
                color: #000;
                margin: 0 0 10px 0;
            }
        }
        #pie{
            width: 394px;
            height: 240px;
        }
    }
</style>