<template>
<div>
  <h1>Here is the information about your access token:</h1>
  <div>{{token}}</div>
  <div>{{prov}}</div>
  <div>{{cons}}</div>
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
  token: string | undefined = null;
  cred: string | undefined = null;

  constructor() {
    super();
  }
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    fetch("http://localhost:3000/callback/callback", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code
        })
    }).then((response) => {
      console.log(response);
        return response.json();
    }).then((body) => {
        console.log(body);
        console.log(response);
        const { success, access_token, refresh_token, credentials_id, consent_status, consent_status_updated_at, consent_expires_at, display_name} = body;
        this.token = access_token;
        this.cred = credentials_id;
        this.prov = display_name;
    });
  }
}
</script>