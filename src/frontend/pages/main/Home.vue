<template>
    <div class="Home">
        <div class="Navbar">
            <Navbar></Navbar>
            <div class="Table">
                <Table
                    v-bind:credentials_id="credentials_id"
                    v-bind:provider_name="provider_name"
                    v-bind:consent_status="consent_status"
                    v-bind:consent_status_created_at="consent_status_created_at"
                    v-bind:consent_status_expires_at="consent_status_expires_at"
                    v-bind:provider_icon="provider_logo"
                />
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
.Table {
    position: absolute;
    bottom: 0;
    top: 8vh;
    width: 100%;
    display: flex;
    justify-content: center;
}
.btn-primary {
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
import { ICreds } from "../../../interfaces/ICreds";
import Table from "./components/Table.vue";
import Navbar from "./components/Navbar.vue";
import swal from "sweetalert";
import Truelayer from "../../../app/services/truelayer";

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
    rowData: [] = [];

    async mounted() {
        let config: AxiosRequestConfig = {
            url: "http://localhost:3000/home/home",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let response: AxiosResponse<ICreds[]>;

        try {
            response = await axios(config);
        } catch (e) {
            return swal("Failed to fetch!");
        }
        // if (!response.data.results) {
        //     window.location.replace("http://localhost:3000/access/auth.html");
        // }
        console.log(response);
        const tokens = response.data;
        console.log(tokens);

        for (const token of tokens) {
            const access_token = token.access_token;
            const me = await Truelayer.meEndpoint(access_token);
            console.log(me);
            if(!me){
                return "fail";
            }

            this.credentials_id = me.credentials_id;
            this.consent_status = me.consent_status;
            this.consent_status_created_at = me.consent_created_at;
            this.consent_status_expires_at = me.consent_expires_at;
            const provider: Provider = me.provider;
            this.provider_name = provider.display_name;
            this.provider_logo = provider.logo_uri;
            //add table row
        }
    }
}
</script>