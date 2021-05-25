const db = require("../data/db-config");

const getAll = () => db("ingredients");

const getBy = async (ingredientProp) => {
  let results = await db("ingredients").where(ingredientProp);
  results.length === 1 ? results[0] : results;
};

const getByIngredientId = (id) => db("ingredients").where("ingredient_id", id);

module.exports = {
  getAll,
  getBy,
  getByIngredientId,
};
