import { describe } from "mocha";
import { expect } from "chai";
import DataAccess from "../src/api/v1/humans/data-access";
import Business from "../src/api/v1/humans/business";
import DB from "../src/db";

/*
 * This scenario retrieves all humans objects directly
 * from data access layer
 */
describe("DataAccess.getAllHumans()", () => {
  const indexZero = 0;
  const res = DataAccess.getAllHumans(DB);

  expect(res).to.be.an("array");
  expect(res[indexZero]).to.be.an("object");
  expect(res[indexZero]).to.have.keys([
    "pets",
    "cars",
    "name",
    "age"
  ]);
});

/*
 * This scenario retrieves all humans objects directly
 * from data access layer
 */
describe("DataAccess.getHumanPets(Jack)", () => {
  const indexZero = 0;
  const res1 = DataAccess.getHumanPets(DB, "Jack");

  expect(res1).to.be.an("array");
  expect(res1[indexZero]).to.be.an("object");
  expect(res1[indexZero]).to.have.keys([
    "name",
    "type"
  ]);

  const expectArrayLength = 2;
  const res2 = DataAccess.getHumanPets(DB, "Jane");

  expect(res2).to.be.an("array");
  expect(res2).to.have.lengthOf(expectArrayLength);
  expect(res2[indexZero]).to.have.keys([
    "name",
    "type"
  ]);
});

/*
 * This scenario retrieves all humans objects
 * from business layer
 */
describe("Business.getAllHumans()", () => {
  const indexZero = 0;
  const res = Business.getAllHumans(DB);

  expect(res).to.be.an("array");
  expect(res[indexZero]).to.be.an("object");
  expect(res[indexZero]).to.have.keys([
    "name",
    "age"
  ]);
});

/*
 * This scenario retrieves all humans objects from business layer.
 * before getting result the database is altered and all ages are
 * set to 30
 */
describe("Business.getHumanPets() Jane with ages = 30", () => {
  const indexZero = 0;
  const expectArrayLength = 2;
  const DBCopy = DB.map((row) => ({
    ...row,
    "age": 30
  }));
  const res = Business.getHumanPets(DBCopy, "Jane");

  expect(res).to.be.an("array");
  expect(res).to.have.lengthOf(expectArrayLength);
  expect(res[indexZero]).to.be.an("object");
  expect(res[indexZero]).to.have.keys([
    "name",
    "type"
  ]);

});

/*
 * This scenario retrieves all humans objects from business layer.
 * before getting result the database is altered and all ages are
 * set to 31, for jane we expect to get an empty array
 */
describe("Business.getHumanPets() Jane with ages = 31", () => {
  const expectArrayLength = 0;
  const DBCopy = DB.map((row) => ({
    ...row,
    "age": 31
  }));
  const res = Business.getHumanPets(DBCopy, "Jane");

  expect(res).to.be.an("array");
  expect(res).to.have.lengthOf(expectArrayLength);
});
