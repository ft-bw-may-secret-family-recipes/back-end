exports.seed = function(knex) {
    return knex('category').insert([
        {category: "pasta", recipe_id:1},
        {category: "chicken", recipe_id:2},
        {category: "fish", recipe_id:3},
    ]);
  };