<template>
    <card class="application">
        <template slot="header">应用中心
            <router-link to="/app"><i class="fa fa-ellipsis-h"></i></router-link>
        </template>
        <ul><li v-for="i in app"><a :href="i.url">
            <img :src="$proxy+imgPath+i.id"/><p>{{i.name}}</p>
        </a></li></ul>
    </card>
</template>

<script>
  export default {
    name: "Application",
    data(){
      return{
        imgPath:'/resource/app?id=',
        app:[]
      }
    },
    created(){
      this.getData(this.$url.homeApp,'app','apps');//应用
    },
    methods:{
      getData(url,store,name){
        this.$ajax.post(url)
            .then(res=>{
              this[store]=res.data[name];
            })
      },
    }
  }
</script>

<style scoped lang="scss">
    ul{
        @include flex;
        flex-flow: wrap;
        padding: 15px;
        li{
            width: 50%;
            a{
                @include flex;
                width: 100%;
                padding: 5px;
                img{
                    flex: 0 0 25px;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                }
                p{
                    font-size: 12px;
                    padding-left: 30px;
                    margin: 0;
                    @extend %ellipsis;
                }
            }
        }
        li.no{
            width: 100%;
            font-size: 12px;
            color: #a0a0a0;
        }
    }
</style>