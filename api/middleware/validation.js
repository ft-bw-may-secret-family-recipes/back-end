const { recipe: recipeSchema } = require("../../utils/validation-schemas");

exports.validateRecipe = async (req, res, next) => {
  if (!req.body) {
    return next({ status: 400, message: "cannot add empty recipe" });
  }
  try {
    const validRecipe = await recipeSchema.validate(req.body, {
      // stripUnknown: true,
    });
    req.body = validRecipe;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
