exports.up = async (knex) => {
  await knex.schema.table("recipes", (table) => {
    table.boolean("active").defaultTo(true);
  });
};

exports.down = async (knex) => {
  await knex.schema.table("recipes", (table) => {
    table.dropColumn("active");
  });
};
