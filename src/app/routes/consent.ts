import * as express from "express";
import TrueLayer from "../services/truelayer";
import redis from "../services/redis";
import { User } from "../entity/User";

var router = express.Router();

router.get("/callback", async (req, res) => {
    const code = req.query.code;
    const { access_token, refresh_token } = await TrueLayer.exchangeCode(code);
    const { credentials_id } = await TrueLayer.meEndpoint(access_token);

    const cookie = req.headers["cookie"];
    if(!cookie){ 
        console.log("error");
        return res.send({ message: "Internal Server Error"}); 
    }
    const splitCookie = cookie.split("SESSION_ID="); 
    const sessionId = splitCookie[1];
    const userId = await redis.getAsync(sessionId);
    const user = await User.findOne({ where: { userId }});
    
    if(!user){
        return res.send("error");
    }

    await TrueLayer.insertToken(access_token, refresh_token, credentials_id, user);
    

    res.redirect('/main/home.html');
});

export { router };

