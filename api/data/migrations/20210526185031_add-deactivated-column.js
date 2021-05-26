exports.up = async (knex) => {
  await knex.schema.table("recipes", (table) => {
    table.boolean("deactivated").defaultTo(false);
  });
};

exports.down = async (knex) => {
  await knex.schema.table("recipes", (table) => {
    table.dropColumn("deactivated");
  });
};
