import * as express from "express";
import Authentication from "../services/authentication";
import redis from "../services/redis";
import TrueLayer from "../services/truelayer";
import { Token } from "../entity/Token";
import { User } from "../entity/User";

var router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, password2 } =  req.body;
    const validationResult = await Authentication.registerCheck(email, password, password2);
    const check = await Authentication.getUser(email);
    const error = "ERROR: failed to register - Please, try again";

    if(!validationResult.success){
        return res.send(validationResult);
    }
    if(check){
        return res.send({success: false, message: "There is an existing account with that email - Please, try again"});
    }

    const register = await Authentication.register(email, password);

    if(!register.success){
        return res.send(register)
    }
    
    let user: User | undefined;

    try {
        user = await User.findOne({ where: { email }});
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: error});
    }
    if(!user){
        return res.send({ success: false, message: error});
    }

    const userId = user.id;
    const sessionId = await redis.storeCookie(userId.toString());
    res.cookie("SESSION_ID", sessionId);
    return res.send({ success: true, message: "You have successfuly created an account!"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const fillFieldsCheck = await Authentication.loginCheck(email, password);
    const user = await Authentication.getUser(email);

    if(!fillFieldsCheck.success){
        return res.send(fillFieldsCheck);
    }
    if(!user){
        return res.send({ success: false, message: "There is no account registered with that e-mail - Please, try again"});
    }

    const passwordCheck = await Authentication.passwordCheck(password, user.password);

    if(!passwordCheck.success){
        return res.send(passwordCheck);
    }

    const userId = user.id;
    const sessionId = await redis.storeCookie(userId.toString());
    res.cookie("SESSION_ID", sessionId);
    let token: Token | undefined;

    try {
        token = await Token.findOne(user);
    } catch (e){
        console.log(e);
        return res.send({ success: false, message: "ERROR: Failed to login - Please, try again"});
    }
    if(!token){
        return res.send({ success: false, message: "ERROR: Failed to login - Please, try again"});
    }
    
    const refresh_token = token.refresh_token;

    TrueLayer.refreshToken(refresh_token);

    return res.send({ success: true, message: "You have successfuly logged in!"});
});

router.get("/logout", async(req, res) => {
    const cookie = req.headers["cookie"];
    if(!cookie){
        return res.send({ success: false })
    }
    const splitCookie = cookie.split("SESSION_ID="); 
    const sessionId = splitCookie[1];
    await redis.delete(sessionId);
    res.clearCookie("SESSION_ID");
    return res.send();
});

export { router };
