<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Display/>
  </div>
</template>

<script>
import Display from "./components/form.vue";

export default {
  name: "app",
  components: {
    Display
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
