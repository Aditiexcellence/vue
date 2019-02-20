<template>
  <div>
    <div :class="{red: isRed}">{{name}}</div>
    {{date}}
    <div>
      <input type="text" v-model="name">
      <button v-on:click="clear">Clear</button>
      <button v-on:click="capital">Capital</button>
    </div>
    <input :checked="isRed" v-model="isRed" type="checkbox" v-on:click="red"> Red
  </div>
</template>
<script>
export default {
  name: "Display",
  data: function() {
    return {
      name: "Aditi",
      date: false,
      isRed: false
    };
  },
  created: function() {
    // eslint-disable-next-line
    console.log("created");
    this.date = new Date();
  },
  mounted: function() {
    // eslint-disable-next-line
    console.log("mounted");
    this.date = new Date();
  },
  updated: function() {
    // eslint-disable-next-line
    console.log("updated");
  },
  destroyed: function() {
    // eslint-disable-next-line
    console.log("destroyed");
    this.date = new Date();
  },
  methods: {
    clear: function() {
      this.name = "";
    },
    capital: function() {
      this.name = this.name.toUpperCase();
    },
    red: function() {
      // eslint-disable-next-line
      console.log(this.isRed);
    }
  }
};
</script>
<style scoped >
.red {
  color: #ee1e1e;
}
</style>