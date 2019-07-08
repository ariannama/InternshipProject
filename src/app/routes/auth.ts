import { hash } from "bcrypt";
import * as express from "express";
import { Client, QueryResult } from "pg";
import { conString } from "../constants";

var client = new Client(conString);
client.connect();
var router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, password2 } =  req.body;
    let error: string;


    if (!email || !password){
        error = "Please fill out all fields and try again";
        console.log(error);
        return res.send({ success: false, message: error });
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
    if (password.length < 8){
        error = "Password must be at least 8 characters! Please, try again."
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
        console.log("start");
        encrypted = await hash(password, 12);
        console.log("end");
    } catch(error) {
        console.log("error start");
        console.log(error);
        return res.send({ success: false, message: "bad"});
    }

    const insertQuery = {
        text: "INSERT INTO users(id, email, password) VALUES($1, $2)",
        values: [email, encrypted]
    };

    try {
        await client.query(insertQuery);
    } catch(e) {
        console.log(e);
        error = "ERROR: failed to register - Please, try again 4";
        res.send({ success: false, message: error});
    }

    res.send({ success: true, message: "You have succesfully created an account!"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let error: string;

    let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!email.match(emailformat)){
        error = "Please enter a valid e-mail address";
        return res.send({ success: false, message: error});
    }

    const emailQuery = {
        text: "SELECT FROM users WHERE email = $1",
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

    let encrypted: string;

    try {
        encrypted = await hash(password, 12);
    } catch(error) {
        console.log("error start");
        console.log(error);
        return res.send({ success: false, message: "bad"});
    }

    const selectQuery = {
        text: "SELECT FROM users WHERE email = $1 AND password = $2",
        values: [email, encrypted]
    };

    try {
        result = await client.query(selectQuery);
    } catch(e) {
        error = "ERROR: failed to log in - Please, try again 2";
        console.log(e);
        return res.send({ success: false, message: error});
    }

    if(result.rowCount === 0){
        error = "Your password is wrong, please try again."
    }

    return res.send({ success: true, message: "You have successfuly logged in!"});


});
export { router };
