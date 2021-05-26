const db = require("../data/db-config");

const getAll = () => db("ingredients");

const getBy = (ingredientProp) => db("ingredients").where(ingredientProp);

const getByIngredientId = (id) =>
  db("ingredients").where("ingredient_id", id).first();

const addIngredient = async (ingredient) => {
  const [newIngredient] = await db("ingredients")
    .insert(ingredient)
    .returning("*");
  return newIngredient;
};

module.exports = {
  getAll,
  getBy,
  getByIngredientId,
  addIngredient,
};
