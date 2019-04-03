/**
 * Errors root module
 * @module errors
 */

/**
 * This function sends an email alert message
 * @param {Object} err Error object.
 * @returns {null} nothing.
 */
// eslint-disable-next-line require-await
const sendEmailAlert = async (err) => {
  // eslint-disable-next-line no-console
  console.log("sending email alert...");
  // eslint-disable-next-line no-undef
  _ = err;
};

/**
 * This function sends a slack alert message
 * @param {Object} err Error object.
 * @returns {null} nothing.
 */
// eslint-disable-next-line require-await
const sendSlackAlert = async (err) => {
  // eslint-disable-next-line no-console
  console.log("sending slack alert...");
  // eslint-disable-next-line no-undef
  _ = err;
};


/**
 * This function is called whenever there is a error
 * @param {Object} err Error object.
 * @returns {null} nothing.
 */
// eslint-disable-next-line require-await
export const centralErrorHandler = async (err) => {
  sendEmailAlert(err);
  sendSlackAlert(err);
};

/**
 * Generates error object
 * @param {Number} code error code.
 * @param {String} msg error message.
 * @returns {null}.
 */

export const genHTTPStatusError = (code, msg) => {
  const err = new Error(msg);

  err.code = code;
  throw err;

};
