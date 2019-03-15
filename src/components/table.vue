<template>
  <div>
    <Records @submit-item="submitItem" :editRow="editRow" :store="store" ref="modelShow"/>
    <table>
      <thead>
        <tr>
          <th>ID</th>
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
        <tr v-for="(value,index) in sortedStore" v-bind:key="index">
          <td>{{value.id}}</td>
          <td>{{value.name}}</td>
          <td>{{value.email}}</td>
          <td>{{value.password}}</td>
          <td>{{value.confirmpassword}}</td>
          <td>{{value.dob}}</td>
          <td>{{value.checked}}</td>
          <td>
            <a href="#" v-on:click="deleteItem(index)">Delete</a>
          </td>
          <td>
            <a href="#" v-on:click="editItem(value, index)">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="prevPage" v-if="canShowPrevious">Previous</button>
      <button @click="nextPage" v-if="canShowNext">Next</button>
    </p>
  </div>
</template>

<script>
import Records from "./record";
export default {
  name: "Tables",
  components: {
    Records
  },
  data: function() {
    return {
      store: [],
      visible: false,
      hidden: false,
      pageSize: 5,
      currentPage: 1,
      currentSort: "name",
      currentSortDir: "asc",
      editRow: {
        id: "",
        email: "",
        name: "",
        dob: "",
        password: "",
        confirmpassword: "",
        checked: ""
      },
      value: {
        id: "",
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
    submitItem(value) {
      this.store.push(value);
    },
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
    editItem(dataToEdit, index) {
      this.editRow.id = dataToEdit.id;
      this.editRow.name = dataToEdit.name;
      this.editRow.email = dataToEdit.email;
      this.editRow.password = dataToEdit.password;
      this.editRow.confirmpassword = dataToEdit.confirmpassword;
      this.editRow.dob = dataToEdit.dob;
      this.editRow.checked = dataToEdit.checked;
      this.editRow.index = index;
      this.$refs.modelShow.show();
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.store.length)
        this.currentPage++;
      this.canShowPrevious = true;
    },
    prevPage: function() {
      if (this.currentPage > 1) 
      this.currentPage--;
       this.canShowPrevious = false;
    }
  },
  computed: {
    sortedStore: function() {
      /* eslint-disable */
      return this.store
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) {
            return -1 * modifier;
          }
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          {
            return 0;
          }
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
          if (index > 4) {
            this.canShowNext = true;
          }
        });
    }
  }
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-collapse: collapse;
  margin: 20px auto;
}
</style>
