<template>
    <div>
        <div>YOYOYOYYO</div>
        <ul class="nav">
            <li>
                <router-link to="/register">Create an account</router-link>
            </li>
            <li>
                <router-link to="/login">Log into your account</router-link>
            </li>
        </ul>
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component  } from "vue-property-decorator";

@Component
export default class Auth extends Vue {}
</script>