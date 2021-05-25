const db = require("../data/db-config");

const getAll = () => db("categories");

const getBy = async (user_id, categoryProp) => {
  let results = await db("categories").where({
    user_id: user_id,
    ...categoryProp,
  });
  results.length === 1 ? results[0] : results;
};

const getByUserId = (id) => db("categories").where("user_id", id);

module.exports = {
  getAll,
  getBy,
  getByUserId,
};
