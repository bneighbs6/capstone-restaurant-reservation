const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// TODO: Validation middleware for create handler

// TODO: Create the create handler
async function create(req, res) {
  const newReservation = {
    ...req.body.data,
  }
  const createdReservation = await service.create(newReservation);
  res.status(201).json({ data: createdReservation })
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

module.exports = {
  create: asyncErrorBoundary(create),
  list,
};
