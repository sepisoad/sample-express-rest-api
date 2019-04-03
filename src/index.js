/**
 * App entry root module
 * @module app
 */

/* eslint-disable max-lines-per-function */
import dotenv from "dotenv";
import express from "express";
import statusCode from "http-status-codes";
import rateLimit from "express-rate-limit";
import winston from "winston";
import api from "./api";
import db from "./db";
import {
  centralErrorHandler
} from "./errors";

/**
 * This is our api server program entry function
 */
// eslint-disable-next-line max-statements
const main = () => {

  /** Loads environment variables from .env file if exists */
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

  // PORT env is used to define api server listening port
  const PORT = process.env.PORT || "3000";
  const app = express();

  // Adds db connection to express app context
  app.set("db", db);

  // Uses '/api' sub router
  app.use("/api", api);

  /**
   * This middleware apply rate limitings to express and can help
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

  /**
   * This custom middleware will capture all non-valid requests
   * and then return a custom 404 error message to client
   */
  app.use((req, res, next) => {
    res.
      status(statusCode.NOT_FOUND).
      type("text").
      send("the resource you are looking for does not exist");
    next(req, res);
  });

  /**
   * This custom middleware will capture all errors and exceptions
   * and then return a custom 500 error message to client
   */
  // eslint-disable-next-line max-params
  app.use((err, req, res, next) => {
    if (err.code === statusCode.NOT_FOUND) {
      res.
        status(statusCode.NOT_FOUND).
        type("text").
        send(err.message);
    } else if (err.code === statusCode.INTERNAL_SERVER_ERROR) {
      res.
        status(statusCode.INTERNAL_SERVER_ERROR).
        type("text").
        send(err.message);
    }

    logger.error(err.message);
    centralErrorHandler(err);
    next(req, res);
  });

  // This will start our server and binds it to our ${PORT} number
  app.listen(PORT, () => {
    logger.info(`api server is running and listening on port ${PORT}`);
  });
};

main();

