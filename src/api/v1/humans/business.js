/**
 * Humans business layer sub module
 * @module app/api/v1/humans-business
 */

import DA from "./data-access";

/**
 * This value refers to Jane's Max age after which we are not allowed to
 * provide users with Jane's pet data.
 * @constant
 * @type {number}
 * @default 30
 */
const JANE_MAX_AGE = 30;

/**
 * This value refers to the default zero value we might return just in case
 * @constant
 * @type {number}
 * @default 0
 */
const ZERO_RESULT = 0;

/**
 * Retrieves all human objects,
 * but only shows each human name and age,
 * @function
 * @param {Object} db Database object.
 * @returns {Array} List of humans.
 */
const getAllHumans = (db) => {
  const rawData = DA.getAllHumans(db);
  const data = rawData.map((row) => ({
    "name": row.name,
    "age": row.age
  }));

  return data;
};

/**
 * Retrieves one human pets defined by `name`.
 * @function
 * @param {Object} db Database object.
 * @param {String} name human name to look for.
 * @returns {Array} List of pets associated with `name`.
 */
const getHumanPets = (db, name) => {
  const human = db.find((row) => row.name === name);

  if (name === "Jane" && human.age > JANE_MAX_AGE) {
    // Based on requirement documentation, "ZERO result" is returned back
    return ZERO_RESULT;
  }

  return DA.getHumanPets(db, name);
};

module.exports = {
  getAllHumans,
  getHumanPets
};
