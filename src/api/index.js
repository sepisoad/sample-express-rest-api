/**
 * API sub-route module
 * @module app/api
 */

import { Router } from "express";
import v1 from "./v1";

// This is 'api' sub router
const api = new Router();

api.use("/v1", v1);

/**
 * This is our '/api' sub router
 */
module.exports = api;
