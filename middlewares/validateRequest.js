const { validationResult } = require("express-validator");
const { ClientError } = require("../errors/appError");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.errors.map((error) => error.msg);
    next(new ClientError(message[0]));
  }
  next();
};

module.exports = {
  validateRequest,
};
