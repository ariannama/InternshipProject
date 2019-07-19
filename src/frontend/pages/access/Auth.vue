<template>
    <div class="head">
        <ul class="list-inline">
            <li class="list-inline-item">
                <router-link to="/register">Create an account</router-link>
            </li>
            <li class="list-inline-item">
                <router-link to="/login">Log into your account</router-link>
            </li>
        </ul>
        <router-view />
    </div>
</template>

<style>
.head {
    background-color: #f5f5f5;
}
.list-inline{
    display: flex;
    justify-content: center;
    align-items: center;
}
.list-inline-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Auth extends Vue {}
</script>