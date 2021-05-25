const router = require("express").Router();
const { checkAdmin } = require("../middleware/check-admin");
const Recipes = require("./recipes-model");

router.use(checkAdmin);

router.get("/", (req, res, next) => {
  Recipes.getAll();
});

router.get("/:user_id", (req, res, next) => {
  Recipes.getByUserId(req.params.user_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/:user_id/recipe_id", (req, res, next) => {
  const { user_id, recipe_id } = req.params;
  Recipes.getBy(user_id, { recipe_id: recipe_id });
});

module.exports = router;
