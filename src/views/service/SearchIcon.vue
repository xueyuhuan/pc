<template>
    <ul class="icon">
        <li v-for="i in data.rows"><router-link :to="'/service/detail/'+i.id">
            <div class="xs" v-show="i.lineAble==='0'"><span>线下</span></div>
            <img :src="$proxy+imgPath+i.id"/>
            <p class="name" :title="i.name"><i class="fa fa-building-o" v-if="i.isJzdt==='1'"></i><span v-html="ruleTitle(i.name)"></span></p>
            <p class="type">服务类别：{{i.type2Name}}</p>
            <span class="number"><i class="fa fa-eye"></i>&nbsp;{{i.viewCount}}<i class="fa fa-star" :class="{yellow:i.favCount>0}"></i>&nbsp;{{i.favCount}}</span>
        </router-link></li>
    </ul>
</template>

<script>
  export default {
    name: "SearchIcon",
    data(){
      return{
        imgPath:"/resource/service?id=",
      }
    },
    computed:{
      key(){
        return this.$store.state.searchKey;
      },
      data(){
        return this.$store.state.search;
      }
    },
    methods:{
      ruleTitle(value) {
        let titleString = value;
        if (!titleString) {
          return value;
        }
        if (this.key) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.key, 'g');
          // 高亮替换v-html值
          let replaceString = '<em style="color: #FF9800">' + this.key + '</em>';
          // 开始替换
          titleString = titleString.replace(replaceReg, replaceString);
        }
        return titleString;
      }
    }
  }
</script>

<style scoped lang="scss">
    ul{
        @include flex;
        flex-flow: wrap;
        padding: 0 25px !important;

        li{
            &:hover{
                background: #eee;
            }
            position: relative;
            .xs{
                position: absolute;
                top: 0;
                right: 0;
                width: 0;
                height: 0;
                border-left: 38px solid transparent;
                border-top: 38px solid #e5e5e5;
                span{
                    position: absolute;
                    top: -36px;
                    right: -8px;
                    font-size: 12px;
                    width: 38px;
                    color: #959595;
                }
            }
            width: 220px;
            @media only screen and (max-width:767px) {
                width: auto;
            }
            text-align: center;
            padding: 20px 0;
            border: 1px solid #e5e5e5;
            margin: 10px 10px 0 0;
            cursor: pointer;
            img{
                width: 50px;
                height: 50px;
            }
            p.name{
                i{
                    font-size: 12px;
                    color: #f39b42;
                    margin-right: 4px;
                }
                width: 180px;
                @media only screen and (max-width:767px) {
                    width: 150px;
                }
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
        }
    }
</style>