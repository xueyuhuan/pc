<template>
    <CardTemp>
        <header class="drag" slot="header">
            <div class="left">
                我的日程
                <div class="btn">
                    <span @click="click(0)" :class="{active:date===0}">今天</span>
                    <span @click="click(1)" :class="{active:date===1}">明天</span>
                    <span @click="click(2)" :class="{active:date===2}">后天</span></div>
            </div>
            <router-link to="/schedule"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <ul>
            <li v-for="i in componentData.list">
                <p><span>{{i.title}}</span><span>{{i.info}}</span></p><time>{{i.dtstart}}</time>
            </li>
            <li class="no" v-if="componentData.list.length===0">暂无个人日程安排</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "Schedule",
    props:{
      id:''
    },
    data(){
      return{
        componentData:{
          name:'',
          url:'',
          list:'',
        }
      }
    },
    computed:{
      data(){
        return this.$store.state.componentData[this.id];
      },
      date(){
        return this.$store.state.date;
      }
    },
    watch:{
      data(value){
        this.componentData.name=value.name;
        this.componentData.url=value.moreLink;
        this.componentData.list=value.data;
      },
    },
    created(){
      if(this.data){
        this.componentData.name=this.data.name;
        this.componentData.url=this.data.moreLink;
        this.componentData.list=this.data.data;
      }
    },
    methods:{
      click(n){
        this.$store.commit('set_data',{
          data:n,
          name:'date'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
    }
    .left{
        @include flex;
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
        padding: 10px 20px;
        li{
            @include flex(space-between);
            font-size: 14px;
            color: #000;
            cursor: pointer;
            margin: 0 0 14px 0;
            p{
                flex: 1;
                margin: 0;
                span{
                    display: inline-block;
                }
                :first-child{
                    width: 222px;
                    @extend %ellipsis;
                }
                :last-child{
                    width: 185px;
                    margin: 0 10px;
                    @extend %ellipsis;
                }
            }
        }
        li.no{
            color: #898989;
            margin: 0;
        }
    }

</style>