<template>
    <div class="Home">
        <Navbar></Navbar>
        <div class="container">
            <div id="icon">
                <div class="row">
                    <img id="provider-img" v-bind:src="provider_logo" alt />
                </div>
            </div>
            <div class="token-table">
                <div class="row">
                    <Table
                        v-bind:credentials_id="credentials_id"
                        v-bind:consent_status="consent_status"
                        v-bind:consent_status_created_at="consent_status_created_at"
                        v-bind:consent_status_expires_at="consent_status_expires_at"
                        v-bind:provider_name="provider_name"
                    />
                </div>
            </div>
            <div class="button-container">
                <div class="row">
                    <div class="col-sm">
                        <button
                            @click="refresh"
                            type="button"
                            class="btn btn-primary btn-lg"
                        >{{textRefresh}}</button>
                    </div>
                    <div class="col-sm">
                        <button
                            @click="validate"
                            type="button"
                            class="btn btn-primary btn-lg"
                        >{{textValidate}}</button>
                    </div>
                    <div class="col-sm">
                        <button
                            @click="renew"
                            type="button"
                            class="btn btn-primary btn-lg"
                        >{{textAdd}}</button>
                    </div>
                </div>
            </div>
        </div>
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
    background-color: #f6f7f9 !important;
}
h2 {
    font-family: "Lato", sans-serif;
    color: seashell;
    display: flex;
    justify-content: center;
    height: 11vh;
    padding-top: 30px;
}
#provider-img {
    max-width: 3pc;
}
#icon {
    display: flex;
    justify-content: center;
    height: 10vh;
}
table {
    background-color: #fff;
    font-family: "Courier New";
}
.token-table {
    height: 45vh;
}
.button-container {
    height: 23vh;
}
.btn-primary {
    background-color: #f7ab1b !important;
    border: none !important;
    font-family: "Lato", sans-serif;
}
.col-sm {
    display: flex;
    justify-content: center;
}
.swal-text,
.swal-title,
.swal-button {
    font-family: "Lato", sans-serif;
}
</style>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMe, Provider } from "../../../interfaces/IMe";
import { Token } from "../../../app/entity/Token";
import Table from "./components/Table.vue";
import Navbar from "./components/Navbar.vue";
import swal from "sweetalert";

@Component({
    components: {
        Table: Table,
        Navbar: Navbar
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
    textAdd = "Add Token";

    async mounted() {
        let config: AxiosRequestConfig = {
            url: "http://localhost:3000/home/home",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        // let response: AxiosResponse<Token[]>;
        let response: AxiosResponse<IMe>;

        try {
            response = await axios(config);
        } catch (e) {
            return (this.credentials_id = "Failed to fetch");
        }
        if (response.data.credentials_id === undefined) {
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
            return swal(
                "Internal Server Error",
                "Please, try again later",
                "error"
            );
        }

        if (response.data.success) {
            swal(
                "Done!",
                "Your access token has been successfully refreshed",
                "success"
            );
        } else {
            swal(
                "Something went wrong",
                "We could not refresh your token - please, try again later",
                "error"
            );
        }
    }

    async validate() {
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
            return swal(
                "Internal Server Error",
                "Please, try again later",
                "error"
            );
        }

        if (response.data.success) {
            swal("Done!", "Your token is valid", "success");
        } else {
            swal(
                "Something went wrong",
                "Your token seems to not be valid - please, try entering a new token",
                "error"
            );
        }
    }

    async renew() {
        window.location.assign(
            "https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=1535304510&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/callback/callback&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false"
        );
    }
}
</script>