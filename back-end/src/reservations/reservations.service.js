const knex = require("../db/connection");

// Creates a new reservation
function create(newReservation) {
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function read(reservation_id) {
    return knex("reservations as r") 
    .select("*")
    .where({ reservation_id })
    .first();
}

// Lists reservations by date and orders by time
function listReservationsByDate(reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: reservation_date })
      .orderBy("reservation_time");
  }

module.exports = {
    create,
    read,
    listReservationsByDate,
}