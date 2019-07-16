import * as express from "express";
import { router as AuthRouter } from "./auth";
import { router as ConsentRouter } from "./consent";
import { router as HomeRouter } from "./home";

var router = express.Router();

router.use('/callback', ConsentRouter);
router.use('/auth', AuthRouter);
router.use('/home', HomeRouter);

export { router };

