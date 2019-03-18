<template>
  <div>
    <v-container>
      <v-layout text-xs-center wrap>
        <v-flex xs12 sm8 offset-sm2>
          <v-card dark>
            <Todoform @submit-item="submitItem" :todolist="todolist" :editRow="editRow"/>
            <v-data-table :headers="headers" :items="todolist" class="elevation-1" hide-actions>
              <template slot="items" slot-scope="lists">
                <td>
                  <v-checkbox class="nes-checkbox" v-model="lists.item.done"></v-checkbox>
                </td>
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
import Todoform from "./todoform.vue";
export default {
  name: "Todotable",
  components: {
    Todoform
  },
  data() {
    return {
      date: null,
      menu: false,
      time: null,
      canShowedit: false,
      canShowid: true,
      completetodo: true,
      editRow: {
        newTodo: "",
        date: "",
        time: "",
        edit: false
      },
      headers: [
        {
          text: "Todo Done",
          sortable: false
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
        },
        {
          text: "Edit",
          sortable: false
        },
        {
          text: "Delete",
          sortable: false
        }
      ],
      todolist: [],
      editedIndex: -1
    };
  },
  methods: {
    submitItem(value) {
      this.todolist.push(value);
      this.todolist.reverse();
    },
    removeTodo(index) {
      this.todolist.splice(index, 1);
      this.blankAllFields();
    },
     blankAllFields() {
       this.editRow= {
        newTodo: "",
        date : "",
        time: "",
      },
      this.index = undefined;
    },
    editItem(value, index) {
      this.editRow.newTodo = value.msg;
      this.editRow.date = value.date;
      this.editRow.time = value.time;
      this.editRow.index = index;
      this.editRow.edit = true;
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
