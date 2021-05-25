const db = require("../data/db-config");

const getAll = () => db("users"); //admin only

const getById = (id) => db("users").where("user_id", id).first(); //matching user token required

const getBy = (userProp) => db("users").where(userProp);

// function getBy(){
//   return db('users').select('user_username')
// }

const update = async (id, updatedUser) => {
  const [newUser] = await db("users").where("user_id", id).update(updatedUser).returning("*");
  return newUser;
};


//matching user token required

const add = async (user) => {
  const [newUser] = await db("users").insert(user).returning("*");
  return newUser;
}; //via registration

module.exports = {
  getAll,
  getById,
  add,
  getBy,
  update,
};
