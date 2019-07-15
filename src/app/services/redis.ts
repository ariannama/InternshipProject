import * as uuid4 from "uuidv4";
import { redisClient } from "../server";
import { promisify } from "util";

export default class redis{
    static async storeCookie(id: string){
        const sessionId = uuid4();
        let set = promisify(redisClient.set).bind(redisClient);
        await set(sessionId, id);   
        return sessionId;
    }

    static async getAsync(sessionId: string){
        let get = promisify(redisClient.get).bind(redisClient);
        try{
            return get(sessionId);
        } catch(e){
            console.log(e);
        }
    }
}