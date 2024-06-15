const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");
const { table } = require("../db/connection");

// TODO: Validation Middleware for create

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
/** 
 * VALIDATION MIDDLEWARE FOR PUT /tables/:table_id/seat
 */ 

function hasReservationId(req, res, next) {
  const { data: { reservation_id } = {} } = req.body; 
  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "Request body requires a reservation_id"
  })
}

async function reservationIdExists(req, res, next) {
  const { data: { reservation_id } = {} } = req.body; 
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID: ${reservation_id} does not exist.`
  });
}

async function create(req, res, next) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function update(req, res, next) {
  const { table_id } = res.locals.table
  const { reservation_id } = req.body.data; 

  const data = await service.updateTableAssignment(table_id, reservation_id);
  res.json({ data });
}

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

module.exports = {
  create: [hasData, hasTableName, tableNameIsAtleastTwoCharacters, hasCapacity, asyncErrorBoundary(create)],
  update: [hasData, hasReservationId, reservationIdExists, asyncErrorBoundary(update)],
  list: asyncErrorBoundary(list),
};
