const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// This route is completed for backend tests
router.route("/:table_id/seat").put(controller.update).delete(controller.delete).all(methodNotAllowed);

// This route is completed for backend tests
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router; 