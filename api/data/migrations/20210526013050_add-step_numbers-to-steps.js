exports.up = async (knex) => {
  await knex.schema.table("steps", (table) =>
    table.integer("step_number").unsigned().notNullable()
  );
};

exports.down = async (knex) => {
  await knex.schema.table("steps", (table) => table.dropColumn("step_number"));
};
