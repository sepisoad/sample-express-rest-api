/**
 * V1 sub-route module
 * @module app/api/v1
 */

import { Router } from "express";
import humans from "./humans";

// This is v1 sub router
const v1 = new Router();

v1.use("/humans", humans);

/**
 * This is our '/api/v1' sub router
 */
module.exports = v1;
