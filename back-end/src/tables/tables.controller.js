const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");
const { table } = require("../db/connection");

// TODO: Validation Middleware

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "Request body must have data property.",
  });
}

function hasTableName(req, res, next) {
    const table_name = req.body.data.table_name; 
    if (table_name) {
        return next();
    }
    next({
        status:400, 
        message: "Request body must have a table_name"
    });
    return next(); 
}

async function create(req, res, next) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

module.exports = {
  create: [hasData, hasTableName, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};
