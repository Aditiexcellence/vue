<template>
  <div>
    <form v-on:submit.prevent>
      <div>
        Name:
        <input type="text" v-model="newElement.name">
      </div>
      <div>
        Email:
        <input type="email" v-model="newElement.email">
      </div>
      <div>
        Password:
        <input type="password" v-model="newElement.password">
      </div>
      <div>
        Confirm-Password:
        <input type="password" v-model="newElement.confirmpassword">
      </div>
      <div>
        D.O.B:
        <input type="date" v-model="newElement.dob">
      </div>
      <input type="checkbox" v-model="newElement.checked">Terms and Condition
      <center>
        <button type="button" class="btn btn-secondary" v-on:click="addUser">Submit</button>
      </center>
    </form>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Confirm-Password</th>
          <th @click="sort('dob')">D.O.B</th>
          <th>Terms and Condition</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(newElement,index) in sortedStore" v-bind:key="index">
          <td>{{newElement.name}}</td>
          <td>{{newElement.email}}</td>
          <td>{{newElement.password}}</td>
          <td>{{newElement.confirmpassword}}</td>
          <td>{{newElement.dob}}</td>
          <td>{{newElement.checked}}</td>
          <td>
            <a href="#" v-on:click="deleteItem(index)">Delete</a>
          </td>
          <td>
            <a href="#" v-on:click="editItem(newElement)">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Display",
  data: function() {
    return {
      store: [],
      currentSort: "name",
      currentSortDir: "asc",
      editIndex: false,
      pageSize: 5,
      currentPage: 1,
      newElement: {
        email: "",
        name: "",
        dob: "",
        password: "",
        confirmpassword: "",
        checked: ""
      }
    };
  },
  methods: {
    deleteItem: function(index) {
      this.store.splice(index, 1);
      this.newElement = "";
    },
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    editItem(newElement) {
      this.newElement = newElement;
    },
    addUser: function() {
      this.store.push(this.newElement);
      this.newElement = {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        dob: "",
        checked: ""
      };
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.store.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    sortedStore: function() {
      /* eslint-disable */
      return this.store
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    }
  }
};
</script>

<style>
div {
  margin: 22px;
}

table,th,td {
  border: 1px solid black;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-collapse: collapse;
  margin: 20px auto;
}
</style>