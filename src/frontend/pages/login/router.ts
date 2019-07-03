import Vue from 'vue';
import VueRouter from "vue-router";
import register from "./components/Register.vue";
import '../../../../assets/tailwind.css';

Vue.use(VueRouter);

// const useComponent = component => () =>
//   import(`./components/${component}.vue`);

export const routes = [
    {
        path: "/",
        name: 'register',
        component: register
    }
]