import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "querystring";
import { TL_SECRET, client_id } from "../constants";
import { IToken } from "../../interfaces/IToken";
import { IMe, IMeResponse } from "../../interfaces/IMe";
import { pgClient } from "../server";

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

    static async getCredentials(access_token: string){
        let config: AxiosRequestConfig = {
            url: "https://api.truelayer.com/data/v1/me",
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            },
        } 
        const responseMe: AxiosResponse<IMeResponse> = await axios(config);
        
        const metadata: IMe = responseMe.data.results[0];
        let credentials_id = metadata.credentials_id;
        
        return credentials_id;
    }

    static async insertToken(access_token: string, refresh_token: string, credentials_id: string){
        const insertQuery = {
            text: "INSERT INTO tokens(access_token, refresh_token, credentials_id) VALUES ($1, $2, $3)",
            values: [access_token, refresh_token, credentials_id]
        }
        try {
            await pgClient.query(insertQuery);
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

        const updateQuery = {
            text: "UPDATE tokens SET access_token = $1, refresh_token = $2 WHERE refresh_token = $3",
            values: [access_token, refresh_token, old_refresh_token]
        }
        try {
            await pgClient.query(updateQuery);
        } catch (e) {
            console.log(e);
        }
    }
}