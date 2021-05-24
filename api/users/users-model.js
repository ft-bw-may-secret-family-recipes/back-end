const db = require("../data/db-config");

const getAll = () => db("users"); //admin only

const getById = (id) => db("users").where("user_id", id).first(); //matching user token required

const getBy = (userProp) => db("users").where(userProp);

const update = async (id, updatedUser) => {
  const newUser = db("users")
    .where("user_id", id)
    .update(updatedUser)
    .returning("*");
  return newUser[0];
};
//matching user token required

const add = async (user) => {
  const newUser = await db("users").insert(user).returning("*");
  return newUser[0];
}; //via registration

module.exports = {
  getAll,
  getById,
  add,
  getBy,
  update,
};
