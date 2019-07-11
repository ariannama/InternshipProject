import * as express from "express";
import TrueLayer from "../services/truelayer";
import redis from "../services/redis";
import { pgClient } from "../server";

var router = express.Router();

router.get("/callback", async (req, res) => {
    const code = req.query.code;
    const { access_token, refresh_token } = await TrueLayer.exchangeCode(code);
    const credentials_id = await TrueLayer.getCredentials(access_token);
    await TrueLayer.insertToken(access_token, refresh_token, credentials_id);

    const cookie = req.headers["cookie"];
    if(!cookie){ 
        console.log("error");
        return res.send({ message: "Internal Server Error"}); 
    }
    const splitCookie = cookie.split("SESSION_ID="); 
    const sessionId = splitCookie[1];
    const userId = await redis.getAsync(sessionId);

    const insertQuery = {
        text: "INSERT INTO user_cred_id(id, credentials_id) VALUES($1, $2)",
        values: [userId, credentials_id]
    }
    try{
        await pgClient.query(insertQuery); 
    } catch(e){
        console.log(e);
    }

    res.redirect('/main/home.html');
});

export { router };

