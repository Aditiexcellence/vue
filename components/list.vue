<template>
  <div>
    <Texts
      v-bind:edit-index="editIndex"
      v-bind:name="name"
      v-on:edit-item="edit"
      v-on:submit-item="submit"
    />
    <ul>
      <li v-for="(item,index) in data" v-bind:key="index">
        <span>{{item}}</span>
        <a href="#" v-on:click.prevent="deleteItem(index)">Delete</a>
        <a href="#" v-on:click.prevent="editItem(index,item)">Edit</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import Texts from "./text";
export default {
  name: "Lists",
  components: {
    Texts
  },
  data: function() {
    return {
      data: [],
      name: "",
      editIndex: -1
    };
  },
  methods: {
    submit: function(name) {
      this.data.push(name);
      this.name = "";
    },
    edit: function(obj) {
      var { name, editIndex, item } = obj;
      Vue.set(this.data, editIndex, name);
      this.name = "";
      this.editIndex = -1;
    },
    deleteItem: function(index) {
      this.data.splice(index, 1);
    },
    editItem: function(index) {
      this.editIndex = index;
      this.name = this.data[index];
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
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
}
</style>