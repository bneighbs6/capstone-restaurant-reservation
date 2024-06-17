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
}

// Verifies table_name is atleast 2 characters long
function tableNameIsAtleastTwoCharacters(req, res, next) {
    const { data: { table_name } = {} } = req.body;
    if (table_name.length >= 2) {
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

async function tableExists(req, res, next) {
  const table = await service.readTable(req.params.table_id);
  if (table) {
    res.locals.table = table; 
    return next(); 
  }
  next({
    status: 404, 
    message: `Table with id ${req.params.table_id} does not exist.`
  })
}

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
    res.locals.reservation = reservation; 
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID: ${reservation_id} does not exist.`
  });
}

function tableHasCapacity(req, res, next) {
  const { table, reservation } = res.locals; 
  if (table && reservation && table.capacity >= reservation.people) {
      return next();
  }
  next({
    status: 400, 
    message: "Table does not have sufficient capacity for this reservation."
  });
}

// Checks if table is occupied or not
// If table reservation_id is true
  // if request method is delete go to next middleware
  // // if req.method is PUT send an error
// If table reservation_id is NOT truthy
  // if req.method is DELETE send an error
  // if req.method is PUT go to next middleware 
function tableIsNotOccupied(req, res, next) {
  const { table } = res.locals; 
  if (table && table.reservation_id) {
    if (req.method === "DELETE") {
      return next();
    }

    if (req.method === "PUT") {
      next({
        status: 400,
        message: `Table ${table.reservation_id} is occupied.`
      });
    }
  }

  if (req.method === "DELETE") {
    next({
      status: 400,
      message: "Table is not occupied."
    });
  }

  if (req.method === "PUT") {
    return next(); 
  }

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

async function destroy(req, res, next) {
  const { table } = res.locals; 
  await service.delete(table.table_id);
  res.sendStatus(200);
}

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

module.exports = {
  create: [hasData, hasTableName, tableNameIsAtleastTwoCharacters, hasCapacity, asyncErrorBoundary(create)],
  update: [hasData, asyncErrorBoundary(tableExists), hasReservationId, asyncErrorBoundary(reservationIdExists), tableHasCapacity, tableIsNotOccupied, asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(tableExists), tableIsNotOccupied, asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};
