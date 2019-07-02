import * as express from "express";
import { Client, QueryResult } from "pg";
import { conString} from "../constants";
//import passport from "../passport";

var client = new Client(conString);
var router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    let error: string;
    let query: QueryResult | undefined;

    if (!email || !password){
        error = "Please fill out all fields and try again";
        console.log(error);
        return res.send({ success: false, message: error });
    }
    // if (password != password2){
    //     error = "Passwords do not match! Please, try again."
    //     return res.send({ success: false, message: error });
    // }
    if (password.length < 6){
        error = "Password must be at least 6 characters! Please, try again."
        console.log(error);
        return res.send({ success: false, message: error });
    }

    try {
        await client.connect();
    } catch (e) {
        error = "ERROR: failed to register - Please, try again";
        console.log(error);
        res.send({ success: false, message: error});
    }

    const selectParams = {
        text: "SELECT FROM auth WHERE email = $1",
        values: [email]
    };
    try{
        query = await client.query(selectParams);
    } catch(e) {
        error = "ERROR: failed to register - Please, try again";
        console.log(error);
        res.send({ success: false, message: error});
    }
    if (query && query.rowCount > 0){
        error = "There is an existing account with that e-mail. Please, try again."
        console.log(error);
        return res.send({ success: false, message: error});
    } 
    else {
        const insertParams ={
            text: "INSERT INTO auth(email, password) VALUES($1, $2)",
            values: [email, password]
        };
        try{
            query = await client.query(insertParams);
        } catch(e){
            console.log(e);
            error = "ERROR: failed to register - Please, try again";
            res.send({ success: false, message: error});
        }
        res.send({ success: true, message: "You have succesfully created an account!"});
    }
});

export { router }