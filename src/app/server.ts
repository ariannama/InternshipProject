import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import redis from "./services/redis";
import { DB } from "./database/db";
import { router } from "./routes/router";

dotenv.config();
const app = express();
const redisConn = redis.initialize();
export { redisConn };

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(router);

// /* final catch-all route to index.html defined last */
// app.get("/*", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

(async () => {
    try {
        await DB.initialize();
    } catch (e) {
        console.error(e);
    }

    app.listen(3000, () => console.log("running"));
})();
