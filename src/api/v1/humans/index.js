/**
 * Humans sub-route module
 * @module app/api/v1/humans
 */

import logger from "winston";
import express from "express";
import validate from "express-validation";
import statusCode from "http-status-codes";
import {
  getAllHumans,
  getHumanPets
} from "./business";
import { genHTTPStatusError } from "../../../errors";
import validation from "../../../validation";


const humans = new express.Router();

/**
 * Route that returns all humans
 * @name ROUTE {GET} /api/v1/humans/
 * @function
 * @memberof module:app/api/v1/humans
 * @inner
 */
humans.get("/", (req, res) => {
  logger.debug(req.baseUrl);

  try {
    const db = req.app.get("db");
    const data = getAllHumans(db);

    res.json(data);
  } catch (err) {
    genHTTPStatusError(
      statusCode.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
});

/**
 * Route that returns all humans pets
 * @name ROUTE {GET} /api/v1/humans/:name/pets
 * @function
 * @memberof module:app/api/v1/humans
 * @inner
 * @param {string} name - human's name
 */
humans.get(
  "/:name/pets",
  validate(validation.getHumanPetsRequest),
  (req, res) => {
    logger.debug(req.baseUrl);

    try {
      const { name } = req.params;
      const db = req.app.get("db");
      const data = getHumanPets(db, name);

      res.json(data);
    } catch (err) {
      if (err.message === "no record was found") {
        genHTTPStatusError(
          statusCode.NOT_FOUND,
          "human name was not found in our database"
        );
      } else {
        genHTTPStatusError(
          statusCode.INTERNAL_SERVER_ERROR,
          err.message
        );
      }
    }
  }
);

/**
 * This is humans sub router
 *
 * @constant
 * @type {router}
 */
module.exports = humans;
