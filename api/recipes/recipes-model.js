const db = require("../data/db-config");
const { getBy: getCategory } = require("./categories-model");

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
  const rawRecipe = { user_id, recipe_name, recipe_source };

  await db.transaction(async (trx) => {
    const [newRecipe] = await trx("recipes").insert(rawRecipe).returning("*");
    const recipe_id = newRecipe.recipe_id;

    let categoryObj;
    if (category_id) {
      categoryObj = await getCategory(user_id, { category_id: category });
    } else {
      [categoryObj] = await db("categories").insert(category).returning("*"); //! Does this destructure?
    }
  });
};

module.exports = {
  getAll,
  getBy,
  getByUserId,
  add,
};

const shape = {
  recipe_name: "",
  recipe_source: "",
  category_id: 1,
  //or
  category: "",
  recipe_steps: [
    {
      step_description: "",
      step_ingredients: [
        {
          quantity: 1,
        },
      ],
    },
  ],
};
