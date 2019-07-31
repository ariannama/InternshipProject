import * as express from "express";
import TrueLayer from "../services/truelayer";
import redis from "../services/redis";
import { User } from "../entity/User";

var router = express.Router();

router.get("/callback", async (req, res) => {
    const code = req.query.code;
    const { access_token, refresh_token } = await TrueLayer.exchangeCode(code);
    const meResult = await TrueLayer.meEndpoint(access_token);

    if (!meResult) {
        return res.send({ message: "Request to me endpoint failed" });
    }

    const credentials_id = meResult.credentials_id;

    const cookie = req.headers["cookie"];
    const userId = await redis.extractUserId(cookie);
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
        return res.send("error");
    }

    await TrueLayer.insertToken(access_token, refresh_token, credentials_id, user);

    res.redirect("/main/home.html");
});

export { router };
