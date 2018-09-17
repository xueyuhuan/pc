<template>
    <card class="service">
        <template slot="header">
            <div class="left">
                服务
                <div class="btn">
                    <span @click="click('hot')" :class="{active:active==='hot'}">热门</span>
                    <span @click="click('newest')" :class="{active:active==='newest'}">最新</span></div>
            </div>
            <router-link to="/service/search/icon"><i class="fa fa-ellipsis-h"></i></router-link>
        </template>
        <ul><li v-for="i in list.slice(0,8)"><router-link :to="'/service/detail/'+i.id">
            <img :src="$proxy+imgPath+i.id"/>
            <p>{{i.name}}<br/><span>{{i.type2Name}}</span></p>
        </router-link></li></ul>
    </card>
</template>

<script>
  export default {
    name: "Service",
    data(){
      return{
        imgPath:'/resource/service?id=',
        active:'hot',
        list:[],
        hot:[],
        newest:[],
      }
    },
    created(){
      this.getData(this.$url.serviceHot,'hot','services');//热门
      this.getData(this.$url.serviceNewest,'newest','newestServices');//最新
    },
    methods:{
      click(type){
        this.active=type;
        this.list=this[type];
      },
      getData(url,store,name){
        this.$ajax.post(url)
            .then(res=>{
              this[store]=res.data[name];
              if(store==='hot'){
                this.list=res.data[name];
              }
            })
      },
    }
  }
</script>

<style scoped lang="scss">
    .service{
        header{
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
        }
        ul{
            @include flex;
            flex-flow: wrap;
            padding: 15px;
            li{
                flex: 0 0 25%;
                a{
                    &:hover{
                        box-shadow: 0 0 6px 3px #eee;
                    }
                    @include flex(flex-start,flex-start);
                    padding: 15px;
                    @media only screen and (max-width:767px) {
                        padding: 0;
                    }
                    img{
                        width: 40px;
                        margin: 0 15px 17px 0;
                    }
                    p{
                        display: inline-block;
                        width: 108px;
                        font-size: 13px;
                        margin: 0;
                        @include ellipsis(2);
                        span{
                            color: #98a6ad;
                            font-size: 12px;
                        }
                    }
                }
            }

        }
    }
</style>