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
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-flex xs12>
          <v-text-field
            clearable
            color="white"
            v-model="newTodo"
            id="newTodo"
            name="newTodo"
            label="Add task"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs5>
            <v-menu
              v-model="datemenu"
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
                  :rules="[rules.required]"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="datemenu = false" :min="minDate"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs5>
            <v-menu
              ref="menu1"
              v-model="timemenu"
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
                  :rules="[rules.required]"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timemenu"
                v-model="time"
                full-width
                @click:minute="$refs.menu1.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-btn v-on:click="addTodo">Add Todo</v-btn>
      </v-form>
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
      date: null,
      menu: false,
      datemenu: false,
      time: null,
      timemenu: false,
      valid: true,
      canShowid: true,
      rules: {
        required: value => !!value || "Required."
      },
      newItem: {
        done: false,
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
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        if (this.index != undefined) {
          this.editedItem = {
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
            time: this.time
          };
          this.$emit("submit-item", this.newItem);
          this.blankAllFields();
        }
      }
    },
    blankAllFields() {
      this.newTodo = "";
      this.date = "";
      this.time = "";
      this.index = undefined;
      this.$refs.form.resetValidation();
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
