const router = require("express").Router();
const checkAdmin = require("../middleware/check-admin");
const Ingredients = require("./ingredients-model");

router.use(checkAdmin);

router.get("/", (req, res, next) => {
  Ingredients.getAll()
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch(next);
});

router.get("/:ingredient_id", (req, res, next) => {
  const { ingredient_id } = req.params;

  Ingredients.getByIngredientId(ingredient_id)
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch(next);
});

module.exports = router;
