<template>
    <CardTemp>
        <header class="drag" slot="header">{{componentData.name}}
            <a v-if="componentData.url!==''" :href="componentData.url" target="_blank"><i class="fa fa-ellipsis-h"></i></a>
        </header>
        <ul>
            <li v-for="i in componentData.list">
                <a :href="i.url" target="_blank"><p>{{i.title}}</p><time>{{i.publishDate}}</time></a>
            </li>
            <li class="no" v-if="componentData.list.length===0">暂无数据</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "newslist",
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
        console.log("data");
        console.log(this.data);
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