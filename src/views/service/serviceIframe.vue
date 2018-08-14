<template>
    <div id="serviceIframe">
        <subhead>
            <div><i class="fa fa-arrow-left" @click="routerBack"></i>&nbsp;&nbsp;&nbsp;{{service.name}}&nbsp;</div>
        </subhead>
        <div class="content">
            <iframe id="serviceFrame" :src="url" style="width: 100% !important;min-height: 570px;border: 0px"></iframe>
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
         console.log(this.$route.params.id);
            this.$ajax.post(this.$url.serviceSimpleDetail,{id:this.$route.params.id})
                .then(res=>{
                    this.service=res.data.service;
                    this.url=res.data.url;
                })
        },
        methods:{
            routerBack(){
                this.$router.go(-1);
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
        }
    }
</style>