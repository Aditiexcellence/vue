<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/download.png">
    <first msg="Welcome"/>
  </div>
</template>

<script>
import first from './components/first.vue'

export default {
  name: 'app',
  components: {
    first
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
