<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<<<<<<< HEAD
    <Counter/>
=======
    <Lists/>
>>>>>>> 96f5ce89699ce64f5468e4e29bdcecbf6f8c059a
  </div>
</template>

<script>
<<<<<<< HEAD
import Counter from './components/counter.vue'

export default {
  name: 'app',
  components: {
    Counter
  }
}
=======
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
>>>>>>> 96f5ce89699ce64f5468e4e29bdcecbf6f8c059a
</script>

<style>
#app {
<<<<<<< HEAD
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
=======
  font-family: "Avenir", Helvetica, Arial, sans-serif;
>>>>>>> 96f5ce89699ce64f5468e4e29bdcecbf6f8c059a
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
