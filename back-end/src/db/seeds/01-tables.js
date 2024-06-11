/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex 
  .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
  .then(function() {
    return knex("tables").insert([
      { table_name: "Bar #1", capacity: 1 },
      { table_name: "Bar #2", capacity: 1},
      { table_name: "Table #1", capacity: 6 },
      { table_name: "Table #2", capacity: 6 },
    ]);
  });
};
