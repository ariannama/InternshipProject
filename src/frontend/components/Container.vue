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
        text="Sign in"
        link="https://github.com/login/oauth/authorize"
      />
    </div>
    <div class="flex">
      <Button
        class="flex-1 justify-center items-center font-semibold rounded-full px-10 py-5 mx-3 leading-normal bg-white border border-blue-400 text-blue hover:bg-blue-400 hover:text-white"
        text="Consent"
        link="https://auth.truelayer.com/?response_type=code&client_id=test-eb3e42&nonce=2952571688&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3001/callback.html&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers=false"
      />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Button from "./Button.vue";
import Header from "./Header.vue";

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

<style src ="../../assets/tailwind.css">