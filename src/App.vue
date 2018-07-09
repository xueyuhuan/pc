<template>
  <div id="app">
    <navigation v-if="this.$route.path!=='/login'"></navigation>
    <keep-alive :exclude="exclude_name">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
    export default {
      data(){
          return{
              exclude_name:'NewsDetail'
          }
      }
    }
</script>