const db = require("../data/db-config");

const getAll = () => db("recipes"); //admin only

const getByRecipeId = (user_id, recipe_id) =>
  db("recipes").where({ user_id: user_id, recipe_id: recipe_id }).first();

const getByUserId = (id) => db("recipes").where("user_id", id);

const add = async (user_id, recipe) => {
  const newRecipe = await db("recipes").insert(recipe).returning("*");
  return newRecipe[0];
};

module.exports = {
  getAll,
};
