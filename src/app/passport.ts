// import * as passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import * as pg from "pg";
// import { conString } from "./constants";

// var client = new pg.Client(conString);

// passport.use(new gitStrategy({
//     clientID: GIT_CLIENT_ID,
//     clientSecret: GIT_SECRET,
//     callbackURL: "http://localhost:3000/login/callback"
//   },
//   async function(__, _, profile, cb) {
//     let username = profile.username;
//     let query;
//     const selectParams = {
//         text: "SELECT FROM auth WHERE username = $1",
//         values: [username]
//     };
//     try {
//         query = await client.query(selectParams);
//     } catch (e) {
//         console.log(e);
//     }
//     if (query == null) {
//         const queryParams = {
//             text: "INSERT INTO auth(username) VALUES($1, $2, $3)",
//             values: [username]
//         };
//         try {
//             query = await client.query(queryParams);
//         } catch (e) {
//             console.log(e);
//         }
//         //REDIRECT TO AUTHENTICATION
//         return cb(null, profile);
//     }
//     else{
//         return cb(null, profile);
//     }
// }));

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

//"invoked on authentication and its job is to serialize 
//the user instance and store it in the session via a cookie"
// passport.serializeUser(function(profile, cb) {
//     cb(null, profile);
// });
// //"invoked every subsequent request to deserialize the instance, 
// //providing it the unique cookie identifier as a “credential”"
// passport.deserializeUser(function(obj, cb){
//     cb(null, obj);
// });

// export default passport