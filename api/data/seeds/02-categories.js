exports.seed = function (knex) {
  return knex("categories").insert([
    { category: "pasta", user_id: 1 },
    { category: "chicken", user_id: 2 },
    { category: "fish", user_id: 3 },
  ]);
};
