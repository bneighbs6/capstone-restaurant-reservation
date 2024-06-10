const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");

// TODO: Seed database

function hasData(req, res, next) {
    if (req.body.data) {
      return next();
    }
    next({ 
        status: 400, 
        message: "Request body must have data property." 
    });
  }

async function create(req, res, next) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

module.exports = {
  create: [hasData, asyncErrorBoundary(create)],
};
