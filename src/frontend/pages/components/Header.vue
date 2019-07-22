<template>
    <h1>{{text}}</h1>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

const HeaderProps = Vue.extend({
    props: {
        text: String
    }
});

@Component
export default class Header extends HeaderProps {
        constructor() {
            super();
        }
}
</script>
