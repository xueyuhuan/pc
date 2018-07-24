<template>
    <div class="card _theme_card">
        <header><slot name="header"></slot></header>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .card{
        background: #fff;
        margin-bottom: 20px;
        header{
            @include flex(space-between);
            height: auto;
            font-size: 18px;
            font-weight: 700;
            padding: 10px 20px;
            border-bottom: 1px dashed #bfbfbf;
        }
    }
</style>