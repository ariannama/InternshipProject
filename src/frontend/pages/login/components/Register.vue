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
  private email = "jon@example.com";
  private password = "password";
  private password2 = "password";

  constructor() {
    super();
  }

  doSomething() {
      alert("something");
  }

  register() {
    fetch("http://localhost:3000/register", {
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
        const { message } = body;
        alert(message);
    });
  }
}
</script>