const db = require("../data/db-config");

const getByRecipeId = (recipe_id) => db("steps").where("recipe_id", recipe_id);

const getByStepId = (step_id) => db("steps").where("step_id", step_id).first();

module.exports = {
  getByRecipeId,
  getByStepId,
};
