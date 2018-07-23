<template>
    <card>
        <template slot="header">
            我的待办
            <router-link to="/todo"><i class="fa fa-ellipsis-h"></i></router-link>
        </template>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><p>[{{i.appName}}]{{i.title}}</p><time>{{i.currentTime}}</time></a>
            </li>
            <li v-if="data.length===0" style="margin: 0;color: #898989;font-size: 14px;">暂无待办</li>
        </ul>
    </card>
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