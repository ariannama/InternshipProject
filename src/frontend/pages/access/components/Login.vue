<template>
    <div class="flex h-full w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">E-mail</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="email"
                    placeholder="E-mail"
                    v-model="email"
                />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                />
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    @click.prevent="register"
                >Sign In</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Vue from "vue";
import Component from "vue-class-component";

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
