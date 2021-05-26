const router = require("express").Router();
const { checkAdmin, checkUserIdExists } = require("../middleware");
const { validateRecipe } = require("../middleware/validation");
const Recipes = require("./recipes-model");

router.use(checkAdmin);

const Categories = require("./categories-model");
const { CheckRecipeExists } = require("../middleware/check-recipe-exists");
//////////RECIPES//////////

router.get("/", checkUserIdExists, (req, res, next) => {
  const user_id = req.headers.user_id;
  user_id
    ? Recipes.getByUserId(req.headers.user_id)
        .then((recipes) => {
          res.status(200).json(recipes);
        })
        .catch(next)
    : Recipes.getAll()
        .then((recipes) => res.status(200).json(recipes))
        .catch(next);
});

router.delete(
  "/:recipe_id",
  checkUserIdExists,
  CheckRecipeExists,
  (req, res, next) => {
    const user_id = req.headers.user_id;
    Recipes.remove(user_id, req.params.recipe_id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
  }
);

router.get(
  "/:recipe_id",
  checkUserIdExists,
  CheckRecipeExists,
  (req, res, next) => {
    Recipes.getFull(req.recipe)
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch(next);
  }
);

router.post("/", checkUserIdExists, validateRecipe, (req, res, next) => {
  Recipes.add(req.headers.user_id, req.body)
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

router.get("/categories/", (req, res, next) => {
  Categories.getByUserId(req.headers.user_id)
    .then((categories) => {
      res.json(categories);
    })
    .catch(next);
});

module.exports = router;
