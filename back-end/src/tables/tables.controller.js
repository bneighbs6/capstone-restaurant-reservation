const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");
const { table } = require("../db/connection");

// TODO: Validation Middleware

// Verifies request body has data
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "Request body must have data property.",
  });
}

// Verifies request body has a table name
function hasTableName(req, res, next) {
    const { data: { table_name } = {} } = req.body;
    if (table_name) {
        return next();
    }
    next({
        status:400, 
        message: "Request body must have a table_name"
    });
    return next(); 
}

// Verifies table_name is atleast 2 characters long
function tableNameIsAtleastTwoCharacters(req, res, next) {
    const { data: { table_name } = {} } = req.body;
    if (table_name.length > 2) {
        return next();
    }
    next({
        status: 400,
        message: "table_name must be atleast 2 characters."
    })
}

// Verifies request body has a capacity 
function hasCapacity(req, res, next) {
    const { data: { capacity } = {} } = req.body; 
    if (capacity && typeof capacity === "number") {
        return next();
    }
    next({
        status: 400, 
        message: "Request body requires a capacity"
    })
}

async function create(req, res, next) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

module.exports = {
  create: [hasData, hasTableName, tableNameIsAtleastTwoCharacters, hasCapacity, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};
