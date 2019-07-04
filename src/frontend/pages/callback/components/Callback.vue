<template>
  <h1>Hello</h1>
  <h1 v-model="access_token">{{access_token}}</h1>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const CallbackProps = Vue.extend({
  props: {
    text: String,
    link: String
  }
});

@Component
export default class Callback extends CallbackProps {
  private access_token; 

  constructor() {
    super();
  }
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    // alert(code);
    fetch("http://localhost:3000/callback", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            code
        })
    }).then((response) => {
        return response.json();
    }).then((body) => {
        const { success, access_token, refresh_token } = body;
        if (!success) alert ("We had a technical issue - please, try again");
        else this.access_token = access_token;
    });
  }
}
</script>