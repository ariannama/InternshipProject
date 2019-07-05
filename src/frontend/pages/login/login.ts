import Vue from 'vue';
import router from "./vuerouter";
import App from "./Auth.vue";
import '../../../../assets/tailwind.css';


new Vue({
  render: h => h(App),
  router
}).$mount("#app");