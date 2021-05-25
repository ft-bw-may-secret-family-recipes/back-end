const db = require("../data/db-config");

const getAll = () => db("categories");

const getBy = async (user_id, categoryProp) =>
  db("categories").where({
    user_id: user_id,
    ...categoryProp,
  });

const getByUserId = (id) => db("categories").where("user_id", id);

module.exports = {
  getAll,
  getBy,
  getByUserId,
};
