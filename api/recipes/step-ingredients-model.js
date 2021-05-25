const db = require("../data/db-config");

const getBy = async (stepIngredientProp) => {
  let results = await db("step_ingredients").where(stepIngredientProp);
  results.length === 1 ? results[0] : results;
};

const getByStepId = (step_id) =>
  db("step_ingredients").where("step_id", step_id);

module.exports = {
  getByStepId,
  getBy,
};
