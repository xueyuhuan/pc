<template>
    <div class="subhead _theme_darker">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
    .subhead{
        margin-bottom: 15px;
        font-size: 16px;
        .content{
            @include flex(space-between);
            @extend %width;
            @media only screen and (max-width:767px) {
                padding: 0 10px;
            }
            height: 42px;
            color: #fff;
            i.icon{
                margin-right: 12px;
            }
            span{
                font-size: 12px;
            }
        }
    }
</style>