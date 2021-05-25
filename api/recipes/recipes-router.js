const router = require("express").Router();

const Recipe = require('./recipes-model')
const Ingredients = require("./ingredients-model")
const Categories = require('./categories-model')
//////////RECIPES//////////
router.get('/', (req,res,next) => {
    Recipe.getAll()
    .then(recipe => {
        res.json(recipe)
    })
    .catch(next)
})

router.get('/:recipe_id',(req, res, next) => {
    const { recipe_id } = req.params
  
    Recipe.getByUserId(recipe_id)
      .then(recipe => {
        res.json(recipe)
      })
      .catch(next)
  })

  router.post('/',(req, res, next) => {
      Recipe.add(req.body)
        .then((recipe) => {
          res.status(201).json(recipe);
        })
        .catch((err) => {
          next(err);
        });
    }
  );
//////////INGREDIENTS//////////
router.get('/ingredients', (req,res,next) => {
    Ingredients.getAll()
    .then(ingredients => {
        res.json(ingredients)
    })
    .catch(next)
})
router.get('/ingredients/:ingredient_id',(req, res, next) => {
    const { ingredient_id } = req.params
  
    Ingredients.getByIngredientId(ingredient_id)
      .then(ingredients => {
        res.json(ingredients)
      })
      .catch(next)
  })
//////////CATEGORIES//////////
router.get('/categories', (req,res,next) => {
    Categories.getAll()
    .then(categories => {
        res.json(categories)
    })
    .catch(next)
})

router.get('/categories/:user_id',(req, res, next) => {
    const { user_id } = req.params
  
    Categories.getByUserId(user_id)
      .then(categories => {
        res.json(categories)
      })
      .catch(next)
  })
=======
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
