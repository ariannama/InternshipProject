import { QueryResult } from "pg";
import { pgClient } from "../server";
import { compare, hash } from "bcrypt";

export default class Validation{
    
    static async registerCheck(email: string, password: string, password2:string){
        let error: string;
        let email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password_format = /\w*[A-Z]\w*/;
        let response = { success: true, message: "ok" };

        if (!email || !password || !password2){
            error = "Please fill out all fields and try again";
            console.log(error);
            return response = { success: false, message: error };
        }
        if(!email.match(email_format)){
            error = "Please enter a valid e-mail address";
            return response = { success: false, message: error };
        }
        if (password != password2){
            error = "Passwords do not match! Please, try again."
            return response = { success: false, message: error };
        }
        if (password.length < 8){
            error = "Password must be at least 8 characters! Please, try again."
            console.log(error);
            return response = { success: false, message: error };
        }
        if (!password.match(password_format)){
            error = "Passwords must have at least 1 capital letter! Please, try again."
            console.log(error);
            return response = { success: false, message: error };
        }
        
        return response;
    }

    static async registerDBCheck(email: string){
        let result: QueryResult;
        let error: string;
        let response = { success: true, message: "ok" };

        const selectQuery = {
            text: "SELECT FROM users WHERE email = $1",
            values: [email]
        };

        try {
            result = await pgClient.query(selectQuery);
        } catch(e) {
            error = "ERROR: failed to register - Please, try again";
            console.log(e);
            return response = { success: false, message: error };
        }

        if (result.rowCount > 0){
            error = "There is an existing account with that e-mail. Please, use another e-mail or log in to your existing account."
            return response = { success: false, message: error};
        }
        
        return response;
    }

    static async register(email: string, password: string){
        let encrypted: string;
        let error: string;
        let response = { success: true, message: "ok"};
        encrypted = await hash(password, 12);

        const insertQuery = {
            text: "INSERT INTO users(email, password) VALUES($1, $2)",
            values: [email, encrypted]
        };

        try {
            await pgClient.query(insertQuery);
        } catch(e) {
            console.log(e);
            error = "ERROR: failed to register - Please, try again 4";
            return response = ({ success: false, message: error});
        }

        return response;
    }

    static async loginCheck(email: string, password: string){
        let error: string;
        let response = { success: true, message: "ok"};
 
        if (!email || !password){
            error = "Please fill out all fields before submitting";
            console.log(error);
            return response = { success: false, message: error };
        }

        return response;
    }

    static async loginDBCheck(email: string, password: string){
        let error: string;
        let response = { success: true, message: "ok"};

        const emailQuery = {
            text: "SELECT * FROM users WHERE email = $1",
            values: [email]
        };
    
        let result: QueryResult;
    
        try {
            result = await pgClient.query(emailQuery);
        } catch(e) {
            error = "ERROR: failed to log in - Please, try again 1";
            console.log(e);
            return { success: false, message: error};
        }
    
        if (result.rowCount === 0){
            error = "There is no account associated to that e-mail - have you created an account?"
            return { success: false, message: error};
        }

        const comparison = await compare(password, result.rows[0].password)

        if (!comparison) {
            error = "Wrong password - please, try again"
            return { success: false, message: error };
        }
        
        return response;
    }
}