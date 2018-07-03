<template>
  <div id="app">
    <navigation v-if="this.$route.path!=='/login'"></navigation>
    <router-view/>
  </div>
</template>

