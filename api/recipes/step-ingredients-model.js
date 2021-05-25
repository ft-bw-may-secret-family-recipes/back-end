const db = require("../data/db-config");

const getBy = async (stepIngredientProp) => {
  let stepIngredients = await db("step_ingredients").where(stepIngredientProp);
  stepIngredients.length === 1 ? stepIngredients[0] : stepIngredients;
};

const getByStepId = (step_id) =>
  db("step_ingredients").where("step_id", step_id);

module.exports = {
  getByStepId,
  getBy,
};
