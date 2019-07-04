import Vue from "vue";
import VueRouter from "vue-router";
import register from "./components/Register.vue";
import login from "./components/Login.vue";
import "../../../../assets/tailwind.css";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/register",
            name: "register",
            component: register
        },
        {
            path: "/login",
            name: "login",
            component: login
        }
    ]
});
