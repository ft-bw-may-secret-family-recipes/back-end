const db = require("../data/db-config");

const getByRecipeId = (recipe_id) => db("steps").where("recipe_id", recipe_id);

const getBy = async (stepProp) => {
  const steps = db("steps").where(stepProp);
  steps.length === 1 ? steps[0] : steps;
};

module.exports = {
  getByRecipeId,
  getBy,
};
