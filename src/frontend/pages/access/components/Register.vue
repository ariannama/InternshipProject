<template>
    <div class="body">
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
            <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="register">Register</button>
        </form>
    </div>
</template>

<style>
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
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: auto;
}

.form-label-group {
    position: relative;
    margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
    height: 3.175rem;
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
</style>


<script lang="ts">
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Vue, Component } from "vue-property-decorator";

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
            return alert("Internal Server Error");
        }

        if (!response.data.success) {
            alert(response.data.message);
        } else {
            alert(response.data.message);
            window.location.href = "https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=1535304510&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/callback/callback&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false";
        }
    }
}
</script>
