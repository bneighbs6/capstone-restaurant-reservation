/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:reservation_id/status").put(controller.updateReservationStatus).all(methodNotAllowed);

// TODO: User Story 8 - need to add a put method with updateReservation in controller
router.route("/:reservation_id").get(controller.read).put(controller.updateReservation).all(methodNotAllowed);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
