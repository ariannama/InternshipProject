import Vue from "vue";
import App from "./Auth.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.devtools = true;
Vue.config.productionTip = true;

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/register",
            component: Register
        },
        {
            path: "/login",
            component: Login
        }
    ]
});

new Vue({
    el: "#app",
    router,
    render: (h) => h(App)
});
