/**
 * Humans data access layer sub module
 * @module app/api/v1/humans-data-access
 */

/**
 * Retrieves all human raw objects from database,
 * @function
 * @param {Object} db Database object.
 * @returns {Array} List of humans.
 */
const getAllHumans = (db) => db;

/**
 * Retrieves one human pets defined by `humanName`.
 * @function
 * @param {Object} db Database object.
 * @param {String} humanName human name to look for.
 * @returns {Array} List of pets associated with `humanName`.
 */
const getHumanPets = (db, humanName) => {
  const human = db.find((row) => row.name === humanName);

  if (!human) {
    throw Error("no record was found");
  }

  return human.pets;
};

module.exports = {
  getAllHumans,
  getHumanPets
};
