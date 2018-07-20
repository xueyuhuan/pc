<template>
    <div class="listing">
        <div class="left">
            <h4>热门服务</h4>
            <ul><li v-for="i in hot"><router-link :to="'/service/detail/'+i.id">
                <img :src="imgPath+i.id"/>
                <div class="text">
                    <p class="name">{{i.name}}</p>
                    <p class="type">服务类型：{{i.type2Name}}</p>
                    <span class="number"><i class="fa fa-eye"></i>&nbsp;{{i.viewCount}}<i class="fa fa-star" :class="{yellow:i.favCount>0}"></i>&nbsp;{{i.favCount}}</span>
                </div>
            </router-link></li></ul>
            <h4 style="padding: 10px 0 0 0">最新服务</h4>
            <ul><li v-for="i in newest"><router-link :to="'/service/detail/'+i.id">
                <img :src="imgPath+i.id"/>
                <div class="text">
                    <p class="name">{{i.name}}</p>
                    <p class="type">服务类型：{{i.type2Name}}</p>
                    <span class="number"><i class="fa fa-eye"></i>&nbsp;{{i.viewCount}}<i class="fa fa-star" :class="{yellow:i.favCount>0}"></i>&nbsp;{{i.favCount}}</span>
                </div>
            </router-link></li></ul>
        </div>
        <ul class="right"><li v-for="i in data.rows">
            <router-link :to="'/service/detail/'+i.id">
            <div class="left">
                <img :src="imgPath+i.id"/>
                <div class="text">
                    <p class="name">{{i.name}}</p>
                    <p class="type">服务类型：{{i.type2Name}}</p>
                    <span class="number"><i class="fa fa-eye"></i>&nbsp;{{i.viewCount}}<i class="fa fa-star" :class="{yellow:i.favCount>0}"></i>&nbsp;{{i.favCount}}</span>
                </div>
            </div>
            <div class="right">
                <p><i class="fa fa-info-circle"></i>&nbsp;由{{i.managerDeptname}}提供</p>
                <p><i class="fa fa-info-circle"></i>&nbsp;本服务的服务对象{{i.fwdxsm}}</p>
            </div>
            </router-link></li></ul>
    </div>
</template>

<script>
  export default {
    name: "SearchList",
    data(){
      return{
        imgPath:process.env.VUE_APP_PROXY+"/resource/service?id=",
        hot:[],
        newest:[]
      }
    },
    computed:{
      data(){
        return this.$store.state.search;
      }
    },
    created(){
      this.getHot();
      this.getNewest();
    },
    methods:{
      getHot(){
        this.$ajax.post(this.$url.serviceHotAll)
            .then(res=>{
              this.hot=res.data.hotServices;
            })
      },
      getNewest(){
        this.$ajax.post(this.$url.serviceNewest)
            .then(res=>{
              this.newest=res.data.newestServices;
            })
      }
    }
  }
</script>

<style scoped lang="scss">
    .listing{
        li:hover{
            background: #eee;
        }
        img{
            width: 50px;
            height: 50px;
            margin-right: 25px;

        }
        p.name{
            i{
                font-size: 12px;
                color: #f39b42;
                margin-right: 4px;
            }
            width: 180px;
            font-size: 14px;
            margin: 5px auto 0;
            @extend %ellipsis;
        }
        p.type{
            font-size: 12px;
            color:#959595;
            margin: 0;
        }
        span.number{
            font-size: 12px;
            color: #959595;
            i:first-child{
                color: #e60012;
            }
            i:last-child{
                margin-left: 10px;
            }
            i.yellow{
                color: #fc0;
            }
        }
        @include flex(space-between,flex-start);
        padding: 10px 25px !important;
        .left{
            h4{
                font-size: 16px;
                font-weight: normal;
                color: $skin-card;
                margin: 0;
            }
            ul{
                a{
                    @include flex;
                    width: 356px;
                    padding: 15px 20px;
                    border: 1px solid #e5e5e5;
                    margin-top: 10px;
                    cursor: pointer;
                    .text{
                        p.name{
                            margin-bottom: 5px !important;
                        }
                    }
                }
            }
        }
        ul.right{
            a{
                @include flex(space-between);
                width: 770px;
                padding: 7px 23px;
                border: 1px solid #e5e5e5;
                margin-bottom: 10px;
                .left{
                    @include flex;
                    p.name{
                        width: auto;
                    }
                }
                .right{
                    p{
                        line-height: 20px;
                        font-size: 12px;
                        color: #959595;
                        text-align: right;
                        margin: 0;
                    }
                }
            }
        }
    }
</style>