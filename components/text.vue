<template>
  <div>
    <p>Type something</p>
    <p>Press Enter</p>
    <input v-on:keyup.enter="submit" type="text" v-model="description">
  </div>
</template>

<script>
export default {
  name: "Texts",
  data: function() {
    return {
      description: ""
    };
  },
  methods: {
    submit: function() {
      this.$emit("inputData", this.description);
      this.description = "";
    }
  }
};
</script>

<style>
</style>