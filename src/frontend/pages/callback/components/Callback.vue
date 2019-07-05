<template>
<div>
  <h1>llo</h1>
  <div><h1>{{token}}</h1></div>
</div>
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
  token: string | undefined = "decl";

  constructor() {
    super();
  }
  mounted() {
    this.token = "init";
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
        let { success, access_token, refresh_token } = body;
        this.token = access_token;
        alert(access_token);
        alert(this.token);
        // if (!success) alert ("We had a technical issue - please, try again");

    });
  }
}
</script>