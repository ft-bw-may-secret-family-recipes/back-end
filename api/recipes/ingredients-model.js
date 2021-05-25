const db = require("../data/db-config");

const getAll = () => db("ingredients");

const getBy = (ingredientProp) => db("ingredients").where(ingredientProp);

const getByIngredientId = (id) => db("ingredients").where("ingredient_id", id);

module.exports = {
  getAll,
  getBy,
  getByIngredientId,
};
