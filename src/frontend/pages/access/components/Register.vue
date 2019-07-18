<template>
    <form>
        <label for="email">Enter your email:</label>
        <br />
        <input type="email" placeholder="E-mail" v-model="email" />
        <br />
        <label for="password2">Enter your password (must have at least 6 characters):</label>
        <br />
        <input type="password" placeholder="Password" v-model="password" />
        <br />
        <label for="password2">Confirm your password:</label>
        <br />
        <input type="password" placeholder="Confirm your password" v-model="password2" />
        <br />
        <button type="submit" @click.prevent="register">Submit</button>
    </form>
</template>

<script lang="ts">
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Vue, Component  } from "vue-property-decorator";

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
            window.location.href = "/home/home.html";
        }
    }
}
</script>