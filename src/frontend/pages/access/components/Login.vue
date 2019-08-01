<template>
    <div class="route">
        <div class="container">
            <div class="col-lg-5" id="login">
                <div class="icon">
                    <img
                        id="token-img"
                        src="../../../../../token.svg"
                        width="30"
                        height="30"
                        class="d-inline-block align-top"
                        alt
                    />
                </div>
                <form class="form-signin" id="login-form">
                    <div class="form-label-group">
                        <input
                            type="email"
                            id="inputEmail"
                            class="form-control"
                            placeholder="Email address"
                            required
                            autofocus
                            v-model="email"
                        />
                        <label for="email">Email address:</label>
                    </div>
                    <div class="form-label-group">
                        <input
                            type="password"
                            id="inputPassword"
                            class="form-control"
                            placeholder="Password"
                            required
                            v-model="password"
                        />
                        <label for="password">Password:</label>
                    </div>
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                        @click.prevent="register"
                    >Sign in</button>
                    <p>
                        Don't have an account?
                        <router-link class="router-link" to="/register">&nbsp;Sign up</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

button,
.btn {
    font-family: "Lato", sans-serif;
    background-color: #44689a !important;
    border-color: #44689a !important;
}
.col-sm {
    padding-right: 0;
    padding-left: 0;
}
#login {
    padding-top: 10px;
    height: 345px !important;
    border-radius: 0.25rem;
    background-image: linear-gradient(#44689a 0 19%, white 0 79%);
}

@media (min-width: 992px) {
    #login {
        max-height: 350px;
    }
}
.icon {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
}
img {
    margin-top: 5px;
    width: 45px;
    height: 45px;
}
.col-lg {
    flex: 0;
}
p {
    margin-top: 1rem !important;
    display: flex;
    justify-content: center;
    color: gray;
}
html,
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

.body {
    height: 100vh;
}

.body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
}

.form-signin {
    width: 100%;
    max-width: 420px;
    margin: auto;
    margin-top: 27px;
    background-color: transparent !important;
}

.form-label-group {
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
    height: 3.125rem;
    padding: 0.75rem;
}

.form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0; /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    pointer-events: none;
    cursor: text; /* Match the input under the label */
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
    color: transparent;
}

.form-label-group input:-ms-input-placeholder {
    color: transparent;
}

.form-label-group input::-ms-input-placeholder {
    color: transparent;
}

.form-label-group input::-moz-placeholder {
    color: transparent;
}

.form-label-group input::placeholder {
    color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
    padding-top: 1.25rem;
    padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 12px;
    color: #777;
}
.swal-text {
    font-family: "Lato", sans-serif;
}
</style>

<script lang="ts">
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import swal from "sweetalert";

@Component
export default class Login extends Vue {
    email: string = "";
    password: string = "";

    async register() {
        const config: AxiosRequestConfig = {
            url: "http://localhost:3000/auth/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                email: this.email,
                password: this.password
            })
        };

        let response: AxiosResponse;

        try {
            response = await axios(config);
        } catch (e) {
            return swal("Internal Server Error");
        }

        if (!response.data.success) {
            swal({
                text: response.data.message,
                icon: "error"
            });
        } else {
            window.location.href = "/main/home.html";
        }
    }
}
</script>
