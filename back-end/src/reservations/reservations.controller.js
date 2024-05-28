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
    message: "Reservation must include a first_name."
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
    message: "Reservation must include a last_name."
  });
  return next(); 
}

function hasMobileNumber(req, res, next) {
  const { data: { mobile_number } = {} } = req.body; 
  if (mobile_number) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must include a mobile_number."
  });
  return next();
}

// TODO: Need to validate that reservation date is a date
function hasReservationDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const regex = new RegExp(/\d{4}-\d{2}-\d{2}/);

  if (reservation_date && regex.test(reservation_date)) {
    return next(); 
  }
  next({
    status: 400, 
    message: "Reservation must include a reservation_date."
  });
  return next(); 
}

function hasReservationTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body; 
  const regex = new RegExp(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/);
  if (reservation_time && regex.test(reservation_time)) {
    return next(); 
  }
  next({
    status: 400, 
    message: "Reservation must include a reservation_time."
  });
  return next(); 
}

function hasPeople(req, res, next) {
  const people = req.body.data.people;
  const regex = new RegExp(/[^1-6]/);
  // if people is truthy, people is a number b/w 1-6, and typeof = number
  if (people && !regex.test(people) && typeof people === "number") {
    return next();
  }
   next({
    status: 400,
    message: "Reservation must include the number of people. Can be from 1-6.",
   });
  return next();
}

async function create(req, res) {
  const newReservation = { ...req.body.data }
  const createdReservation = await service.create(newReservation);
  res.status(201).json({ data: createdReservation })
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  if (date) {
    const data = await service.listReservationsByDate(date);
    res.json({ data });
  }
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
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
};
