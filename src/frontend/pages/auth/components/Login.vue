<template>
  <form>
    <label for="email">E-mail:</label><br />
    <input type="email" placeholder="E-mail" v-model="email"><br/>
    <label for="password">Password:</label><br/>
    <input type="password" placeholder="Password" v-model="password"><br/>
    <button type="submit" @click.prevent="register" >Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const LoginProps = Vue.extend({
  name: "Login",
  props: {
    text: String,
    link: String
  }
});

@Component
export default class Login extends LoginProps {
  private email;
  private password;

  constructor() {
    super();
  }

  register() {
    fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.email,
            password: this.password
        })
    }).then((response) => {
        return response.json();
    }).then((body) => {
        const { message } = body;
        alert(message);
        window.location.href = "/main/home.html";
    });
  }
}
</script>
