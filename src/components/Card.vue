<template>
    <div class="card" :class="skinCard">
        <header :class="skinCardFont"><slot name="header"></slot></header>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        computed:{
            skinCard(){
                return this.$store.state.skinCard;
            },
            skinCardFont(){
                return this.$store.state.skinCardFont;
            }
        }
    }
</script>

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