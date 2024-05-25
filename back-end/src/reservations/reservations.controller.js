const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");

// TODO: Validation middleware for create handler

function hasData(req, res, next) {
  if (req.body.data) {
    return next(); 
  }
  next({ 
    status: 400, 
    message: "Request body must have data property."
  });
  return next(); 
}

function hasFirstName(req, res, next) {
  const { data: { first_name } = {} } = req.body; 
  if (first_name) {
    return next(); 
  }
  next({
    status: 400,
    message: "Reservation must include a first name."
  });
  return next(); 
}

function hasLastName(req, res, next) {
  const { data: { last_name } = {} } = req.body; 
  if (last_name) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must include a last name."
  });
  return next(); 
}

function hasMobileNumber(req, res, nexxt) {
  const { data: { mobile_number } = {} } = req.body; 
  if (mobile_number) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must include a mobile number."
  });
  return next();
}

function hasReservationDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  if (reservation_date) {
    return next(); 
  }
  next({
    status: 400, 
    message: "Reservation must include a reservation date."
  });
  return next(); 
}

function hasReservationTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body; 
  if (reservation_time) {
    return next(); 
  }
  next({
    status: 400, 
    message: "Reservation must include a reservation time."
  });
  return next(); 
}

function hasPeople(req, res, next) {
  const { data: { people } = {} } = req.body; 
  if (people) {
    return next(); 
  }
  next({
    status: 400,
    message: "Reservation must include atleast one person."
  });
  return next(); 
}

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
  create: [
    hasData, 
    hasFirstName, 
    hasLastName, 
    hasMobileNumber,
    hasReservationDate,
    hasReservationTime,
    hasPeople, 
    asyncErrorBoundary(create)],
  list,
};
