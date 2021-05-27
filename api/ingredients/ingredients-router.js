const router = require("express").Router();
const { restrict } = require("../middleware/index");
const Ingredients = require("./ingredients-model");

router.use(restrict);

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
