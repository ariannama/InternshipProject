import * as express from "express";
import redis from "../services/redis";
import TrueLayer from "../services/truelayer";
import { Token } from "../entity/Token";

var router = express.Router();

router.get("/home", async (req, res) => {
    const cookie = req.headers["cookie"];
    if(!cookie){ 
        console.log("error");
        return res.send({ success: false, message: "Internal Server Error"}); 
    }
    const splitCookie = cookie.split("SESSION_ID="); 
    const sessionId = splitCookie[1];
    const userIdString = await redis.get(sessionId);
    if(!userIdString){
        return res.send({ success: false });
    }
    const userId = parseInt(userIdString);

    if (!userId) {
        return res.send({ success: false});
    }

    let token: Token | undefined;
// FUCK YOU JS
    try {
        token = await Token.findOne({ user: { id: userId }});
    } catch (e) {
        console.log(e);
        return res.send({ success: false });
    }
    if(!token){
        return res.send({ success: false });
    }
    
    const access_token = token.access_token;

    const me = await TrueLayer.meEndpoint(access_token);
    
    return res.send(me);
});

router.get("/refresh", async (req, res) => {
     const cookie = req.headers["cookie"];
     if (!cookie) {
         console.log("error");
         return res.send({ success: false, message: "Internal Server Error" });
     }
     const splitCookie = cookie.split("SESSION_ID=");
     const sessionId = splitCookie[1];
     const userIdString = await redis.get(sessionId);
     if (!userIdString) {
         return res.send({ success: false });
     }
     const userId = parseInt(userIdString);

     if (!userId) {
         return res.send({ success: false });
     }

     let token: Token | undefined;
     // FUCK YOU JS
     try {
         token = await Token.findOne({ user: { id: userId } });
     } catch (e) {
         console.log(e);
         return res.send({ success: false });
     }
     if (!token) {
         return res.send({ success: false });
     }

     const refresh_token = token.refresh_token;
     TrueLayer.refreshToken(refresh_token);
     return res.send({ success: true}); 
});

router.get("/validate", async(req,res) => {
    const cookie = req.headers["cookie"];
    if (!cookie) {
        console.log("error");
        return res.send({ success: false, message: "Internal Server Error" });
    }
    const splitCookie = cookie.split("SESSION_ID=");
    const sessionId = splitCookie[1];
    const userIdString = await redis.get(sessionId);
    if (!userIdString) {
        return res.send({ success: false });
    }
    const userId = parseInt(userIdString);

    if (!userId) {
        return res.send({ success: false });
    }

    let token: Token | undefined;
    // FUCK YOU JS
    try {
        token = await Token.findOne({ user: { id: userId } });
    } catch (e) {
        console.log(e);
        return res.send({ success: false });
    }
    if (!token) {
        return res.send({ success: false });
    }

    const access_token = token.access_token;
    const status = TrueLayer.validateToken(access_token);

    if(!status){
        return res.send({ success: false });
    }
    
    return res.send({ success: true });
})

export { router };

