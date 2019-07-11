import axios from "axios";
import * as express from "express";
import { QueryResult } from "pg";
import { IMe } from "../../interfaces/IMe";
import { redisClient, pgClient } from "../server";

var router = express.Router();

router.get("/home", async (req, res) => {
    const sessionId = req.headers["SESSION_ID"] as string;
    const userId = redisClient.get(sessionId);
    let result: QueryResult;
    
    if (!userId) {
        return res.send({ message: "ACCESS DENIED"});
    }

    const tokenQuery = {
        text: "SELECT access_token FROM tokens WHERE users.id = $1 AND users.id = user_cred_id.id AND user_cred_id.id = tokens.credentials_id",
        values: [userId]
    };

    try {
        result = await pgClient.query(tokenQuery);
    } catch (e) {
        console.log(e);
        return res.send({ success: false });
    }
    
    const access_token = result.rows[0].access_token


    const requestMe: any = await axios.get("https://api.truelayer.com/data/v1/me", {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    
    const metadata: IMe = requestMe.results[0];
    let credentials_id = metadata.credentials_id;
    let consent_status = metadata.consent_status;
    let consent_status_updated_at = metadata.consent_status_updated_at;
    let consent_expires_at = metadata.consent_expires_at;
    let display_name = metadata.provider.display_name;

    const selectQuery = {
        text: "SELECT FROM tokens WHERE credentials_id = $1",
        values: [credentials_id]
    };

    try {
        result = await pgClient.query(selectQuery);
    } catch (e) {
        console.log(e);
        return res.send({ success: false });
    }

    if (result.rowCount > 0) {
        let deleteParams = {
            text: "DELETE FROM tokens WHERE credentials_id = $1",
            values: [credentials_id]
        };
        result = await pgClient.query(deleteParams);
    }

    return res.send({ 
        success: true, 
        access_token: access_token, 
        credentials_id: credentials_id,
        consent_status: consent_status,
        consent_status_updated_at: consent_status_updated_at,
        consent_expires_at: consent_expires_at,
        display_name: display_name });


});

export { router };

