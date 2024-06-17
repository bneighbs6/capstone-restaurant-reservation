const knex = require("../db/connection");

// Creates a new table
function create(newTable) {
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

// Reads table by table id
function readTable(table_id) {
    return knex("tables").select("*").where({ table_id }).first(); 
}

// Reads reservation by reservation id
function readReservation(reservation_id) {
    return knex("reservations").select("*").where({ reservation_id }).first(); 
} 

// Updates table assignment
async function updateTableAssignment(table_id, reservation_id) {
    const trx = await knex.transaction();
    return trx("reservations")
    .where({ reservation_id })
    .update({ status: "seated" }, "*")
    .then(() => 
        trx("tables")
            .where({ table_id })
            .update({ reservation_id }, "*")
            .then((results) => updatedTable = results[0])
    )
    .then(trx.commit)
    .then(() => updatedTable)
    .catch(trx.rollback);
}

// Deletes table by table_id
function destroy(table_id) {
    return knex("tables").where({ table_id }).del();
}

// Lists tables by table name
function list() {
    return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
    create,
    readTable,
    readReservation, 
    updateTableAssignment,
    delete: destroy,
    list,
}