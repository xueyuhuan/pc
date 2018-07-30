<template>
    <CardTemp>
        <header class="drag" slot="header">
            我的待办
            <router-link to="/todo"><i class="fa fa-ellipsis-h"></i></router-link>
        </header>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><p>[{{i.appName}}]{{i.title}}</p><time>{{i.currentTime}}</time></a>
            </li>
            <li class="no" v-if="data.length===0">暂无待办</li>
        </ul>
    </CardTemp>
</template>

<script>
  export default {
    name: "Todo",
    computed:{
      data(){
        return this.$store.state.todo;
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