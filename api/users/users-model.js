const db = require("../data/db-config");

const getAllUsers = () => db("users");

const getUserById = (id) => db("users").where("user_id", id).first();

const getUserBy = (userProp) => db("users").where(userProp);

const updateUser = async (id, updateUser) =>
  db("users").where("user_id", id).update(updateUser).returning("*");

const addUser = async (user) => {
  const newUser = await db("users").insert(user).returning("*");
  return newUser[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  getUserBy,
  updateUser,
};
