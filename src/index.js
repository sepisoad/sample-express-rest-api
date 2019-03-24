/* eslint-disable max-lines-per-function */
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import winston from "winston";
import api from "./api";
import db from "./db";
import {
  centralErrorHandler
} from "./errors";

/*
 * This is our api server program entry function
 */
// eslint-disable-next-line max-statements
const main = () => {
  // Loads environment variables from .env file if exists
  dotenv.config();

  const logger = winston.createLogger({
    // eslint-disable-next-line no-ternary
    "level": process.env.NODE_ENV === "production"
      ? "info"
      : "debug",
    // Uses json format for log messages
    "format": winston.format.json(),
    // Prints log messages to standard console
    "transports": [new winston.transports.Console()]
  });

  const PORT = process.env.PORT || "3000";
  const app = express();

  // Adds db connection to express app context
  app.set("db", db);

  // Uses '/api' sub router
  app.use("/api", api);

  /*
   * This custom middleware will capture all non-valid requests
   * and then return a custom 404 error message to client
   */
  app.use((req, res, next) => {
    res.
      status("404").
      type("text").
      send("Error: the resource you are looking for does not exist");
    next(req, res);
  });

  /*
   * This custom middleware will capture all erros and exceprion
   * and then return a custom 500 error message to client
   */
  // eslint-disable-next-line max-params
  app.use((err, req, res, next) => {
    logger.error(err.message);
    centralErrorHandler(err);
    res.
      status("500").
      type("text").
      send("Opps, there is an internal server error, please report!");
    next(req, res);
  });

  /*
   * This middleware apply rate limitting to express and can help
   * on DOS/DDOS attacks.
   */
  // eslint-disable-next-line no-magic-numbers
  const FifteenMinutes = 15 * 60 * 1000;
  const RequestsPerWindowMS = 100;
  const limiter = rateLimit({
    "windowMs": FifteenMinutes,
    "max": RequestsPerWindowMS,
    "message":
      "Too many accounts created from this IP, please try again after an hour"
  });

  app.use(limiter);

  // This will start our server and binds it to our ${PORT} number
  app.listen(PORT, () => {
    logger.info(`api server is running and listening on port ${PORT}`);
  });
};

main();

