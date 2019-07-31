<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-item nav-link navbar-brand" id="NakedToken">
                        <img
                            id="token-img"
                            src="../../../../../token.svg"
                            width="30"
                            height="30"
                            class="d-inline-block align-top"
                            alt
                        />
                        NakedToken
                    </a>
                </li>
                <div class="links">
                    <li class="nav-item">
                        <a id="logout-button" class="btn btn-primary" @click="logout">{{textLogOut}}</a>
                    </li>
                </div>
            </ul>
        </div>
    </nav>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

.navbar.navbar-expand-lg.navbar-dark.bg-dark {
    height: 8vh !important;
}
.navbar-nav,
.mr-auto {
    flex: 1;
    margin: auto !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-link,
.nav-item,
.navbar-nav {
    font-family: "Lato", sans-serif;
}
#NakedToken {
    font-size: 1.7rem;
}
#token-img {
    height: 40px;
    width: 40px;
}
.links {
    display: flex;
    justify-content: flex-end;
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

