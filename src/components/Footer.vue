<template>
    <div class="footContain">
        <div class="foot">
            <span>© 2015-2017 Wuhan Sibe. All rights reserved.</span>
            <router-link to="/log">升级日志</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss">
    .footContain{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 51px;
        min-width: 1200px;
        background-color: #747474;
        margin-top: 20px;
        color: #fff;
        .foot{
            width: 1200px;
            height: 51px;
            margin: 0 auto;
            font-size: 14px;
            font-family: "Microsoft YaHei","Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif;
            @include flex(space-between,center);
            span{

            }
        }
    }
</style>