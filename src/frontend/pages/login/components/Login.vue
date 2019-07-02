<template>
  <h1>hi</h1>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const LoginProps = Vue.extend({
  props: {
    text: String,
    link: String
  }
});

@Component
export default class Login extends LoginProps {
  constructor() {
    super();
  }
}
</script>