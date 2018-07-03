<template>
    <div>
        <subhead>
            <div><i class="fa fa-th-large"></i> 应用中心 App Center</div>
            <div>
                <el-input placeholder="placeholder" size="small">
                    <el-button slot="append" icon="el-icon-search" @click=""></el-button>
                </el-input>
            </div>
        </subhead>
        <div class="contain">

        </div>
    </div>

</template>

<script>
    export default {
        name: "Application",
        data(){
            return{
                placeholder:"应用搜索"
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .contain{
        @include content;
    }
    .el-input{
        -webkit-border-radius: 70px;
        -moz-border-radius: 70px;
        border-radius: 70px;
        overflow: hidden;
    }
</style>