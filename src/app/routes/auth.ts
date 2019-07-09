import { hash, compare } from "bcrypt";
import * as express from "express";
import { Client, QueryResult } from "pg";
import { conString } from "../constants";
import { redisClient } from "../server";
// import { redisClient } from "../server";

var client = new Client(conString);
client.connect();
var router = express.Router();

async function encrypt(input: string): Promise<string> {
    return await hash(input, 12);
}

router.post("/register", async (req, res) => {
    const { email, password, password2 } =  req.body;
    let error: string;
    let email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let password_format = /\w*[A-Z]\w*/;

    if (!email || !password){
        error = "Please fill out all fields and try again";
        console.log(error);
        return res.send({ success: false, message: error });
    }
    if(!email.match(email_format)){
        error = "Please enter a valid e-mail address";
        return res.send({ success: false, message: error});
    }
    if (password != password2){
        error = "Passwords do not match! Please, try again."
        return res.send({ success: false, message: error });
    }
    if (password.length < 8){
        error = "Password must be at least 8 characters! Please, try again."
        console.log(error);
        return res.send({ success: false, message: error });
    }
    if (!password.match(password_format)){
        error = "Passwords must have at least 1 capital letter! Please, try again."
        console.log(error);
        return res.send({ success: false, message: error });
    }

    const selectQuery = {
        text: "SELECT FROM users WHERE email = $1",
        values: [email]
    };

    let result: QueryResult;

    try {
        result = await client.query(selectQuery);
    } catch(e) {
        error = "ERROR: failed to register - Please, try again 3";
        console.log(e);
        return res.send({ success: false, message: error});
    }

    if (result.rowCount > 0){
        error = "There is an existing account with that e-mail. Please, try again."
        return res.send({ success: false, message: error});
    } 
    
    let encrypted: string;
    
    try {
        encrypted = await encrypt(password);
    } catch(e) {
        console.log(e);
        return res.send({ success: false, message: "bad"});
    }

    const insertQuery = {
        text: "INSERT INTO users(email, password) VALUES($1, $2)",
        values: [email, encrypted]
    };

    try {
        await client.query(insertQuery);
    } catch(e) {
        console.log(e);
        error = "ERROR: failed to register - Please, try again 4";
        res.send({ success: false, message: error});
    }

    const idQuery = {
        text: "SELECT id FROM users WHERE email = $1",
        values: [email]
    }

    let idResult: QueryResult;
    let id: string | undefined;

    try {
        idResult = await client.query(idQuery);
        id = idResult.rows[0].id;
    } catch(e) {
        console.log(e);
        error = "ERROR: failed to register - Please, try again 5";
        res.send({ success: false, message: error});
    }

    res.send({ success: true, message: "You have succesfully created an account!", id: id });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let error: string;

    const emailQuery = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email]
    };

    let result: QueryResult;

    try {
        result = await client.query(emailQuery);
    } catch(e) {
        error = "ERROR: failed to log in - Please, try again 1";
        console.log(e);
        return res.send({ success: false, message: error});
    }

    if (result.rowCount === 0){
        error = "There is no account associated to that e-mail - have you created an account?"
        return res.send({ success: false, message: error});
    } 

    const comparison = await compare(password, result.rows[0].password)
    if (!comparison) {
        error = "Password mismatch"
        return res.send({ success: false, message: error });
    }
    
    const sessionId = "random-string";
    redisClient.set(sessionId, result.rows[0].id);
    res.cookie("SESSION_ID", sessionId);
    return res.send({ success: true, message: "You have successfuly logged in!"});
});
export { router };


// router.get("/protected", async (req, res) => {
//     const sessionId = req.headers["SESSION_ID"] as string;
//     const userId = redisClient.get(sessionId);

//     if (!userId) {
//         return;
//     }

//     // do your /proteected function
// })