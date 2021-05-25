const db = require("../data/db-config");

const getBy = (stepIngredientProp) =>
  db("step_ingredients").where(stepIngredientProp);

const getByStepId = (step_id) =>
  db("step_ingredients").where("step_id", step_id);

module.exports = {
  getByStepId,
  getBy,
};
