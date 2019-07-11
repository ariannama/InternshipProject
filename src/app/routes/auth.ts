import * as express from "express";
import { QueryResult } from "pg";
import { pgClient } from "../server";
import Authentication from "../services/authentication"
import TrueLayer from "../services/truelayer";
import redis from "../services/redis";

var router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, password2 } =  req.body;
    const validationResult = await Authentication.registerCheck(email, password, password2);
    const dbCheck = await Authentication.registerDBCheck(email);
    const register = await Authentication.register(email, password);

    if(!validationResult.success){
        return res.send(validationResult);
    }
    if(!dbCheck.success){
        return res.send(dbCheck);
    }
    if(!register.success){
        return res.send(register)
    }
    
    let error: string;

    const idQuery = {
        text: "SELECT id FROM users WHERE email = $1",
        values: [email]
    }

    let result: QueryResult;

    try {
        result = await pgClient.query(idQuery);
    } catch (e) {
        console.log(e);
        error = "ERROR: failed to register - Please, try again 4";
        return res.send({ success: false, message: error});
    }

    const userId = result.rows[0].id;
    const sessionId = await redis.storeCookie(userId);
    await res.cookie("SESSION_ID", sessionId);

    return res.send({ success: true, message: "You have successfuly created an account!"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const fillFieldsCheck = await Authentication.loginCheck(email, password);
    const dbCheck = await Authentication.loginDBCheck(email, password);
    let error: string;
    
    if(!fillFieldsCheck.success){
        return res.send(fillFieldsCheck);
    }
    if(!dbCheck.success){
        return res.send(dbCheck);
    }

    const emailQuery = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email]
    };

    let result: QueryResult;

    try {
        result = await pgClient.query(emailQuery);
    } catch(e) {
        error = "ERROR: failed to log in - Please, try again";
        console.log(e);
        return { success: false, message: error};
    }
    
    const userId = result.rows[0].id;
    const sessionId = await redis.storeCookie(userId);
    await res.cookie("SESSION_ID", sessionId);

    const refreshQuery = {
        text: "SELECT refresh_token FROM tokens, users, user_cred_id WHERE users.id = $1  AND users.id = user_cred_id.id AND user_cred_id.credentials_id = tokens.credentials_id",
        values: [userId]
    }
    try {
        result = await pgClient.query(refreshQuery);
    } catch (e){
        console.log(e);
    }

    const refresh_token = result.rows[0].refresh_token;
    console.log(refresh_token);

    TrueLayer.refreshToken(refresh_token);

    return res.send({ success: true, message: "You have successfuly logged in!"});
});

export { router };
