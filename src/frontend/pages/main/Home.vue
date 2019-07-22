<template>
    <div>
        <h1>Here is the information about your access token:</h1>
        <div>
            <Table
                v-bind:credentials_id="credentials_id"
                v-bind:consent_status="consent_status"
                v-bind:consent_status_created_at="consent_status_created_at"
                v-bind:consent_status_expires_at="consent_status_expires_at"
                v-bind:provider_name="provider_name"
            />
        </div>
        <div>
            <img v-bind:src="provider_logo" alt />
        </div>
        <button @click="logout" type="submit">{{textLogOut}}</button>
        <button @click="refresh" type="submit">{{textRefresh}}</button>
        <button @click="validate" type="submit">{{textValidate}}</button>
        <button @click="renew" type="submit">{{textAdd}}</button>
    </div>
</template>

<style>
img {
    max-width: 3pc;
    height: auto;
}
body{
    color: #576d8e;
}
</style>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMe, Provider } from "../../../interfaces/IMe";
import Table from "./components/Table.vue";

@Component({
    components: {
        Table: Table
    }
})
export default class Home extends Vue {
    credentials_id: string = "";
    consent_status: string = "";
    consent_status_created_at: string = "";
    consent_status_expires_at: string = "";
    provider_name: string = "";
    provider_logo: string = "";
    textLogOut = "Log out";
    textRefresh = "Refresh Token";
    textValidate = "Validate Token";
    textAdd = "Access different token/Renew consent";

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
            return (this.credentials_id = "Failed to fetch");
        }
        if (response.data.credentials_id === undefined) {
            alert("Please, log in");
            window.location.replace("http://localhost:3000/access/auth.html");
        }

        this.credentials_id = response.data.credentials_id;
        this.consent_status = response.data.consent_status;
        this.consent_status_created_at = response.data.consent_created_at;
        this.consent_status_expires_at = response.data.consent_expires_at;
        const provider: Provider = response.data.provider;
        this.provider_name = provider.display_name;
        this.provider_logo = provider.logo_uri;
    }

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
            debugger
        }
        window.location.replace("http://localhost:3000/access/auth.html"); 
    }

    async refresh() {
        let config: AxiosRequestConfig = {
            url: "http://localhost:3000/home/refresh",
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
            return alert("Internal Server Error");
        }

        if(response.data.success){
            alert("Token refreshed succesfully");
        } 
        else{
            alert("Something went wrong");
        }
    }

    async validate(){
        let config: AxiosRequestConfig = {
            url: "http://localhost:3000/home/validate",
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
            return alert("Internal Server Error");
        }

        if(response.data.success){
            alert("Your token is valid");
        } 
        else{
            alert("Invalid Token");
        }
    }

    async renew(){
        window.location.assign("https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=1535304510&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/callback/callback&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false")
    }
}
</script>