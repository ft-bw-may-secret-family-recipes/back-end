const router = require("express").Router();
const { checkAdmin, checkUserIdExists } = require("../middleware");
const Recipes = require("./recipes-model");

router.use(checkAdmin);

router.get("/", (req, res, next) => {
  Recipes.getAll()
    .then((recipes) => res.status(200).json(recipes))
    .catch(next);
});

router.get("/:user_id", checkUserIdExists, (req, res, next) => {
  Recipes.getByUserId(req.params.user_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/:user_id/:recipe_id", checkUserIdExists, (req, res, next) => {
  const { user_id, recipe_id } = req.params;
  Recipes.getBy(user_id, { recipe_id: recipe_id });
});

router.post("/:user_id/", checkUserIdExists, (req, res, next) => {
  Recipes.add(req.params.user_id, req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

module.exports = router;
