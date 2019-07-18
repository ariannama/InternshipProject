import { compare, hash } from "bcrypt";
import { User } from "../entity/User";

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

    static async getUser(email: string){
        let user: User | undefined;

        try {
            user = await User.findOne({ where: { email }});
        } catch(e) {
            console.log(e);
            const error = "ERROR: Internal Server Error";
            throw new Error(error); 
        }

        return user;
    }

    static async register(email: string, password: string){
        let response = { success: true, message: "ok"};
        const encrypted = await hash(password, 12);
        const user = new User();
        user.email = email;
        user.password = encrypted;

        try {
            await user.save();
        } catch(e) {
            console.log(e);
            const error = "ERROR: failed to register - Please, try again";
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

    static async passwordCheck(inputPassword: string, password: string){
        let error: string;
        let response = { success: true, message: "ok"};

        const comparison = await compare(inputPassword, password);

        if (!comparison) {
            error = "Wrong password - please, try again"
            return { success: false, message: error };
        }
        
        return response;
    }
}