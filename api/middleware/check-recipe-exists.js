const { getBy: getRecipe } = require("../recipes/recipes-model");

exports.CheckRecipeExists = (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  getRecipe(req.headers.user_id, { recipe_id: recipe_id })
    .then(([recipe]) => {
      if (recipe?.active) {
        delete recipe.active;
        req.recipe = recipe;
        next();
      } else {
        next({
          status: 404,
          message: `recipe with recipe_id ${recipe_id} not found`,
        });
      }
    })
    .catch(next);
};
