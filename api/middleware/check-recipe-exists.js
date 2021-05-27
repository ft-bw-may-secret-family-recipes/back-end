const { getBy: getRecipe } = require("../recipes/recipes-model");

exports.checkRecipeExists = (req, res, next) => {
  const recipe_id = parseInt(req.params.recipe_id);
  isNaN(recipe_id)
    ? next({
        status: 404,
        message: `recipe with recipe_id ${recipe_id} not found`,
      })
    : getRecipe(req.decodedJwt.sub, { recipe_id: recipe_id })
        .then(([recipe]) => {
          if (recipe) {
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
