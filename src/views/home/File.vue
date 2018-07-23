<template>
    <card>
        <template slot="header">
            <div class="left">学校公文<a href="http://oa.ccnu.edu.cn/seeyon/caslogin.jsp?type=queryDoc" target="_blank">历史公文</a></div>
            <a href="http://oa.ccnu.edu.cn/seeyon/caslogin.jsp?type=newBulletin" target="_blank"><i class="fa fa-ellipsis-h"></i></a>
        </template>
        <ul>
            <li v-for="i in data">
                <a href="'http://oa.ccnu.edu.cn/seeyon/caslogin.jsp?type='+i.url" target="_blank"><p>[{{i.type}}]{{i.title}}</p><time>{{i.createDate}}</time></a>
            </li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "File",
    computed:{
      data(){
        return this.$store.state.file;
      }
    }
  }
</script>

<style scoped lang="scss">
    .left{
        a{
            padding-left: 10px;
            border-left: 2px solid #1295d8;
            margin-left: 10px;
        }
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

    }

</style>