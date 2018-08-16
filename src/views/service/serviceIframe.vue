<template>
    <div id="serviceIframe">
        <subhead>
            <div><i class="fa fa-arrow-left" @click="routerBack"></i>&nbsp;&nbsp;&nbsp;{{service.name}}&nbsp;</div>
        </subhead>
        <div class="content">
            <iframe id="bdIframe" :src="url"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name: "serviceIframe",
        data(){
            return {
                service:'',
                url:''
            }
        },
        created(){
          this.$ajax.post(this.$url.serviceSimpleDetail,{id:this.$route.params.id})
              .then(res=>{
                this.service=res.data.service;
                this.url=res.data.url;
              })
        },
      mounted(){
        const oIframe = document.getElementById('bdIframe');
        // console.log(oIframe.contentWindow.document.body.scrollHeight);
        // console.log(oIframe.contentWindow.document.documentElement.scrollHeight);
        // const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        // oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
        oIframe.style.height = (Number(deviceHeight)-240) + 'px'; //数字是页面布局高度差
      },
        methods:{
            routerBack(){
                this.$router.go(-1);
            },
          setServiceHeight(h){
            document.getElementById('bdIframe').style.height=h;
          }
        }
    }
</script>

<style scoped lang="scss">
    #serviceIframe{
        .subhead{
            em{
                font-size: 18px;
                font-weight: bold;
                padding: 0 5px;
            }
        }
        .content{
            @extend %width;
            iframe{
                width: 100%;
                border: none;
            }
        }
    }
</style>