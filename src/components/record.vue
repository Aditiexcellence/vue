<template>
  <div>
    <b-button @click="modalShow=!modalShow">Login form</b-button>
    <b-modal v-model="modalShow" hide-footer hide-header ref="myModalRef">
      <b-form @submit.prevent>
        <b-row>
          <b-col lg="5">Id:</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.id"/>
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
            <b-form-input
              type="email"
              v-model="newElement.email"
              class="['input-group', isEmailValid()]"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Password:</b-col>
          <b-col lg="7">
            <b-form-input
              v-validate="'required'"
              name="password"
              type="password"
              class="form-control"
              v-model="newElement.password"
              ref="password"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Confirm-Password:</b-col>
          <b-col lg="7">
            <b-form-input
              v-validate="'required|confirmed:password'"
              name="confirm-password"
              type="password"
              class="form-control"
              v-model="newElement.confirmpassword"
              data-vv-as="password"
            />
            {{errors.first('confirm-password')}}
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
          <button type="button" v-on:click="addUser" @click="hideModal">submit</button>
        </center>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Records",
  data: function() {
    return {
      modalShow: false,
      newElement: {
        id: "",
        email: "",
        name: "",
        dob: "",
        password: "",
        confirmpassword: "",
        checked: ""
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },
  props: {
    editRow: {
      type: Object,
      required: true
    },
    store: {
      type: Array
    }
  },
  methods: {
    isEmailValid: function() {
      return this.newElement.email == ""
        ? ""
        : this.reg.test(this.newElement.email)
        ? "has-success"
        : "has-error";
    },
    show() {
      this.modalShow = true;
      var row = this.$props.editRow;
      this.newElement.id = row.id;
      this.newElement.name = row.name;
      this.newElement.email = row.email;
      this.newElement.password = row.password;
      this.newElement.confirmpassword = row.confirmpassword;
      this.newElement.dob = row.dob;
      this.newElement.checked = row.checked;
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    addUser: function() {
      if (this.$props.store.length) {
        for (var i in this.$props.store) {
          if (this.store[i].id == this.newElement.id) {
            this.store[i].name = this.newElement.name;
            this.store[i].email = this.newElement.email;
            this.store[i].password = this.newElement.password;
            this.store[i].confirmpassword = this.newElement.confirmpassword;
            this.store[i].dob = this.newElement.dob;
            this.store[i].checked = this.newElement.checked;
            this.newElement = {
              id: "",
              name: "",
              email: "",
              password: "",
              confirmpass: "",
              dob: "",
              checked: ""
            };
          } else {
            this.$emit("submit-item", this.newElement);
            this.newElement = {
              id: "",
              name: "",
              email: "",
              password: "",
              confirmpassword: "",
              dob: "",
              checked: ""
            };
          }
        }
      } else {
        this.$emit("submit-item", this.newElement);
        this.newElement = {
          id: "",
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          dob: "",
          checked: ""
        };
      }
    }
  }
};
</script>

<style>
</style>
