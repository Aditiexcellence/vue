<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
      <li>Vestibulum auctor dapibus neque.</li>
    </ul>
    <p v-bind:style="{color: selected.color}">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <select v-model="selected">
      <option value>Select a user...</option>
      <option v-for="(col, index) in colors" v-bind:key="index" v-bind:value="{color: col}">{{col}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "First",
  props: {
    msg: String
  },
  data: function() {
    return {
      colors: ["black", "red", "blue", "yellow"],
      selected: ""
    };
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>