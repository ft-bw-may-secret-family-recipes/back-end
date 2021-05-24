const db = require("../data/db-config");

const getAllUsers = () => db("users");

const getUserById = () => db("users");

const addUser = async (user) => {
  const newUser = await db("users").insert(user).returning("*");
  return newUser[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
