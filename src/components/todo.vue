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
              <v-text-field
                clearable
                type="number"
                min="0"
                color="white"
                v-model="id"
                id="id"
                name="id"
                label="id"
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
            <v-data-table
              :headers="headers"
              :items="todolist"
              class="elevation-1"
              hide-actions
              v-if="canShowtable"
            >
              <template slot="items" slot-scope="lists">
                <td>
                  <v-checkbox class="nes-checkbox" v-model="lists.item.done"></v-checkbox>
                </td>
                <td class="complete" v-if="lists.item.done">{{lists.item.id}}</td>
                <td v-else>{{lists.item.id}}</td>
                <td class="complete" v-if="lists.item.done">{{ lists.item.msg }}</td>
                <td v-else>{{lists.item.msg}}</td>
                <td class="complete" v-if="lists.item.done">{{ lists.item.date }}</td>
                <td v-else>{{lists.item.date}}</td>
                <td class="complete" v-if="lists.item.done">{{ lists.item.time }}</td>
                <td v-else>{{lists.item.time}}</td>
                <td class="complete" v-if="lists.item.done">
                  <v-btn
                    icon
                    class="mx-0"
                    @click="editItem(lists.item,lists.index)"
                    v-if="canShowedit"
                  >
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                </td>
                <td v-else>
                  <v-btn icon class="mx-0" @click="editItem(lists.item,lists.index)">
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn icon class="mx-0" v-on:click="removeTodo(lists.index)">
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
      canShowedit: false,
      canShowid: true,
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
      newItem: {
        done: false,
        id: "",
        msg: "",
        date: "",
        time: ""
      }
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      // const dd = today.getUTCDate();
      return this.formatDate(today);
    }
  },
  methods: {
    addTodo() {
      this.canShowtable = true;
      if (this.newItem.id == this.id) {
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
          id: this.id,
          msg: this.newTodo,
          date: this.date,
          time: this.time
        };
        this.todolist.push(this.newItem);
        this.blankAllFields();
      }
    },
    removeTodo(index) {
      this.todolist.splice(index, 1);
    },
    blankAllFields() {
      this.id = "";
      this.newTodo = "";
      this.date = "";
      this.time = "";
    },
    editItem(value, index) {
      this.canShowid = false;
      this.id = value.id;
      this.newTodo = value.msg;
      this.date = value.date;
      this.time = value.time;
      this.index = index;
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
.complete {
  color: rgba(0, 0, 0, 0.3);
  text-decoration: line-through;
}
</style>
