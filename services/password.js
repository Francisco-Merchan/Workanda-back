const bcrypt = require("bcryptjs");
const { ClientError } = require("../errors/appError");
const { WRONG_USER } = require("../helpers/messages");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const validatePassword = (password, dbUserPassword) => {
  if (!bcrypt.compareSync(password, dbUserPassword))
    throw new ClientError(WRONG_USER, 400);
};

module.exports = {
  encryptPassword,
  validatePassword,
};
