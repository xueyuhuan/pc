<template>
    <CardTemp>
        <header class="drag" slot="header">
            <div class="left">学校公文<a class="_theme_border" href="http://oa.ccnu.edu.cn/seeyon/caslogin.jsp?type=queryDoc" target="_blank">历史公文</a></div>
            <a href="http://oa.ccnu.edu.cn/seeyon/caslogin.jsp?type=newBulletin" target="_blank"><i class="fa fa-ellipsis-h"></i></a>
        </header>
        <ul>
            <li v-for="(i,index) in componentData.list" v-if="index<7">
                <a href="'http://oa.ccnu.edu.cn/seeyon/caslogin.jsp?type='+i.url" target="_blank"><p>[{{i.type}}]{{i.title}}</p><time>{{i.createDate}}</time></a>
            </li>
            <li class="no" v-if="componentData.list.length===0">暂无数据</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "File",
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
    }
  }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
        .left{
            a{
                padding-left: 10px;
                margin-left: 10px;
                border-left: 2px solid;
            }
        }
    }
    ul{
        padding: 10px 20px;
        li{
            margin: 0 0 14px 0;
            a{
                @include flex(space-between);
                font-size: 14px;
                color: #000;
                p{
                    width: 380px;
                    @extend %ellipsis;
                    margin: 0;
                }
            }
        }
        li.no{
            font-size: 14px;
            color: rgb(137, 137, 137);
            margin: 0;
        }
    }

</style>