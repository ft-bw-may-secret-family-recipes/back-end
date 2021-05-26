const router = require("express").Router();
const { checkAdmin, checkUserIdExists } = require("../middleware");
const Recipes = require("./recipes-model");

router.use(checkAdmin);

const Ingredients = require("./ingredients-model");
const Categories = require("./categories-model");
//////////RECIPES//////////

// router.get("/", (req, res, next) => {
//   Recipes.getAll()
//     .then((recipes) => res.status(200).json(recipes))
//     .catch(next);
// });

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

// router.get("/:user_id", checkUserIdExists, (req, res, next) => {
//   Recipes.getByUserId(req.params.user_id)
//     .then((recipes) => {
//       res.status(200).json(recipes);
//     })
//     .catch(next);
// });

// router.get("/:user_id/:recipe_id", checkUserIdExists, (req, res, next) => {
//   const { user_id, recipe_id } = req.params;
//   Recipes.getFull(user_id, recipe_id)
//     .then((recipe) => {
//       res.status(200).json(recipe);
//     })
//     .catch(next);
// });

router.get("/:recipe_id", checkUserIdExists, (req, res, next) => {
  Recipes.getFull(req.headers.user_id, req.params.recipe_id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

// router.post("/:user_id/", checkUserIdExists, (req, res, next) => {
//   Recipes.add(req.params.user_id, req.body)
//     .then((recipe) => {
//       res.status(201).json(recipe);
//     })
//     .catch(next);
// });

router.post("/", checkUserIdExists, (req, res, next) => {
  Recipes.add(req.headers.user_id, req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

//////////INGREDIENTS//////////
router.get("/ingredients", (req, res, next) => {
  Ingredients.getAll()
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch(next);
});

router.get("/ingredients/:ingredient_id", (req, res, next) => {
  const { ingredient_id } = req.params;

  Ingredients.getByIngredientId(ingredient_id)
    .then((ingredients) => {
      res.json(ingredients);
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
