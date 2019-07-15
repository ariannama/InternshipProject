import * as dotenv from "dotenv";
import * as cors from "cors";
import * as express from "express";
import * as redis from "redis";
import { router } from "./routes/router";
import { DB } from "./database/db";

dotenv.config();
const app = express();
const redisClient = redis.createClient();
export { redisClient };

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(router);

(async () => {
    try {
        await DB.initialize(); 
        console.log("You've successfully connected to your postgres database");
    } catch (e) {
        console.error(e);
        console.log("ERROR");
    }


    app.listen(3000, () => console.log("running"));
})();
