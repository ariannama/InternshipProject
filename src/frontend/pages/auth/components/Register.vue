<template>
  <form>
    <label for="email">Enter your email:</label><br />
    <input type="email" placeholder="E-mail" v-model="email"><br/>
    <label for="password2">Enter your password (must have at least 6 characters):</label><br/>
    <input type="password" placeholder="Password" v-model="password"><br/>
    <label for="password2">Confirm your password:</label><br/>
    <input type="password" placeholder="Confirm your password" v-model="password2"><br/>
    <button type="submit" @click.prevent="register" >Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const RegisterProps = Vue.extend({
  name: "Register",
  props: {
    text: String,
    link: String
  }
});

@Component
export default class Register extends RegisterProps {
  private email;
  private password;
  private password2;


  constructor() {
    super();
  }

  doSomething() {
      alert("something");
  }

  register() {
    fetch("http://localhost:3000/auth/register", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.email,
            password: this.password,
            password2: this.password2
        })
    }).then((response) => {
        return response.json();
    }).then((body) => {
        const { success, message } = body;
        alert(message);
        if (success) window.open("https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=753172035&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/callback/callback.html&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false",'TrueLayer Auth Dialog','height=1000,width=1000,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    });
  }
}
</script>