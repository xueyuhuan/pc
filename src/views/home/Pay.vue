<template>
    <card>
        <header name="header">工资查询
            <router-link to="/pay"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <div class="pay">
            <div class="text">
                <p>{{title}}</p>
                <p>当月总收入：{{data.currentMonthTotal}}</p>
                <p>上月津贴：{{data.XNJT}}</p>
                <p>应发工资：{{data.YFHJ}}</p>
                <p>扣款合计：{{data.KKHJ}}</p>
                <p>实发工资：{{data.SFGZ}}</p>
            </div>
            <div id="pie"></div>
        </div>

    </card>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legendScroll'
  export default {
    name: "Pay",
    data(){
      return{
        data:{},
        title:""
      }
    },
    mounted(){
      this.$ajax.post(this.$url.homePay)
          .then(res=>{
            this.data=res.data.salary;
            this.title=res.data.title;
            this.drawPie();
          });
    },
    methods:{
      drawPie(){
        const vm=this;
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
                {value:vm.data.GWGZ, name:'岗位工资：'+vm.data.GWGZ},
                {value:vm.data.XJGZ, name:'薪级工资：'+vm.data.XJGZ},
                {value:vm.data.JXGZ, name:'绩效：'+vm.data.JXGZ},
                {value:vm.data.BFHJ, name:'补发：'+vm.data.BFHJ},
                {value:vm.data.other, name:'其他：'+vm.data.other},
                {value:vm.data.XNJT, name:'上月津贴：'+vm.data.XNJT}
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
    .pay{
        @include flex;
        padding: 0 20px;
        .text{
            flex: 1;
            :first-child{
                margin: 0 0 20px 0;
            }
            p{
                font-size: 14px;
                margin: 0 0 10px 0;
            }
        }
        #pie{
            width: 394px;
            height: 240px;
        }
    }
</style>