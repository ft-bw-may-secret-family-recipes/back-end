const router = require("express").Router();
const { restrict } = require("../middleware");
const { validateRecipe } = require("../middleware/validation");
const Recipes = require("./recipes-model");

router.use(restrict);

// const Categories = require("./categories-model");
const { CheckRecipeExists } = require("../middleware/check-recipe-exists");
//////////RECIPES//////////

router.get("/", (req, res, next) => {
  const user_id = req.decodedJwt.sub;

  Recipes.getByUserId(user_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.delete("/:recipe_id", CheckRecipeExists, (req, res, next) => {
  const user_id = req.decodedJwt.sub;
  Recipes.remove(user_id, req.params.recipe_id, req.recipe.recipe_name)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.get("/:recipe_id", CheckRecipeExists, (req, res, next) => {
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
    .catch(next);
});

//////////CATEGORIES//////////
// router.get("/categories", (req, res, next) => {
//   Categories.getAll()
//     .then((categories) => {
//       res.json(categories);
//     })
//     .catch(next);
// });

// router.get("/categories/:user_id", (req, res, next) => {
//   const { user_id } = req.params;

//   Categories.getByUserId(user_id)
//     .then((categories) => {
//       res.json(categories);
//     })
//     .catch(next);
// });

// router.get("/categories/", (req, res, next) => {
//   Categories.getByUserId(req.decodedJwt.sub)
//     .then((categories) => {
//       res.json(categories);
//     })
//     .catch(next);
// });

module.exports = router;
