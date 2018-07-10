<template>
    <card>
        <header name="header">我的应用
            <div class="right">
                <i class="fa fa-cog" @click="popup"></i>
                <router-link to="/schedule"><i class="fa fa-ellipsis-h"></i></router-link>
            </div>
        </header>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><img :src="imgPath+i.id"/>{{i.name}}</a>
            </li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "Application",
    data(){
      return{
        imgPath:"/api/resource/app?id="
      }
    },
    computed:{
      data(){
        return this.$store.state.app;
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
                    border-radius: 50%;
                    margin-right: 20px;
                }
            }
        }

    }

</style>