const db = require("../data/db-config");
const { getBy: getCategory } = require("./categories-model");
const { getByRecipeId: getSteps } = require("./steps-model");
const { getByStepId: getStepIngredients } = require("./step-ingredients-model");
const {
  getByIngredientId: getIngredient,
} = require("../ingredients/ingredients-model");

const getAll = () => db("recipes"); //admin only

const getBy = (user_id, recipeProp) =>
  db("recipes").where({
    user_id: user_id,
    ...recipeProp,
  });

const getByUserId = (id) => db("recipes").where("user_id", id);

//\\\\\\\\\\\\\\\\\\\ add() \\\\\\\\\\\\\\\\\\\\\
const add = async (
  user_id,
  { recipe_name, recipe_source, category, recipe_steps }
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

  //\\\\\\\\\\\\\\\\\\\ Start Transaction \\\\\\\\\\\\\\\\\\\\\

  const newRecipe = await db.transaction(async (trx) => {
    let [categoryObj] = await getCategory(user_id, { category: category });
    if (!categoryObj) {
      [categoryObj] = await db("categories")
        .insert({ category: category, user_id })
        .returning("*");
    }

    rawRecipe = { ...rawRecipe, category_id: categoryObj.category_id };

    let [newRecipe] = await trx("recipes").insert(rawRecipe).returning("*");
    const recipe_id = newRecipe.recipe_id;

    const ingredientObjs = await Promise.all(
      rawIngredients.map(async (igdt) => {
        let igdtObj = await trx("ingredients")
          .where({
            ingredient_name: igdt.ingredient_name,
          })
          .first();
        if (!igdtObj) {
          [igdtObj] = await trx("ingredients")
            .insert({
              ingredient_name: igdt.ingredient_name,
              ingredient_unit: igdt.ingredient_unit,
            })
            .returning("*");
        }
        return igdtObj;
      })
    );

    const rawSteps = recipe_steps.map((step) => {
      return {
        step_description: step.step_description,
        step_number: step.step_number,
        recipe_id: recipe_id,
      };
    });
    const newSteps = await trx("steps").insert(rawSteps).returning("*");

    const rawStepIngredients = recipe_steps.reduce((list, step, idx) => {
      if (step.step_ingredients.length === 0) {
        return list;
      }

      const step_id = newSteps[idx].step_id;

      const ingredients = step.step_ingredients.map((stepIgdt) => {
        const ingredientObj = ingredientObjs.find(
          (objIgdt) =>
            objIgdt.ingredient_name === stepIgdt.ingredient.ingredient_name
        );
        const step_ingredient = {
          ingredient_id: ingredientObj.ingredient_id,
          step_id: step_id,
          quantity: stepIgdt.quantity,
        };
        return step_ingredient;
      });

      return [...list, ...ingredients];
    }, []);

    const stepIngredients = await trx("step_ingredients")
      .insert(rawStepIngredients)
      .returning("*");

    return {
      categoryObj,
      newRecipe,
      newSteps,
      ingredientObjs,
      stepIngredients,
    };
  });

  //\\\\\\\\\\\\\\\\\\\ End Transaction \\\\\\\\\\\\\\\\\\\\\
  const {
    categoryObj,
    newRecipe: recipe,
    newSteps: steps,
    ingredientObjs: ingredients,
    stepIngredients,
  } = newRecipe;

  delete categoryObj.user_id;

  const shapedRecipe = { ...recipe, category: categoryObj };
  delete shapedRecipe.category_id;

  const shapedStepIngredients = stepIngredients.map((stepIgdt) => {
    const ingredient = ingredients.find(
      (igdt) => igdt.ingredient_id === stepIgdt.ingredient_id
    );

    return { ...stepIgdt, ingredient: ingredient };
  });

  const shapedSteps = steps.map((step) => {
    const step_ingredients = shapedStepIngredients.reduce(
      (list, stepIgdt, idx, shapedStepIgdts) => {
        if (stepIgdt.step_id === step.step_id) {
          const [newIgdt] = shapedStepIgdts.splice(idx, 1);
          delete newIgdt.step_id;
          delete newIgdt.ingredient_id;

          list.push(newIgdt);
        }
        return list;
      },
      []
    );
    delete step.recipe_id;

    return { ...step, step_ingredients };
  });

  let fullRecipe = { ...shapedRecipe, steps: [...shapedSteps] };

  return fullRecipe;
};

//\\\\\\\\\\\\\\\\\\\ getFull() \\\\\\\\\\\\\\\\\\\\\

const getFull = async (rawRecipe) => {
  const { category_id: category_id, ...recipe } = rawRecipe;

  const [category] = await getCategory(rawRecipe.user_id, {
    category_id: category_id,
  });
  delete category.user_id;

  const steps = await getSteps(rawRecipe.recipe_id);

  await Promise.all(
    steps.map(async (step) => {
      delete step.recipe_id;

      step.step_ingredients = await getStepIngredients(step.step_id);

      const stepIngredients = step.step_ingredients;

      if (stepIngredients.length === 0) {
        return step;
      }
      await Promise.all(
        stepIngredients.map(async (stepIgdt) => {
          delete stepIgdt.step_id;

          const ingredient = await getIngredient(stepIgdt.ingredient_id);
          stepIgdt.ingredient = ingredient;

          delete stepIgdt.ingredient_id;
          return stepIgdt;
        })
      );

      return step;
    })
  );

  return { recipe, category, steps };
};

//\\\\\\\\\\\\\\\\\\\ remove() \\\\\\\\\\\\\\\\\\\\\

const remove = async (user_id, recipe_id) => {
  await db("recipes")
    .where({
      user_id: user_id,
      recipe_id: recipe_id,
    })
    .update({ deactivated: true });

  return `Recipe ${recipe_id} deleted`;
};

module.exports = {
  getAll,
  getBy,
  getFull,
  getByUserId,
  add,
  remove,
};
