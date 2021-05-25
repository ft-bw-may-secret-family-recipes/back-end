const db = require("../data/db-config");
const { getBy: getCategory } = require("./categories-model");
const { getBy: getIngredient } = require("./ingredients-model");

const getAll = () => db("recipes"); //admin only

const getBy = async (user_id, recipeProp) => {
  const results = await db("recipes").where({
    user_id: user_id,
    ...recipeProp,
  });
  results.length === 1 ? results[0] : results;
};

const getByUserId = (id) => db("recipes").where("user_id", id);

const add = async (
  user_id,
  { recipe_name, recipe_source, category_id, category, recipe_steps }
) => {
  let rawRecipe = { user_id, recipe_name, recipe_source };
  //pull all ingredients out,
  let rawIngredients = recipe_steps.reduce((list, step) => {
    const step_ingredients = step.step_ingredients.map(
      (igdt) => igdt.ingredient
    );
    return [...list, ...step_ingredients];
  }, []);
  //remove duplicates
  rawIngredients = [...new Set(rawIngredients)];

  await db.transaction(async (trx) => {
    const [newRecipe] = await trx("recipes").insert(rawRecipe).returning("*");
    const recipe_id = newRecipe.recipe_id;

    let categoryObj;
    if (category_id) {
      categoryObj = await getCategory(user_id, { category_id: category });
    } else {
      [categoryObj] = await db("categories").insert(category).returning("*"); //! Does this destructure?
    }

    const ingredientObjs = rawIngredients.map(async (igdt) => {
      let igdtObj = await getIngredient({
        ingredient_name: igdt.ingredient_name,
      });
      if (!igdtObj) {
        igdtObj = await trx("ingredients").insert(igdt);
      }
      return igdt;
    });

    const rawSteps = recipe_steps.map((step) => {
      return { step_description: step.step_description, recipe_id: recipe_id };
    });
    const newSteps = await trx("steps").insert(rawSteps).returning("*");

    // good: recipe, category, ingredients, steps
    // next: ingredient steps
  });
};

module.exports = {
  getAll,
  getBy,
  getByUserId,
  add,
};

const shape = {
  recipe_name: "boiled water",
  recipe_source: "me",
  category: "soups",
  recipe_steps: [
    {
      step_description: "heat water in pot",
      step_ingredients: [
        {
          quantity: 8,
          ingredient: {
            ingredient_name: "water",
            ingredient_unit: "oz",
          },
        },
      ],
    },
  ],
};
