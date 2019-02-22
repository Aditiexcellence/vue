<template>
  <div>
    <ul>
      <li v-for="(items,index) in data" v-bind:item="items" v-bind:key="index">
        <span>{{items}}</span>
        <a href="#" v-on:click.prevent="deleteItem(index)">Delete</a>
        <a href="#" v-on:click.prevent="editItem(index)">Edit</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Lists",
  props: {
    msg: {
      type: String
    }
  },
  data: function() {
    return {
      data: []
    };
  },
  watch: {
    msg: function() {
      this.data.push(this.msg);
    }
  },
  methods: {
    deleteItem: function(index) {
      this.data.splice(index, 1);
    },
    editItem: function(index) {
      this.editIndex = index;
      this.msg = this.data[index];
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