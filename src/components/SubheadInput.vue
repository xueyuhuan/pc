<template>
    <div class="subhead-input">
        <slot name="input"></slot>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .subhead-input{
        height: 30px;
        input{
            background: #069;
            width: 160px;
            height: 100%;
            font-size: 12px;
            padding: 5px 15px;
            border-radius: 30px 0 0 30px;
            border: none;
        }
        button{
            background: #069;
            height: 100%;
            font-size: 12px;
            padding: 5px 10px;
            border-radius: 0 30px 30px 0;
            border: none;
            i{
                color: #1295d8;
            }
        }
    }
</style>