<template>
    <div class="subhead">
        <div class="content">
            <slot></slot>
        </div>

    </div>
</template>

<style lang="scss">
    .subhead{
        background: $skin-darker;
        margin-bottom: 15px;
        font-size: 16px;
        span{
            font-size: 12px;
        }
        .content{
            @include flex(space-between);
            width: 1200px;
            margin: 0 auto;
            height: 42px;
            color: #fff;
            .el-input-group__append{
                padding: 0 10px;
                width: 30px;
                text-align: center;
                & button{
                    padding: 8px 7px;
                    -webkit-border-radius: 0 30px 30px 0;
                    -moz-border-radius: 0 30px 30px 0;
                    border-radius: 0 30px 30px 0;
                }
            }
            .el-input{
                width: 194px;
                height: 30px;
                -webkit-border-radius: 70px;
                -moz-border-radius: 70px;
                border-radius: 70px;
                overflow: hidden;
            }
        }
    }
</style>