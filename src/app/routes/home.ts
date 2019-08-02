import * as express from "express";
import redis from "../services/redis";
import TrueLayer from "../services/truelayer";
import { Token } from "../entity/Token";

var router = express.Router();

//Endpoint returns info about access token
router.get("/home", async (req, res) => {
    const cookie = req.headers["cookie"];
    const userId = await redis.extractUserId(cookie);

    if (!userId) {
        return res.send({ success: false });
    }

    let tokens: Token[] | undefined;

    try {
        tokens = await Token.find({ user: { id: userId } });
    } catch (e) {
        console.log(e);
        return res.send({ success: false });
    }
    if (!tokens) {
        return res.send({ success: false });
    }

    //const access_token = tokens.access_token;

    //const me = await TrueLayer.meEndpoint(access_token);

    return res.send(tokens);
});

//Endpoint refreshes current access token
router.get("/refresh", async (req, res) => {
    const cookie = req.headers["cookie"];
    const userId = await redis.extractUserId(cookie);

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
    return res.send({ success: true });
});

//Endpoint validates current access token by making call to "accounts" TL endpoint
router.get("/validate", async (req, res) => {
    const cookie = req.headers["cookie"];
    const userId = await redis.extractUserId(cookie);

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

    if (!status) {
        return res.send({ success: false });
    }

    return res.send({ success: true });
});

export { router };
