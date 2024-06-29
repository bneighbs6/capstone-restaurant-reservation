const knex = require("../db/connection");

// Creates a new reservation
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

// Reads reservation by reservation_id
function read(reservation_id) {
  return knex("reservations as r")
    .select("*")
    .where({ reservation_id })
    .first();
}

// Updates a reservation
function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

// Lists reservations by date and orders by time
function listReservationsByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  read,
  update,
  listReservationsByDate,
  search,
};
