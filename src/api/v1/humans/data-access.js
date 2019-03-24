/**
 * Retrieves all human objects from database,
 * but only shows each human name and age,
 * @param {Object} db Database object.
 * @returns {Array} List of humans.
 */
const getAllHumans = (db) => db;

/**
 * Retrieves one human pets defined by `humanName`.
 * @param {Object} db Database object.
 * @param {String} humanName human name to look for.
 * @returns {Array} List of pets associated with `humanName`.
 */
const getHumanPets = (db, humanName) => {
  const human = db.find((row) => row.name === humanName);

  return human.pets;
};

module.exports = {
  getAllHumans,
  getHumanPets
};
