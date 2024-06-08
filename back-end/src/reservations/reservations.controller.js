const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");

// TODO: Validation middleware for create handler

// Verifies that reservation has data inputted
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

// Verifies reservation has a first name
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

// Verifies reservation has a last name 
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

// Verifies reservation has proper mobile number
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

// Verifies reservation has a proper date
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
// TODO: Create validation functions for reservationNotOnATuesday and reservationNotInThePast

// Verifies that reservation is not on a tuesday
function reservationDateNotInPast(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body; 

  if (reservation_date) {
    const currentDateAndTime = Date.now();
    const reservationDateAndTime = new Date(
      `${reservation_date} ${reservation_time}`
    );
    console.log(reservationDateAndTime);

    if (reservationDateAndTime < currentDateAndTime) {
      next({
        status: 400, 
        message: "Reservations must be made on a future date."
      });
    }
  }
  return next();
}

function reservationDateNotATuesday(req, res, next) {
  // const { reservationDate, errors } = res.locals;
  const { data: { reservation_date } = {} } = req.body; 

  if (reservation_date) {
    const weekDay = new Date(reservation_date).getUTCDay();

    if (weekDay === 2) {
      next({
        status: 400, 
        message: "We are closed on Tuesdays."
      })
      return next();
    }
  }
  return next();
}

// Verifies reservation has proper time 
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

// Verifies reservation has people included
// TODO: The typeof people === number conditional statement is failing. Figure out why
function hasPeople(req, res, next) {
  const people = req.body.data.people;
  const regex = new RegExp(/[^1-6]/);

  // console.log("first-> ", people)
  // console.log("second-> ", !regex.test(people))
  // console.log("third->", typeof people === "number") 
  // console.log(typeof people);

  // if people is truthy, people is a number b/w 1-6, and typeof = number
  if (people && !regex.test(people) && typeof people === "number") {
    return next();
  } else {
    next({
      status: 400,
      message: "Reservation must include the number of people. Can be from 1-6.",
     });
  }
}

/**
 * Create handler for reservations
 */
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
    reservationDateNotATuesday,
    reservationDateNotInPast,
    hasReservationTime,
    hasPeople, 
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
};
