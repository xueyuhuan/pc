<template>
    <CardTemp>
        <header slot="header" class="drag">{{componentData.name}}
            <div class="right">
                <i class="fa fa-cog hidden-xs-only" @click="popup"></i>
                <router-link to="/app"><i class="fa fa-ellipsis-h"></i></router-link>
            </div>
        </header>
        <ul>
            <li v-for="i in componentData.list">
                <a :href="i.url" target="_blank"><img :src="$proxy+imgPath+i.id"/>{{i.name}}</a>
            </li>
            <li class="no" v-if="componentData.list.length===0">暂无应用</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "Application",
    props:{
      id:'',//获取组件id
    },
    data(){
      return{
        imgPath:"/resource/app?id=",
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
    },
    methods:{
      popup(){
        this.$store.commit('set_data',{
          data:true,
          name:'popupShow'
        });
        this.$store.commit('set_data',{
          data:"app",
          name:'popupType'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
    }
    .right{
        i{
            margin-left: 5px;
            cursor: pointer;
        }
    }
    ul{
        @include flex;
        flex-flow: wrap;
        padding: 10px 20px;
        li{
            width: 50%;
            margin: 0 0 14px 0;
            a{
                @include flex;
                font-size: 14px;
                color: #000;
                img{
                    width: 30px;
                    height: 30px;
                    margin-right: 20px;
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