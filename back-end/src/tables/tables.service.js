const knex = require("../db/connection");

// Creates a new table
function create(newTable) {
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function readTable(table_id) {
    return knex("tables")
    .returning("*")
    .where({ table_id })
    .first();
}

module.exports = {
    create,
}