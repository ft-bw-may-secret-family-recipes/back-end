exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("user_username", 200).notNullable().unique();
      table.string("user_password", 200).notNullable();
      table.string("user_email", 320).notNullable();
      table.timestamps(false, true);
    })
    
    .createTable('categories', table => {
      table.increments('category_id')
      table.string('category').notNullable()
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
  
    .createTable("recipes", (table) => {
      table.increments("recipe_id");
      table.string("recipe_name", 128).notNullable().unique();//what if more than one user uses the same name?
      table.string('recipe_source',128).notNullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("category_id")
        .inTable("categories")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })

    .createTable('steps', (table) => {
      table.increments('step_id');
      table.string('step_description').notNullable();
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable('ingredients', (table) => {
      table.increments('ingredient_id');
      table.string('ingredient_name', 128).notNullable().unique();
      table.string('ingredient_unit', 128).notNullable()
    })

    .createTable('step_ingredients', table => {
      table.increments('step_ingredient_id')
      table.float('quantity').notNullable()
      table.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })


}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('step_ingredients')
  await knex.schema.dropTableIfExists('ingredients')
  await knex.schema.dropTableIfExists('steps')
  await knex.schema.dropTableIfExists('recipes')
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('users')
}
