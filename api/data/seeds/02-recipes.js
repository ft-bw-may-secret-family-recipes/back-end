exports.seed = function(knex) {
    return knex('recipes').insert([
      {recipe_name: 'Broccoli Pesto Pasta',recipe_source:"myself",user_id:1},
      {recipe_name: 'Lemon Chicken',recipe_source:"grandma",user_id:2},
      {recipe_name: 'Salmon en Papillote',recipe_source:"parents",user_id:3},
    ])    
  };
