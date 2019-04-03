/**
 * Humans sub-route module
 * @module app/api/v1/humans
 */

import logger from "winston";
import express from "express";
import {
  getAllHumans,
  getHumanPets
} from "./business";

const humans = new express.Router();

/**
 * Route that returns all humans
 * @name ROUTE {GET} /api/v1/humans/
 * @function
 * @memberof module:app/api/v1/humans
 * @inner
 */
humans.get("/", (req, res, next) => {
  logger.debug(req.baseUrl);

  try {
    const db = req.app.get("db");
    const data = getAllHumans(db);

    res.json(data);
  } catch (err) {
    // eslint-disable-next-line callback-return
    next(err);
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
humans.get("/:name/pets", (req, res, next) => {
  logger.debug(req.baseUrl);

  try {
    const { name } = req.params;
    const db = req.app.get("db");
    const data = getHumanPets(db, name);

    res.json(data);
  } catch (err) {
    // eslint-disable-next-line callback-return
    next(err);
  }

});

/**
 * This is humans sub router
 *
 * @constant
 * @type {router}
 */
module.exports = humans;
