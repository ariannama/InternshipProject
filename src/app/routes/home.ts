import * as express from "express";
import { redisClient } from "../server";
import TrueLayer from "../services/truelayer";
import { Token } from "../entity/Token";

var router = express.Router();

router.get("/home", async (req, res) => {
    const sessionId = req.headers["SESSION_ID"] as string;
    const userId = redisClient.get(sessionId);
    
    if (!userId) {
        return res.send({ message: "ACCESS DENIED"});
    }

    let token: Token | undefined;

    try {
        token = await Token.findOne({ where: { userId }});
    } catch (e) {
        console.log(e);
        return res.send({ success: false });
    }
    if(!token){
        return res.send({ success: false });
    }
    
    const access_token = token.access_token;

    const me = await TrueLayer.meEndpoint(access_token);
    
    res.send(me);
});

export { router };

