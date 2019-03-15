<template>
  <div>
    <v-toolbar color="blue">
      <v-toolbar-title class="headline white--text">Todo App</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container>
      <p class="text-xs-right">
        <b>{{todolist.length}}</b> Tasks
      </p>
      <v-text-field
        clearable
        type="number"
        min="1"
        color="white"
        v-model="id"
        id="id"
        name="id"
        label="id"
        mask="##"
        v-if="canShowid"
      ></v-text-field>
      <v-flex xs12>
        <v-text-field
          clearable
          color="white"
          v-model="newTodo"
          id="newTodo"
          name="newTodo"
          label="Add task"
        ></v-text-field>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs5>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Select Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false" :min="minDate"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs5>
          <v-menu
            ref="menu1"
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Select Time"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu3"
              v-model="time"
              full-width
              @click:minute="$refs.menu1.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-btn v-on:click="addTodo">Add Todo</v-btn>
    </v-container>
    <v-subheader class="subheading" v-if="todolist.length == 0">You have 0 Tasks, add some</v-subheader>
    <v-subheader class="subheading" v-else>Your Tasks</v-subheader>
    {{editIndexRow}}
  </div>
</template>

<script>
export default {
  name: "Todoform",
  data() {
    return {
      newTodo: "",
      id: 1,
      date: null,
      menu: false,
      modal: false,
      menu2: false,
      time: null,
      menu3: false,
      modal1: false,
      modal2: false,
      canShowid: true,
      newItem: {
        done: false,
        id: 0,
        msg: "",
        date: "",
        time: ""
      }
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      return this.formatDate(today);
    },
    editIndexRow() {
      if (this.editRow.edit == true) {
        this.canShowid = false;
      }
      this.newTodo = this.editRow.newTodo;
      this.id = this.editRow.id;
      this.date = this.editRow.date;
      this.time = this.editRow.time;
      this.index = this.editRow.index;
    }
  },
  props: {
    todolist: {
      type: Array
    },
    editRow: {
      type: Object,
      required: true
    }
  },
  methods: {
    addTodo() {
      console.log(this.id, "gtrgtr");
      console.log(this.todolist.length, "eergt");
      if (this.newItem.id == this.todolist.length) {
        this.editedItem = {
          id: this.id,
          msg: this.newTodo,
          date: this.date,
          time: this.time
        };
        this.todolist.splice(this.index, 1, this.editedItem);
        this.canShowid = true;
        this.blankAllFields();
      } else {
        this.newItem = {
          msg: this.newTodo,
          date: this.date,
          time: this.time,
          id: this.id,
        };
        this.$emit("submit-item", this.newItem);
        this.blankAllFields();
      }
      this.id = this.todolist.length + 1;
    },
    blankAllFields() {
      this.id = "";
      this.newTodo = "";
      this.date = "";
      this.time = "";
    },
    formatDate(date) {
      let month = `${date.getMonth() + 1}`;
      let day = `${date.getDate()}`;
      const year = date.getFullYear();
      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;
      return [year, month, day].join("-");
    }
  }
};
</script>

<style>
</style>
