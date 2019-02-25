<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Lists/>
  </div>
</template>

<script>
import Lists from "./components/list.vue";
export default {
  name: "app",
  components: {
    Lists
  },
  data: function() {
    return {
      childData: ""
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData = variable;
    }
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
  margin-top: 60px;
}
</style>
