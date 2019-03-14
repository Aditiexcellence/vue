<template>
<<<<<<< HEAD
  <v-app>
 <v-content>
      <Todo/>
    </v-content>
  </v-app>
</template>

<script>
import Todo from './components/todo.vue'

export default {
  name: 'App',
  components: {
    Todo
  },
  data () {
    return {
      //
    }
  }
}
</script>
=======
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
>>>>>>> 082ca3b28ef25a0cdb18cc84195ed5398d1d4638
