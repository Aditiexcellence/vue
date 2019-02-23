<template>
  <div id="submitForm">
    <p>Type something</p>
    <p>Press Enter</p>
    <form v-on:submit.prevent>
      <input v-on:keyup.enter="submit" type="text" v-model="listdescription">
    </form>
  </div>
</template>

<script>
export default {
  name: "Texts",
  data: function() {
    return {
      listdescription: ""
    };
  },
  watch: {
    name: function(newName) {
      this.listdescription = newName;
    }
  },
  props: {
    name: {
      type: String,
      require: true
    },
    editIndex: {
      type: Number,
      require: true
    }
  },
  methods: {
    submit: function(e) {
      if (e.keyCode === 13) {
        if (this.editIndex !== -1) {
          this.$emit("edit-item", {
            name: this.listdescription,
            editIndex: this.editIndex
          });
        } else {
          this.$emit("submit-item", this.listdescription);
        }
        this.listdescription = "";
      }
    }
  }
};
</script>

<style>
</style>
