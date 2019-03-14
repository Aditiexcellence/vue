<template>
<v-app>
    <v-content>
        <Todo />
    </v-content>
</v-app>
</template>

<script>
import Todo from './components/todo.vue'

export default {
    name: 'App',
    components: {
        Todo
    }
}
</script>
