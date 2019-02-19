<template>
  <div>
    <input type="text" v-model="name">
    <button v-on:click="clear">Clear</button>
    <button v-on:click="capital">Capital</button>
  </div>
</template>
<script>
export default {
  name: "display",
  data: () => {
    return {
      name: "Aditi"
    };
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