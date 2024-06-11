const knex = require("../db/connection");

// Creates a new table
function create(newTable) {
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function list() {
    return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
    create,
    list,
}