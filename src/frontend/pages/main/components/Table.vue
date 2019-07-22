<template>
    <table class="table table-nonfluid">
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
.table-nonfluid {
   width: auto!important;
   margin-left:auto; 
   margin-right:auto;
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

