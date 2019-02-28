import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.use(Vuelidate);
new Vue({
  render: h => h(App),
}).$mount('#app')
