exports.seed = function(knex) {
    return knex('steps').insert([
      {step_description: 'Heat pan', recipe_id: 1},
      {step_description: 'Add Broccoli', recipe_id: 1},
      {step_description: 'Add pesto mixed with pasta',recipe_id: 1},
      {step_description: 'Heat oven',recipe_id: 2},
      {step_description: 'Put chicken and lemon in oven', recipe_id: 2},
      {step_description: 'put in oven at 500 degrees', recipe_id: 2},
      {step_description: 'Fish a salmon in the Bidasoa river', recipe_id: 3},
      {step_description: 'Cook Salmon', recipe_id: 3},
    ]);
  };