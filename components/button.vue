<template>
  <div>
    <br>
    {{date}}
    <br>
    <input type="text" v-model="name">
    <button v-on:click="clear">Clear</button>
    <button v-on:click="capital">Capital</button>
  </div>
</template>
<script>
export default {
  name: "Display",
  data: () => {
    return {
      name: "Aditi"
    };
  },
  created: function() {
    console.log("created");
    this.date = new Date();
  },
  mounted: function() {
    console.log("mounted");
    this.date = new Date();
  },
  updated: function() {
    console.log("updated");
    this.date = new Date();
  },
  destroyed: function() {
    console.log("destroyed");
    this.date = new Date();
  },
  methods: {
    clear: function() {
      this.name = "";
    },
    capital: function() {
      this.name = this.name.toUpperCase();
    }
  }
};
</script>