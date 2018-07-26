<template>
    <CardTemp>
        <header class="drag" slot="header">
            服务排行
            <div class="btn">
                <span @click="click(1)" :class="{active:type===1}">本周</span>
                <span @click="click(2)" :class="{active:type===2}">本月</span>
                <span @click="click(3)" :class="{active:type===3}">本年</span></div>
        </header>
        <ul>
            <li v-for="i in data">
                <div class="name"><i>{{i.Z_R_N}}</i><img :src='$proxy+imgPath+i.ID'/>{{i.NAME.substring(0,10)}}</div>{{i.VW}}次
            </li>
            <li class="no" v-if="data.length===0">暂无数据</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "Ranking",
    data(){
      return{
        imgPath:"/resource/service?id="
      }
    },
    computed:{
      data(){
        return this.$store.state.ranking;
      },
      type(){
        return this.$store.state.type;
      }
    },
    methods:{
      click(n){
        this.$store.commit('set_data',{
          data:n,
          name:'type'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    header{
        @include flex(flex-start);
        cursor: move;
        .btn{
            display: inline-block;
            margin-left: 30px;
            span{
                display: inline-block;
                background: #bfbfbf;
                width: 40px;
                height: 21px;
                line-height: 21px;
                font-size: 12px;
                color: #fff;
                text-align: center;
                border-radius: 15px;
                margin-right: 10px;
                cursor: pointer;
                &.active{
                    background: #f08625;
                }
            }
        }
    }
    ul{
        @include flex;
        flex-flow: wrap;
        padding: 10px 20px;
        li{
            @include flex(space-between);
            width: 50%;
            font-size: 14px;
            color: #000;
            cursor: pointer;
            padding-right: 20px;
            margin: 0 0 14px 0;
            .name{
                @include flex;
                i{
                    display: inline-block;
                    background: #959595;
                    width: 20px;
                    height: 20px;
                    color: #eaeaea;
                    text-align: center;
                    border-radius:2px;
                }
                img{
                    width: 30px;
                    height: 30px;
                    margin: 0 15px;
                }
            }
            &:nth-child(1) i{
                background: #dd574c;
            }
            &:nth-child(2) i{
                background: #f39943;
            }
            &:nth-child(3) i{
                background: #4a8cac;
            }
        }
        li.no{
            color: rgb(137, 137, 137);
            margin: 0;
        }
    }

</style>