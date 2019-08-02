<template>
    <table class="table table-striped table-nonfluid">
        <thead>
            <div class="top">
                <caption>
                    <b>Your access tokens</b>
                </caption>
                <button type="button" class="btn btn-default btn-circle" @click="addToken">
                    <img id="plus-img" src="https://img.icons8.com/windows/32/000000/plus.png">
                </button>
            </div>
            <tr>
                <th scope="col">Provider</th>
                <th scope="col">Credentials ID</th>
                <th scope="col">Consent Status</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="provider-values">
                    <img id="provider-logo" :src="provider_icon" />
                    &emsp;{{provider_name}}
                </td>
                <td>{{credentials_id}}</td>
                <td>{{consent_status}}</td>
                <td id="consent-values">
                    <span class="category">
                        <b>CREATED AT</b>
                    </span>
                    &ensp;{{consent_status_created_at}}
                    <br />
                    <span class="category">
                        <b>EXPIRES AT</b>
                    </span>
                    &ensp;&ensp;{{consent_status_expires_at}}
                </td>
                <td class="buttons">
                    <button @click="refresh" type="button" class="btn btn-primary btn-sm">REFRESH</button>
                    &ensp;
                    <button
                        @click="validate"
                        type="button"
                        class="btn btn-primary btn-sm"
                    >VALIDATE</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

.table-nonfluid {
    width: auto !important;
    min-height: 300px;
    max-width: 100%;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.25rem;
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
}
#plus-img {
    margin-top: 3px;
}
.top {
    width: 675% !important;
    display: flex;
    justify-content: space-between;
}
.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
}
td {
    min-width: 150px;
}
#consent-values {
    min-width: 350px;
}
#provider-values {
    display: flex;
    padding-top: 22px;
    padding-left: 20px;
}
.category {
    font-size: 12px;
}
.buttons {
    display: flex;
    padding: 27px !important;
}
.btn-primary {
    background-color: #44689a !important    ;
}
th {
    min-width: 100px;
}
caption {
    padding: 15px;
    width: 1000%;
    color: #44689a;
}
.table th {
    border-top: none !important;
    border-bottom: none !important;
}
table {
    font-family: "Lato" sans-serif;
}
#provider-logo {
    width: 25px;
    height: 25px;
}
</style>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMe, Provider } from "../../../../interfaces/IMe";
import { Token } from "../../../../app/entity/Token";
import swal from "sweetalert";

@Component
export default class Table extends Vue {
    @Prop(String) credentials_id!: String;
    @Prop(String) consent_status!: String;
    @Prop(String) consent_status_created_at!: String;
    @Prop(String) consent_status_expires_at!: String;
    @Prop(String) provider_name!: String;
    @Prop(String) provider_icon!: String;

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

    addToken() {
        window.location.assign(
            "https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=1535304510&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/callback/callback&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false"
        );
    }
}
</script>

