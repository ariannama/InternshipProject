<template>
    <table class="table table-striped table-nonfluid">
        <thead>
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Credentials ID</td>
                <td>{{credentials_id}}</td>
            </tr>
            <tr>
                <td>Consent Status</td>
                <td>{{consent_status}}</td>
            </tr>
            <tr>
                <td>Consent Status Created At</td>
                <td>{{consent_status_created_at}}</td>
            </tr>
            <tr>
                <td>Consent Status Expires At</td>
                <td>{{consent_status_expires_at}}</td>
            </tr>
            <tr>
                <td>Provider</td>
                <td>{{provider_name}}</td>
            </tr>
        </tbody>
    </table>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

.table-nonfluid {
    width: auto !important;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
}
.table th {
    border-top: none!important;
    border-bottom: none !important;
}
table {
    font-family: "Lato" sans-serif,
}
</style>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Table extends Vue {
    @Prop(String) credentials_id!: String;
    @Prop(String) consent_status!: String;
    @Prop(String) consent_status_created_at!: String;
    @Prop(String) consent_status_expires_at!: String;
    @Prop(String) provider_name!: String;
}
</script>

