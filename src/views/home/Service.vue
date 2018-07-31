<template>
    <CardTemp>
        <header class="drag" slot="header">我的服务
            <div class="right">
                <i class="fa fa-cog" @click="popup"></i>
                <router-link to="/schedule"><i class="fa fa-ellipsis-h"></i></router-link>
            </div>
        </header>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><img :src="$proxy+imgPath+i.id"/>{{i.name}}</a>
            </li>
            <li class="no" v-if="data.length===0">暂无数据</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "Service",
    data(){
      return{
        imgPath:"/resource/service?id="
      }
    },
    computed:{
      data(){
        return this.$store.state.service;
      }
    },
    methods:{
      popup(){
        this.$store.commit('set_data',{
          data:true,
          name:'popupShow'
        });
        this.$store.commit('set_data',{
          data:"service",
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