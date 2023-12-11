const { ClientError } = require("../errors/appError");
const { catchedAsync } = require("../helpers/catchedAsync");
const {
  REGISTERED_USER,
  EXISTING_USER,
  WRONG_USER,
} = require("../helpers/messages");
const { createJWT } = require("../helpers/jwt");
const { response } = require("../helpers/response");
const { validatePassword, encryptPassword } = require("../services/password");
const {
  getUserByEmailService,
  createNewUserService,
} = require("../services/users");

const createUser = catchedAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailService(email);
  if (user) throw new ClientError(EXISTING_USER, 409);
  const encryptedPassword = encryptPassword(password);
  await createNewUserService(req.body, encryptedPassword);
  response(res, 200, { message: REGISTERED_USER });
});

const loginUser = catchedAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailService(email);
  if (!user) throw new ClientError(WRONG_USER, 404);
  validatePassword(password, user.password);
  const token = await createJWT(user.id, user.name);
  response(res, 200, { uid: user.id, name: user.name, token });
});

const renewToken = async (req, res) => {
  const uid = req.uid;
  const name = req.name;
  const token = await createJWT(req.uid, req.name);
  response(res, 200, { uid, name, token });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
