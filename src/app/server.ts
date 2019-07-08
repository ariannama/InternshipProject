import * as cors from "cors";
import * as express from "express";
import { Client } from "pg";
import { conString } from "./constants";
import { router } from "./routes/router";

var app = express();
var client = new Client(conString);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(router);

(async () => {
    try {
        await client.connect();
        console.log("You've successfully connected to your postgres database");
    } catch (e) {
        console.error(e);
        console.log("ERROR");
    }


    app.listen(3000);
})();
