# sample-express-rest-api
this is a sample express (node.js) based rest api project.

## Project Structure
all source files reside in `src` folder
all tests files reside in `tests` folder

## Prerequisite 
you need to install these tools globally in order to be able to run some tasks and scripts:
`npm install -g yarn`
`npm install -g mocha`
`npm install -g eslint`
`npm install -g nodemon` (optional, for debugging)

## Dependencies
`express`: server code 
`winston`: logging
`dotenv`: node environment variable handling
`babel`: converting ES6 code to standard JS
`chai`: test assertion
`mocha`: test framework
`istanbul`: code coverage

## How to install
clone this repository:
`git clone https://github.com/sepisoad/sample-express-rest-api.git`
cd into repository:
`cd sample-express-rest-api.git`
run yarn command:
`yarn`

## Usage:
in order to run server in production mode run:
`yarn start`
in order to run server in debug mode run:
`yarn debug`
in order to apply linter and check the result run:
`yarn lint`
in order to run test cases run:
`yarn test`
and last but no least, to test code coverage run:
`yarn coverage`


## Code quality and security 

`ESLint` is used to catch common programming mistake and also potential security issues in the code through `ESLint Plugins`. `express-rate-limit` is also used to limit requests which can help prevent DOS/DDOS attacks to some extent.

If you would like to tweak `ESLint` you can modify `.eslintrc.json` file content.
Also if you want to ignore some files or directories from Lint process you can add their names to `.eslintignore` file
