<template>
  <div>
    <b-button @click="modalShow = !modalShow">Login form</b-button>
    <b-modal v-model="modalShow">
      <b-form v-on:submit.prevent>
        <b-row>
          <b-col lg="5">Id:</b-col>
          <b-col lg="7">
        <b-form-input  type="number" id="range-1" min="0" v-model="newElement.id"/>
        </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Name:</b-col>
          <b-col lg="7">
            <b-form-input type="text" v-model="newElement.name"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Email:</b-col>
          <b-col lg="7">
            <b-form-input type="email" v-model="newElement.email"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Password:</b-col>
          <b-col lg="7">
            <b-form-input type="password" v-model="newElement.password"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Confirm-Password:</b-col>
          <b-col lg="7">
            <b-form-input type="password" v-model="newElement.confirmpassword"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">D.O.B:</b-col>
          <b-col lg="7">
            <b-form-input type="date" v-model="newElement.dob"/>
          </b-col>
        </b-row>
        <center>
          <input type="checkbox" v-model="newElement.checked">
          Terms and Condition
        </center>
        <center>
          <button type="button" class="btn btn-secondary" v-on:click="addUser">Submit</button>
        </center>
      </b-form>
    </b-modal>
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
        <tr v-for="(newElement,index) in sortedStore" v-bind:key="index">
          <td>{{newElement.id}}</td>
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
            <a href="#" v-on:click="editItem(newElement, index)" @click="modalShow = !modalShow">Edit</a>
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
      pageSize: 5,
      currentPage: 1,
      modalShow: false,
      newElement: {
        id:"",
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
    editItem(dataToEdit, index) {
      this.fixid = dataToEdit.id;
      this.newElement.name = dataToEdit.name;
      this.newElement.email = dataToEdit.email;
      this.newElement.dob = dataToEdit.dob;
      this.newElement.password = dataToEdit.password;
      this.newElement.confirmpassword = dataToEdit.confirmpassword;
      this.newElement.checked = dataToEdit.checked;
    },
    addUser: function() {
      if (this.newElement.id=="") {
        this.store.splice(this.dataToEdit,1,this.newElement);
         console.log(this.dataToEdit);
         this.newElement.id == this.fixid;
        this.newElement = {
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          dob: "",
          checked: ""
        };
      } else {
        this.store.push(this.newElement);
        this.newElement = {
          id:"",
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          dob: "",
          checked: ""
        };
      }
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