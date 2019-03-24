import DA from "./data-access";

/*
 * This value refers to Jane's Max age after which we are not allowed to
 * provide users with Jane's pet data
 */
const JANE_MAX_AGE = 30;

/**
 * Retrieves all human objects from database,
 * but only shows each human name and age,
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
 * @param {Object} db Database object.
 * @param {String} name human name to look for.
 * @returns {Array} List of pets associated with `name`.
 */
const getHumanPets = (db, name) => {
  const human = db.find((row) => row.name === name);

  if (name === "Jane" && human.age > JANE_MAX_AGE) {
    return [];
  }

  return DA.getHumanPets(db, name);
};

module.exports = {
  getAllHumans,
  getHumanPets
};
