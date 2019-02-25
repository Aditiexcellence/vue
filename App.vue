<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Counter/>
  </div>
</template>

<script>
import Counter from './components/counter.vue'

export default {
  name: 'app',
  components: {
    Counter
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

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
