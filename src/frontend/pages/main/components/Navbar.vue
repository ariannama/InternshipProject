<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <a class="navbar-brand">
            <img
                src="../../../../../token.svg"
                width="35"
                height="35"
                class="d-inline-block align-top"
                alt
            />
            NakedToken
        </a>
        <form class="form-inline">
            <button
                class="btn btn-primary"
                type="button"
                id="logout-button"
                @click="logout"
            >{{textLogOut}}</button>
        </form>
    </nav>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

.nav-link,
.nav-item,
.navbar-nav {
    font-family: "Lato", sans-serif;
}
img {
    height: 30px;
}
.navbar-brand {
    font-size: 1.7rem;
    color: lightgray !important;
}
.btn-primary {
    background-color: #44689a;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import swal from "sweetalert";

@Component
export default class Navbar extends Vue {
    textLogOut = "Log out";

    async logout() {
        let config: AxiosRequestConfig = {
            url: "http://localhost:3000/auth/logout",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let response: AxiosResponse | undefined;

        try {
            response = await axios(config);
        } catch (e) {
            console.log(e);
            return "ok";
        }
        if (!response) {
            debugger;
        }
        window.location.replace("http://localhost:3000/access/auth.html");
        // await swal({
        //     text: "Are you sure you want to log out?",
        //     icon: "warning",
        //     buttons: {
        //         cancel: true,
        //         confirm: {
        //             text: "OK",
        //             value: true,
        //             closeModal: true
        //         }
        //     }
        // });
    }
}
</script>

