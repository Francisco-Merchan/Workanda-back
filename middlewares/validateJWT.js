const jwt = require("jsonwebtoken");
const { ClientError } = require("../errors/appError");
const { INVALID_TOKEN, NO_TOKEN } = require("../helpers/messages");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) next(new ClientError(NO_TOKEN, 401));

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET_WORD);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    next(new ClientError(INVALID_TOKEN, 401));
  }
  next();
};

module.exports = {
  validateJWT,
};
