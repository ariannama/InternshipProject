import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "querystring";
import { TL_SECRET, client_id } from "../constants";
import { IToken } from "../../interfaces/IToken";
import { IMe, IMeResponse } from "../../interfaces/IMe";
import { Token } from "../entity/Token";
import { User } from "../entity/User";

export default class Truelayer {  
    
    static async exchangeCode(code: string){
        let config: AxiosRequestConfig = {
            url: "https://auth.truelayer.com/connect/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: stringify({
                grant_type: "authorization_code",
                client_id: client_id,
                client_secret: TL_SECRET,
                redirect_uri: "http://localhost:3000/callback/callback",
                code: code
            })
        }

        const response: AxiosResponse<IToken> = await axios(config);
    
        let access_token = response.data.access_token;
        let refresh_token = response.data.refresh_token;

        return { access_token, refresh_token }
    }

    static async meEndpoint(access_token: string): Promise<IMe | undefined>{
        let config: AxiosRequestConfig = {
            url: "https://api.truelayer.com/data/v1/me",
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        } 

        let responseMe: AxiosResponse<IMeResponse>;

        try{
            responseMe = await axios(config);
        } catch(e){
            return undefined;
        }

        const metadata: IMe = responseMe.data.results[0];

        return metadata;
    }

    static async insertToken(access_token: string, refresh_token: string, credentials_id: string, user: User){
        const token = new Token();
        token.access_token = access_token;
        token.refresh_token = refresh_token;
        token.credentials_id = credentials_id;
        token.user = user;
        
        try {
            await token.save();
        } catch (e) {
            console.log(e);
        }
    }

    static async refreshToken(old_refresh_token: string){
        let config: AxiosRequestConfig = {
            url: "https://auth.truelayer.com/connect/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: stringify({
                grant_type: "refresh_token",
                client_id: client_id,
                client_secret: TL_SECRET,
                refresh_token: old_refresh_token
            })
        }

        const response: AxiosResponse<IToken> = await axios(config);
        let access_token = response.data.access_token;
        let refresh_token = response.data.refresh_token;

        try {
            await Token.update({ refresh_token: old_refresh_token }, { access_token, refresh_token })
        } catch (e) {
            console.log(e);
        }
    }

    static async validateToken(access_token: string){
        let config: AxiosRequestConfig = {
            url: "https://api.truelayer.com/data/v1/me",
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        } 

        let responseAcc: AxiosResponse;

        try{
            responseAcc = await axios(config);
        } catch(e){
            return false;
        }

        const status = responseAcc.status;

        if(status === 200){
            return true;
        } else { 
            return false; 
        }
    }
}