const db = require("../data/db-config");

const getAllUsers = () => db("users"); //admin only

const getUserById = (id) => db("users").where("user_id", id).first(); //matching user token required

const getUserBy = (userProp) => db("users").where(userProp);

const updateUser = async (id, updateUser) => {
  const updatedUser = db("users")
    .where("user_id", id)
    .update(updateUser)
    .returning("*");
  return updatedUser[0];
};
//matching user token required

const addUser = async (user) => {
  const newUser = await db("users").insert(user).returning("*");
  return newUser[0];
}; //via registration

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  getUserBy,
  updateUser,
};
