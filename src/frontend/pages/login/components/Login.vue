<template>
    <div>
      <form>
      <label for="email">Enter your email:</label><br />
      <input type="email" placeholder="E-mail" v-model="email"><br/>
      <label for="password2">Enter your password (must have at least 6 characters):</label><br/>
      <input type="password" placeholder="Password" v-model="password"><br/>
      <label for="password2">Confirm your password:</label><br/>
      <input type="password" placeholder="Confirm your password" v-model="password2"><br/>
      <button type="submit" @click.prevent="register" >Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'hi',
};
// import * as passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import * as pg from "pg";
// import { conString } from "./constants";

// var client = new pg.Client(conString);

// passport.use(new LocalStrategy(
//     async (username, password, done) => {
//         let query;
//         const selectParams = {
//             text: "SELECT FROM auth WHERE username = $1 AND password = $2",
//             values: [username, password]
//         };
//         try {
//             query = await client.query(selectParams);
//         } catch (e) {
//             console.log(e);
//         }
//         if (!username) 
//                 return done(null, false);
//         else{
//             return done(null,);
//         }
// }));

// //invoked on authentication and its job is to serialize 
// //the user instance and store it in the session via a cookie"
// passport.serializeUser(function(profile, cb) {
//     cb(null, profile);
// });
// //"invoked every subsequent request to deserialize the instance, 
// //providing it the unique cookie identifier as a “credential”"
// passport.deserializeUser(function(obj, cb){
//     cb(null, obj);
// });

</script>
