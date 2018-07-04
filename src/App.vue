<template>
  <div id="app">
    <navigation v-if="this.$route.path!=='/login'"></navigation>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

