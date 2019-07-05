import * as express from "express";
import {router as AuthRouter } from "./auth";
import { router as ConsentRouter } from "./consent";

var router = express.Router();

router.use('/consent', ConsentRouter);
router.use('/auth', AuthRouter);

export { router }