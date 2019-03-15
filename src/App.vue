<template>
<v-app>
    <v-content>
        <Todotable />
    </v-content>
</v-app>
</template>

<script>
import Todotable from './components/todotable.vue'

export default {
    name: 'App',
    components: {
        Todotable
    }
}
</script>
