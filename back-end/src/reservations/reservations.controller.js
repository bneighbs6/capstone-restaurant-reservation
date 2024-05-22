const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/");

// TODO: Validation middleware for create handler

// TODO: Create the create handler

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

module.exports = {
  list,
};
