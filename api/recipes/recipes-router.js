const router = require("express").Router();
const { restrict } = require("../middleware");
const { validateRecipe } = require("../middleware/validation");
const Recipes = require("./recipes-model");

router.use(restrict);

const { checkRecipeExists } = require("../middleware/check-recipe-exists");
//////////RECIPES//////////

router.get("/", (req, res, next) => {
  const user_id = req.decodedJwt.sub;

  Recipes.getByUserId(user_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.delete("/:recipe_id", checkRecipeExists, (req, res, next) => {
  const user_id = req.decodedJwt.sub;
  Recipes.remove(user_id, req.params.recipe_id, req.recipe.recipe_name)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.get("/:recipe_id", checkRecipeExists, (req, res, next) => {
  Recipes.getFull(req.recipe)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

router.post("/", validateRecipe, (req, res, next) => {
  Recipes.add(req.decodedJwt.sub, req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch((err) =>
      err.message.includes(
        'duplicate key value violates unique constraint "recipes_recipe_name_unique"'
      )
        ? next({ status: 400, message: "recipe name unavailable" })
        : next(err)
    );
});

router.put(
  "/:recipe_id",
  validateRecipe,
  checkRecipeExists,
  (req, res, next) => {
    Recipes.edit(req.decodedJwt.sub, req.recipe, req.body)
      .then((updatedRecipe) => {
        res.status(201).json(updatedRecipe);
      })
      .catch(next);
  }
);

module.exports = router;
