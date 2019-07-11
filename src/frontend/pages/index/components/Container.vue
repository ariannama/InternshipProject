<template>
  <div>
    <div>
      <Header
        text="PiggyBank 2.0"
        class="font-sans: 'Apple Color Emoji' text-center border text-sun text-xl py-5 border-gray-600"
      />
    </div>
    <div class="flex">
      <Button
        class="flex-1 justify-center items-center font-semibold rounded-full px-10 py-5 mx-3 leading-normal bg-white border border-blue-400 text-blue hover:bg-blue-400 hover:text-white"
        text="Create an account"
        link="http://localhost:3000/auth/register.html"
      />
    </div>
    <div class="flex">
      <Button
      class="flex-1 justify-center items-center font-semibold rounded-full px-10 py-5 mx-3 leading-normal bg-white border border-blue-400 text-blue hover:bg-blue-400 hover:text-white"
      text="Log in"
      link="http://localhost:3000/auth/login.html"
      />
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Button from "../../components/Button.vue";
import Header from "../../components/Header.vue";

const ContainerProps = Vue.extend({});

@Component({
  components: {
    Button: Button,
    Header: Header
  }
})
export default class Container extends ContainerProps {
  constructor() {
    super();
  }
}
</script>

