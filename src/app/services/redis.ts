import uuid4 from "uuidv4";
import { redisConn } from "../server";
import Redis from "ioredis";

export default class redis {

    static initialize(){
        const redisConn = new Redis();

        redisConn.on("connect", function() {
            console.log("Redis client connected");
        });

        redisConn.on("error", function(err) {
            console.log("Something went wrong " + err);
        });

        return redisConn;
    }
    
    static async storeCookie(id: string) {
        const sessionId = uuid4();
        try {
            await redisConn.set(sessionId, id);
        } catch (e) {
            console.log(e);
        }
        return sessionId;
    }

    static async get(sessionId: string) {
        let userId: string | null = "";
        try {
            userId = await redisConn.get(sessionId);
        } catch (e) {
            console.log(e);
        }

        return userId;
    }

    static async delete(sessionId: string) {
        try {
            await redisConn.del(sessionId);
        } catch (e) {
            console.log(e);
        }
    }
}
