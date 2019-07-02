//REMINDER to connect to docker before running (docker start app-db)
import {  TL_SECRET, conString } from "./constants";
import * as request from "request-promise-native";
import * as decoder from "jwt-decode";
import { IExchangeCodeResponse } from "../../interfaces/IExchangeCodeResponse";
import { IDecodeToken } from "../../interfaces/IDecodeToken";
import * as express from "express";
import * as pg from "pg";
import * as cors from "cors";
import passport from "./passport";

var app = express();
var client = new pg.Client(conString);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static('public'));

(async () => {
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }

    console.log("You've successfully connected to your postgres database");

    app.listen(3000, () => console.log("starting"));
})();
//Handling TrueLayer tokens
app.post("/callback", async (req, res) => {
    let code = req.body.code;
    res.send("ok");
    const response: IExchangeCodeResponse = await request.post("https://auth.truelayer.com/connect/token", {
        formData: {
            grant_type: "authorization_code",
            client_id: "test-eb3e42",
            client_secret: TL_SECRET,
            redirect_uri: "http://localhost:3001/callback.html",
            code: code
        },
        resolveWithFullResponse: false,
        json: true
    });
    let access_token = response.access_token;
    let refresh_token = response.refresh_token;
    let decoded = decoder<IDecodeToken>(access_token);
    let subject = decoded.sub;
    let query;
    const selectParams = {
        text: "SELECT FROM tokens WHERE subject = $1",
        values: [subject]
    };
    try {
        query = await client.query(selectParams);
    } catch (e) {
        console.log(e);
    }
    if (query != null) {
        let deleteParams = {
            text: "DELETE FROM tokens WHERE subject = $1",
            values: [subject]
        };
        query = await client.query(deleteParams);
    }
    const queryParams = {
        text: "INSERT INTO tokens(subject, access_token, refresh_token) VALUES($1, $2, $3)",
        values: [subject, access_token, refresh_token]
    };
    try {
        query = await client.query(queryParams);
    } catch (e) {
        console.log(e);
    }
});
//Handling github authentication

app.get('/login',
    passport.authenticate('github')
);

app.get('/login/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function(_, res) {
        console.log("hi");
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3001/hello.html');
});
