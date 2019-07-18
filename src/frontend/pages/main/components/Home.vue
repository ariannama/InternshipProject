<template>
    <div>
        <h1>Here is the information about your access token:</h1>
        <div>{{cred}}</div>
        
    </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMe } from "../../../../interfaces/IMe";

@Component
export default class Home extends Vue {
    cred: string = "";

    async mounted() {
        let config: AxiosRequestConfig = {
            url: "http://localhost:3000/home/home",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let response: AxiosResponse<IMe>;

        try {
            response = await axios(config);
        } catch (e) {
            return (this.cred = "Failed to fetch");
        }


        this.cred = response.data.credentials_id;
    }
}
</script>