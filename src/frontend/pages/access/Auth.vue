<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <router-link class="router-link" to="/register">Create an account</router-link>
                </div>
                <div class="col-sm">
                    <router-link class="router-link" to="/login">Log into your account</router-link>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

body {
    background-image: linear-gradient(135deg, #093554, #058ed8, #fef0d6);
}
.container {
    height: 20vh;
    padding-top: 30px;
    margin-top: 30px;
}
.route {
    height: 20vh;
}
.col-sm {
    display: flex;
    justify-content: center;
}
.route,
html {
    font-family: "Lato", sans-serif;
    color: lightgray;
}
.router-link {
    color: white;
    font-family: "Lato", sans-serif;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Auth extends Vue {}
</script>