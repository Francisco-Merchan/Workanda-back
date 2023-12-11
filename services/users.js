const { dbConnection } = require("../database/db");
const { ClientError } = require("../errors/appError");
const { USER_NOT_FOUND, UNREGISTERED_USER } = require("../helpers/messages");

const getAllUsersService = async () => {
  const [users] = await dbConnection.query(
    "SELECT id, name, email, phone, deleted FROM users"
  );

  return users;
};

const getUserByIdService = async (id) => {
  const [user] = await dbConnection.query(
    `SELECT id, name, email, phone FROM users WHERE id = ?`,
    [id]
  );
  return user[0];
};

const getUserByEmailService = async (email) => {
  const [user] = await dbConnection.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return user.length === 0 ? null : user[0];
};

const createNewUserService = async (values, password) => {
  const { name, email, phone } = values;
  const [result] = await dbConnection.query(
    `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`,
    [name, email, password, phone]
  );
  if (result.affectedRows === 0) throw new ClientError(UNREGISTERED_USER, 400);
};

const updateUserService = async (data, id) => {
  const { name, email, phone } = data;
  const [result] = await dbConnection.query(
    "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id]
  );
  if (result.affectedRows === 0) throw ClientError(USER_NOT_FOUND, 404);
};

const deleteUserService = async (id) => {
  const [result] = await dbConnection.query("DELETE FROM users WHERE id = ?", [
    id,
  ]);
  if (result.affectedRows === 0) throw new ClientError(USER_NOT_FOUND, 404);
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  getUserByEmailService,
  createNewUserService,
  updateUserService,
  deleteUserService,
};
