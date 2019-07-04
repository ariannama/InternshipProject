<template>
    <div id="app" >
        <ul class="nav">
            <li>
                <router-link to="/register">Create an account</router-link></br>    
            </li>
            <li>
                <router-link to="/hi">HI</router-link></br>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import Register from "./components/Register";
import Login from "./components/Login";

export default {
    name: 'app',
    components: {
        Register, Hi
    }
}
</script>