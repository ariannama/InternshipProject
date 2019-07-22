<template>
  <button type="submit" @click="goTo">{{text}}</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

const ButtonProps = Vue.extend({
    props: {
        text: String,
        link: String
    }
});

@Component
export default class Button extends ButtonProps {
        constructor() {
            super();
        }
        goTo() {
            window.location.assign(this.link);
        }
}
</script>