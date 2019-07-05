import * as express from "express";
import * as decoder from "jwt-decode";
import { Client, QueryResult } from "pg";
import * as request from "request-promise-native";
import { IDecodeToken } from "../../interfaces/IDecodeToken";
import { IExchangeCodeResponse } from "../../interfaces/IExchangeCodeResponse";
import { conString, TL_SECRET } from "../constants";

var client = new Client(conString);
client.connect();
var router = express.Router();

router.post("/", async (req, res) => {
    console.log("ok1");
    let code = req.body.code;

    const response: IExchangeCodeResponse = await request.post("https://auth.truelayer.com/connect/token", {
        formData: {
            grant_type: "authorization_code",
            client_id: "test-eb3e42",
            client_secret: TL_SECRET,
            redirect_uri: "http://localhost:3000/callback/callback.html",
            code: code
        },
        resolveWithFullResponse: false,
        json: true
    });

    let access_token = response.access_token;
    let refresh_token = response.refresh_token;
    let decoded = decoder<IDecodeToken>(access_token);
    let subject = decoded.sub;
    let result: QueryResult;

    const selectQuery = {
        text: "SELECT FROM tokens WHERE credentials_id = $1",
        values: [subject]
    };

    try {
        result = await client.query(selectQuery);
    } catch (e) {
        console.log(e);
        return res.send({ success: false, access_token: 0, refresh_token: 0});
    }

    if (result.rowCount > 0) {
        let deleteParams = {
            text: "DELETE FROM tokens WHERE credentials_id = $1",
            values: [subject]
        };
        result = await client.query(deleteParams);
    }

    const insertQuery = {
        text: "INSERT INTO tokens(access_token, refresh_token, credentials_id) VALUES($1, $2, $3)",
        values: [access_token, refresh_token, subject]
    };
    try {
        result = await client.query(insertQuery);
    } catch (e) {
        console.log(e);
    }

    return res.send({ success: true, access_token: access_token, refresh_token: refresh_token });
});

export { router };