import { Router } from "express";
import v1 from "./v1";

// This is api sub router
const api = new Router();

api.use("/v1", v1);

module.exports = api;
