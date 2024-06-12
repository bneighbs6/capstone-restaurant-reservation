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

// Lists tables by table name
function list() {
    return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
    create,
    readTable,
    readReservation, 
    list,
}