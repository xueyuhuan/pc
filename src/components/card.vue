<template>
    <div class="card">
        <header><slot name="header"></slot></header>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "card"
  }
</script>

<style scoped lang="scss">
    .card{
        background: #fff;
        border-top: 3px solid $skin;
        margin-bottom: 20px;
        header{
            font-size: 18px;
            font-weight: 700;
            padding: 10px 20px;
            border-bottom: 1px dashed #bfbfbf;
        }
    }
</style>