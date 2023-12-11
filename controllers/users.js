const { ClientError } = require("../errors/appError");
const { catchedAsync } = require("../helpers/catchedAsync");
const {
  DELETE_USER,
  EMAIL_EXIST,
  UPDATED_USER,
} = require("../helpers/messages");
const { response } = require("../helpers/response");
const {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getUserByEmailService,
} = require("../services/users");

const getUsers = catchedAsync(async (req, res) => {
  const users = await getAllUsersService();
  response(res, 200, { users });
});

const updateUser = catchedAsync(async (req, res) => {
  const userId = req.params.id;
  const userByEmail = await getUserByEmailService(req.body.email);
  if (userByEmail && userByEmail?.id != userId)
    throw new ClientError(EMAIL_EXIST, 409);
  await updateUserService(req.body, userId);
  const user = await getUserByIdService(userId);
  response(res, 200, { user, message: UPDATED_USER });
});

const deleteUser = catchedAsync(async (req, res) => {
  const userId = req.params.id;
  await deleteUserService(userId);
  response(res, 200, { message: DELETE_USER });
});

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
