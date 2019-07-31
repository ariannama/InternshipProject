<template>
    <div id="app">
        <!-- <div class="container">
            <div class="row">
                <div class="col-sm">
                    <router-link class="router-link" to="/register">Create an account</router-link>
                </div>
                <div class="col-sm">
                    <router-link class="router-link" to="/login">Log into your account</router-link>
                </div>
            </div>
        </div>-->
        <router-view />
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
}
body {
    background-image: linear-gradient(135deg, #093554, #058ed8, #fef0d6);
}
.route {
    display: flex !important;
    width: 100%;
    height: 100%;
}
.container {
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex !important;
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
    color: #058ed8;
    font-family: "Lato", sans-serif;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Auth extends Vue {}
</script>