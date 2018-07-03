<template>
    <div class="card">
        <slot name="header"></slot>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .card{
        background: #fff;
        border-top: 3px solid $skin-card;
        margin-bottom: 20px;
        header{
            @include flex(space-between);
            height: 46px;
            font-size: 18px;
            font-weight: 700;
            color: $skin-card;
            padding: 0 20px;
            border-bottom: 1px dashed #bfbfbf;
        }
    }
</style>