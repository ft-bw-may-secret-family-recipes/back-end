const router = require("express").Router();
const { checkAdmin, checkUserIdExists } = require("../middleware");
const Recipes = require("./recipes-model");

router.use(checkAdmin);

const Ingredients = require("./ingredients-model");
const Categories = require("./categories-model");
//////////RECIPES//////////

router.get("/", (req, res, next) => {
  // todo: move to admin router
  Recipes.getAll()
    .then((recipes) => res.status(200).json(recipes))
    .catch(next);
});

router.get("/:user_id", checkUserIdExists, (req, res, next) => {
  // todo: users pulled from decoded token
  Recipes.getByUserId(req.params.user_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/:user_id/:recipe_id", checkUserIdExists, (req, res, next) => {
  // todo: users pulled from decoded token
  const { user_id, recipe_id } = req.params;
  Recipes.getFull(user_id, recipe_id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

router.post("/:user_id/", checkUserIdExists, (req, res, next) => {
  // todo: users pulled from decoded token
  Recipes.add(req.params.user_id, req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

//////////INGREDIENTS//////////
router.get("/ingredients", (req, res, next) => {
  // todo: refractor into ingredients router
  Ingredients.getAll()
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch(next);
});
router.get("/ingredients/:ingredient_id", (req, res, next) => {
  // todo: refractor into ingredients router
  const { ingredient_id } = req.params;

  Ingredients.getByIngredientId(ingredient_id)
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch(next);
});
//////////CATEGORIES//////////
router.get("/categories", (req, res, next) => {
  // todo: refractor into admin router
  Categories.getAll()
    .then((categories) => {
      res.json(categories);
    })
    .catch(next);
});

router.get("/categories/:user_id", (req, res, next) => {
  // todo: refractor into categories router
  const { user_id } = req.params;

  Categories.getByUserId(user_id)
    .then((categories) => {
      res.json(categories);
    })
    .catch(next);
});

module.exports = router;
