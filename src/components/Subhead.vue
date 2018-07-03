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
        .content{
            @include flex(space-between);
            width: 1200px;
            margin: 0 auto;
            height: 42px;
            color: #fff;
        }
    }
</style>