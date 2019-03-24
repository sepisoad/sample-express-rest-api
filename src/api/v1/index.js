import { Router } from "express";
import humans from "./humans";

// This is v1 sub router
const v1 = new Router();

v1.use("/humans", humans);

module.exports = v1;
