const db = require("../data/db-config");

const getByRecipeId = (recipe_id) => db("steps").where("recipe_id", recipe_id);

const getBy = (stepProp) => db("steps").where(stepProp);

module.exports = {
  getByRecipeId,
  getBy,
};
