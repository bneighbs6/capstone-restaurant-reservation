/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Create read() in reservations.service and use in reservations.controller
// You are working on the test GET /reservations/:reservation_Id => should return 200 for an existing id

router.route("/:reservation_id/status").put(controller.updateReservationStatus).all(methodNotAllowed);

router.route("/:reservation_id").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
