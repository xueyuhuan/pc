<template>
    <card>
        <header name="header">通知公告</header>
        <ul>
            <li v-for="i in data">
                <a :href="i.url" target="_blank"><p>{{i.title}}</p><time>{{i.publishDate}}</time></a>
            </li>
        </ul>
    </card>
</template>

<script>
  export default {
    name: "Notice2",
    data(){
      return{
        data:[]
      }
    },
    created(){
      this.$ajax.post(this.$url.homeNotice2,{columnId:"058ac10ab4684d6aaec045196c09a9b7"})
          .then(res=>{
            this.data=res.data.news.slice(0,7);
          });
    },
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