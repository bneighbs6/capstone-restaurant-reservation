const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function listReservationByDate(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date: reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");

}

module.exports = {
    create,
    listReservationByDate,
}