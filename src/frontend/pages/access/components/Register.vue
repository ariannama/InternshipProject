<template>
    <div class="route">
        <div class="container">
            <div class="col-lg-5" id="register">
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
                <form class="form-signin">
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
                        <label for="email">Enter your e-mail address:</label>
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
                        <label for="password">Enter your password (at least 6 characters):</label>
                    </div>
                    <div class="form-label-group">
                        <input
                            type="password"
                            id="inputPassword"
                            class="form-control"
                            placeholder="Password"
                            required
                            v-model="password2"
                        />
                        <label for="password">Confirm your password:</label>
                    </div>
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                        @click.prevent="register"
                    >Register</button>
                    <p>
                        Already have an account?
                        <router-link class="router-link" to="/login">&nbsp;Sign in</router-link>
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
#register {
    margin-left: auto !important;
    margin-right: auto !important;
    height: 410px !important;
    border-radius: 0.25rem;
    background-image: linear-gradient(#44689a 0 15%, white 0 85%);
    padding-top: 10px;
}
.icon {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
}
@media (min-width: 992px) {
    #register {
        min-height: 425px;
    }
}
img {
    margin-top: 5px;
    width: 45px;
    height: 45px;
}
.swal-text {
    font-family: "Lato", sans-serif;
}
</style>


<script lang="ts">
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Vue, Component } from "vue-property-decorator";
import swal from "sweetalert";

@Component
export default class Register extends Vue {
    email: string = "";
    password: string = "";
    password2: string = "";

    async register() {
        const config: AxiosRequestConfig = {
            url: "http://localhost:3000/auth/register",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                email: this.email,
                password: this.password,
                password2: this.password2
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
            await swal({
                text: response.data.message,
                icon: "success",
                buttons: [false],
                timer: 1000
            });
            window.location.href =
                "https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=1535304510&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/callback/callback&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false";
        }
    }
}
</script>
