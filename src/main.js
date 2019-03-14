import Vue from 'vue'
<<<<<<< HEAD
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

=======
import App from './App.vue'
import Vuelidate from "vuelidate"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue)
Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.use(Vuelidate);
>>>>>>> 082ca3b28ef25a0cdb18cc84195ed5398d1d4638
new Vue({
  render: h => h(App),
}).$mount('#app')
