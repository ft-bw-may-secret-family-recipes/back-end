exports.seed = function(knex) {
    return knex('ingredients').insert([
      {ingredient_name: 'Broccoli', ingredients_unit:'lbs'},
      {ingredient_name: 'Pesto', ingredients_unit:'lbs'},
      {ingredient_name: 'Pasta', ingredients_unit:'lbs'},
      {ingredient_name: 'Lemon', ingredients_unit:'slices'},
      {ingredient_name: 'Chicken', ingredients_unit:'kilos'},
      {ingredient_name: 'Salmon', ingredients_unit:'grams'},
    ]);
  };