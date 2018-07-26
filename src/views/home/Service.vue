<template>
    <card>
        <template slot="header">我的服务
            <div class="right">
                <i class="fa fa-cog" @click="popup"></i>
                <router-link to="/schedule"><i class="fa fa-ellipsis-h"></i></router-link>
            </div>
        </template>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><img :src="imgPath+i.id"/>{{i.name}}</a>
            </li>
            <li class="no" v-if="data.length===0">暂无数据</li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "Service",
    data(){
      return{
        imgPath:"/api/resource/service?id="
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
    .right{
        i{
            margin-left: 5px;
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
                    border-radius: 50%;
                    margin-right: 20px;
                }
            }
        }
        li.no{
            color: rgb(137, 137, 137);
            margin: 0;
        }
    }
</style>