<template>
    <card>
        <header name="header">我的服务
            <div class="right">
                <i class="fa fa-cog"></i>
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
    name: "Service",
    data(){
      return{
        data:[],
        imgPath:"/api/resource/service?id="
      }
    },
    created(){
      this.$ajax.post(this.$url.homeService)
          .then(res=>{
            this.data=res.data.services;
          });
    },
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

    }

</style>