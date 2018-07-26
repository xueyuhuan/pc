<template>
    <card>
        <template slot="header">通知公告</template>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><p>{{i.title}}</p><time>{{i.publishDate}}</time></a>
            </li>
            <li class="no" v-if="data.length===0">暂无数据</li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "Notice2",
    computed:{
      data(){
        return this.$store.state.notice2;
      }
    }
  }
</script>

<style scoped lang="scss">
    ul{
        padding: 10px 20px;
        li{
            margin: 0 0 14px 0;
            a{
                @include flex(space-between);
                font-size: 14px;
                color: #000;
                p{
                    width: 380px;
                    @extend %ellipsis;
                    margin: 0;
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