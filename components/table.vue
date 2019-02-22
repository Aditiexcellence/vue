<template>
  <div>
    <p>Type something</p>
    <p>Press Enter</p>
    <form v-on:submit.prevent>
      <input v-on:keyup.enter="submit" type="text" v-model="description">
    </form>
    <ul>
      <li v-for="(items,index) in data" v-bind:key="index">
        <span>{{items}}</span>
        <a href="#" v-on:click.prevent="deleteItem(index)">Delete</a>
        <a href="#" v-on:click.prevent="editItem(index)">Edit</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tables",
  data: function() {
    return {
      description: "",
      data: [],
      editIndex: false
    };
  },
  methods: {
    submit: function(e) {
      if (e.keyCode === 13) {
        if (this.editIndex || this.editIndex === 0) {
          this.data.splice(this.editIndex, 1, this.description);
          this.description = "";
        } else {
          this.data.push(this.description);
          this.description = "";
        }
      }
    },
    deleteItem: function(index) {
      this.data.splice(index, 1);
    },
    editItem: function(index) {
      this.editIndex = index;
      this.description = this.data[index];
    }
  }
};
</script>

<style>
li {
  border: 1px solid black;
  padding: 5px;
}
li a {
  float: right;
  padding: 5px;
}
</style>
