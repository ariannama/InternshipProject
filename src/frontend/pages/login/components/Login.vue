<template>
  <form>
    <input type="text" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button type="submit" @click.prevent="register" >Submit</button>
  </form>
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
  private email = "john@doe.com";
  private password = "password";

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
            password: this.password
        })
    }).then((response) => {
        return response.json();
    }).then((body) => {
        const { message } = body;
        console.log(message);
    });
  }
}
</script>