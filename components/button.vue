<template>
  <div>
    <div :class="{red: isRed}">{{testing}}</div>
    {{date}}
    <div>
      <input type="text" v-model="name">
      <button v-on:click="clear">Clear</button>
      <button v-on:click="capital">Capital</button>
    </div>
    <input :checked="isRed" v-model="isRed" type="checkbox" v-on:click="red"> Red
    <p>Type something</p>
    <p>Press Enter</p>
    <form v-on:submit.prevent>
      <input v-on:keyup.enter="submit" type="text" v-model="description">
    </form>
    <ul>
      <li v-for="items in data" v-bind:key="items.id">{{items}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Display",
  data: function() {
    return {
      testing: "Hello",
      name: "Aditi",
      date: false,
      isRed: false,
      description: "",
      data: []
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
    },
    submit: function(e) {
      if (e.keyCode === 13) {
        this.data.push(this.description);
        this.names = "";
      }
    }
  }
};
</script>

<style scoped>
.red {
  color: #ee1e1e;
}

li {
  border: 1px solid black;
  padding: 5px;
}
</style>
