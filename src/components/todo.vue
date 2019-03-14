<template>
  <div>
    <v-container>
      <v-layout text-xs-center wrap>
        <v-flex xs12 sm8 offset-sm2>
          <v-card dark>
            <v-toolbar color="blue">
              <v-toolbar-title class="headline white--text">Todo App</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container>
              <p class="text-xs-right">
                <b>{{todolist.length}}</b> Tasks
              </p>
              <v-text-field clearable color="white" v-model="id" id="id" name="id" label="id"></v-text-field>
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
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
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
            <v-data-table
              :headers="headers"
              :items="todolist"
              class="elevation-1"
              hide-actions
              v-if="canShowtable"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox class="nes-checkbox" v-model="props.item.done"></v-checkbox>
                </td>
                <td class="complete" v-if="props.item.done">{{props.item.id}}</td>
                <td v-else>{{props.item.id}}</td>
                <td class="complete" v-if="props.item.done">{{ props.item.msg }}</td>
                <td v-else>{{props.item.msg}}</td>
                <td class="complete" v-if="props.item.done">{{ props.item.date }}</td>
                <td v-else>{{props.item.date}}</td>
                <td class="complete" v-if="props.item.done">{{ props.item.time }}</td>
                <td v-else>{{props.item.time}}</td>
                <td class="complete" v-if="props.item.done">
                  <v-btn icon class="mx-0" @click="editItem(props.item,props.index)">
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                </td>
                <td v-else>
                  <v-btn icon class="mx-0" @click="editItem(props.item,props.index)">
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn icon class="mx-0" v-on:click="removeTodo(props.index)">
                    <v-icon color="red">close</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTodo: "",
      id: "",
      date: null,
      menu: false,
      modal: false,
      menu2: false,
      time: null,
      menu3: false,
      modal1: false,
      modal2: false,
      canShowtable: false,
      completetodo: true,
      headers: [
        {
          text: "Todo Done",
          sortable: false
        },
        {
          text: "ID",
          value: "id"
        },
        {
          text: "Message",
          sortable: false,
          value: "msg"
        },
        {
          text: "Date",
          sortable: false,
          value: "date"
        },
        {
          text: "Time",
          sortable: false,
          value: "time"
        }
      ],
      todolist: [],
      editedIndex: -1,
      editedItem: {
        done: false,
        id: "",
        msg: "",
        date: "",
        time: ""
      }
    };
  },

  methods: {
    addTodo() {
      this.canShowtable = true;
      if (this.editedItem.id == this.id) {
        this.neweditedItem = {
          id: this.id,
          msg: this.newTodo,
          date: this.date,
          time: this.time
        };
        this.todolist.splice(this.index, 1, this.neweditedItem);
        this.id = "";
        this.newTodo = "";
        this.date = "";
        this.time = "";
      } else {
        this.editedItem = {
          id: this.id,
          msg: this.newTodo,
          date: this.date,
          time: this.time
        };
        this.todolist.push(this.editedItem);
        this.id = "";
        this.newTodo = "";
        this.date = "";
        this.time = "";
      }
    },
    removeTodo(index) {
      this.todolist.splice(index, 1);
    },
    editItem(value, index) {
      this.id = value.id;
      this.newTodo = value.msg;
      this.date = value.date;
      this.time = value.time;
      this.index = this.index;
    }
  }
};
</script>

<style>
.complete {
  color: rgba(0, 0, 0, 0.3);
  text-decoration: line-through;
}
</style>
