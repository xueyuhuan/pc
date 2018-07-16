<template>
    <div class="search">
        <subhead>
            <div class="left">
                <i class="fa fa-arrow-left" style="cursor: pointer" @click="routerBack"></i>&nbsp;&nbsp;&nbsp;服务中心&nbsp;<span>Service&nbsp;Center</span>
            </div>
            <div class="right">
                <input v-model="key" placeholder="服务搜索"/><button><i class="fa fa-search"></i></button>
            </div>
        </subhead>
    </div>
</template>

<script>
  export default {
    name: "Search",
    data(){
      return{

      }
    },
    created(){

    },
    methods:{
      routerBack(){
        this.$router.go(-1);
      },
    }
  }
</script>
<style scoped lang="scss">
    .search{
        .subhead{
            .right{
                height: 30px;
                input{
                    background: #069;
                    width: 160px;
                    height: 100%;
                    font-size: 12px;
                    padding: 5px 15px;
                    border-radius: 30px 0 0 30px;
                    border: none;
                }
                button{
                    background: #069;
                    height: 100%;
                    font-size: 12px;
                    padding: 5px 10px;
                    border-radius: 0 30px 30px 0;
                    border: none;
                    i{
                        color: #1295d8;
                    }
                }
            }
        }
    }
</style>