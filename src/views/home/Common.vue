<template>
    <CardTemp>
        <header class="drag" slot="header">新增模块
            <a href="http://fw.ccnu.edu.cn/notice/notify/notifyList" target="_blank"><i class="fa fa-ellipsis-h"></i></a>
        </header>
        <ul>
            <li>暂无数据</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "Common",
    computed:{
      data(){
        return this.$store.state.notice;
      }
    }
  }
</script>

<style scoped lang="scss">
    header{
        cursor: move;
    }
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