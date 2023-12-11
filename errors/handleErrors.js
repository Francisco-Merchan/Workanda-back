const { CONNECTION_ERROR } = require("../helpers/messages");
const { responseError } = require("../helpers/responseError");

const handleErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.statusCode !== 500 ? err.message : CONNECTION_ERROR;
  responseError(res, err);
};

module.exports = {
  handleErrors,
};
