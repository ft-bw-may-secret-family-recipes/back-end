exports.seed = function(knex) {
    return knex('recipes').insert([
      {recipe_name: 'Broccoli Pesto Pasta', user_id:1},
      {recipe_name: 'Lemon Chicken', user_id:2},
      {recipe_name: 'Salmon en Papillote', user_id:3},
    ])    
  };
