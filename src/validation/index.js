/**
 * Validation module, contains data tyope schemas
 * @module Validations
 */

import joi from "joi";

/**
 * This object is used to validate getHumanPets request params
 * @constant
 * @type {object}
 */
const getHumanPetsRequest = {
  "params": {
    "name": joi.string().required()
  }
};

/**
 * This object is used to validate humans array
 * retrieved from database
 * @constant
 * @type {object}
 */
const humans = joi.array().items(joi.object({
  "name": joi.string(),
  "age": joi.number()
}));

/**
 * This object is used to validate humans' pets array
 * retrieved from database
 * @constant
 * @type {object}
 */
const pets = joi.array().items(joi.object({
  "name": joi.string(),
  "type": joi.string()
}));

module.exports = {
  getHumanPetsRequest,
  humans,
  pets
};

