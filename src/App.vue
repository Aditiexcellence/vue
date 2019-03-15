<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Tables/>
  </div>
</template>

<script>
import Tables from "./components/table.vue";
export default {
  name: "app",
  components: {
    Tables
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
}
</style>