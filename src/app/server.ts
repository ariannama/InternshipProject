import * as cors from "cors";
import * as express from "express";
import { Client } from "pg";
import * as redis from "redis";
import { conString } from "./constants";
import { router } from "./routes/router";


var app = express();
var pgClient = new Client(conString);
var redisClient = redis.createClient();
export { redisClient, pgClient };

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
        await pgClient.connect();
        console.log("You've successfully connected to your postgres database");
    } catch (e) {
        console.error(e);
        console.log("ERROR");
    }


    app.listen(3000, () => console.log("running"));
})();
