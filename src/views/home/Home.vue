<template>
  <div class="home">
    <card>
      <header slot="header">xx<i class="fa fa-tv"></i> </header>
    </card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "../../components/card";

export default {
  name: "home",
  components: {
    Card,
    HelloWorld
  }
};
</script>
