const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: This route will need a put method and a delete method
// Need to work on SeatReservationForm for frontend
// Working on test: Seat reservation PUT /tables/:table_id/seat
// router.route("/:table_id/seat").put(controller.update).all(methodNotAllowed);

// This route is completed for backend tests
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router; 