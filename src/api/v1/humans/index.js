import logger from "winston";
import express from "express";
import {
  getAllHumans,
  getHumanPets
} from "./business";

// This is humans sub router
const humans = new express.Router();

// HTTP GET /api/v1/humans/
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

// HTTP GET /api/v1/humans/:name/pets
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

module.exports = humans;
