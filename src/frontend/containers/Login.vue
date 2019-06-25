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
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    // alert(code);
    fetch("http://localhost:3000/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code
        })
    }).then((_) => {
        console.log("done");
    });
  }
}
</script>