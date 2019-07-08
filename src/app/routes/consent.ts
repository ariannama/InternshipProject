import * as express from "express";
import { Client, QueryResult } from "pg";
import * as request from "request-promise-native";
import { IMe } from "../../interfaces/IMe";
import { IExchangeCodeResponse } from "../../interfaces/IExchangeCodeResponse";
import { conString, TL_SECRET } from "../constants";

var client = new Client(conString);
client.connect();
var router = express.Router();

router.post("/callback", async (req, res) => {
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

    const requestMe: any = await request.get("https://api.truelayer.com/data/v1/me", {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        resolveWithFullResponse: false,
        json: true
    });
    
    const metadata: IMe = requestMe.results[0];
    let credentials_id = metadata.credentials_id;
    let consent_status = metadata.consent_status;
    let consent_status_updated_at = metadata.consent_status_updated_at;
    let consent_expires_at = metadata.consent_expires_at;
    let display_name = metadata.provider.display_name;
    let result: QueryResult;

    const selectQuery = {
        text: "SELECT FROM tokens WHERE credentials_id = $1",
        values: [credentials_id]
    };

    try {
        result = await client.query(selectQuery);
    } catch (e) {
        console.log(e);
        return res.send({ success: false,  
            access_token: access_token, 
            refresh_token: refresh_token,
            credentials_id: credentials_id,
            consent_status: consent_status,
            consent_status_updated_at: consent_status_updated_at,
            consent_expires_at: consent_expires_at });
    }

    if (result.rowCount > 0) {
        let deleteParams = {
            text: "DELETE FROM tokens WHERE credentials_id = $1",
            values: [credentials_id]
        };
        result = await client.query(deleteParams);
    }

    const insertQuery = {
        text: "INSERT INTO tokens(access_token, refresh_token, credentials_id) VALUES($1, $2, $3)",
        values: [access_token, refresh_token, credentials_id]
    };
    try {
        result = await client.query(insertQuery);
    } catch (e) {
        console.log(e);
    }

    return res.send({ 
        success: true, 
        access_token: access_token, 
        refresh_token: refresh_token,
        credentials_id: credentials_id,
        consent_status: consent_status,
        consent_status_updated_at: consent_status_updated_at,
        consent_expires_at: consent_expires_at,
        display_name: display_name });


});

export { router };

