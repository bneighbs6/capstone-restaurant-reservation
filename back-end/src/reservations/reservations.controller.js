const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");
const { update } = require("../db/connection");

/** 
 * Validation middleware for create handler
*/

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

// Verifies reservation date is not a Tuesday
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
  const regex = new RegExp(/[0-9]{2}:[0-9]{2}/);

  if (reservation_time && regex.test(reservation_time)) {
    return next();
  }
  next({
    status: 400, 
    message: "Reservation must include a reservation_time."
  });
  return next(); 
}

// Verifies reservation time is acceptable
function hasReservationTimeInAcceptableTimes(req, res, next) {
  const { data: { reservation_time } = {} } = req.body; 

  const reservationTime = reservation_time.replace(":", "");

  if (reservation_time) {
    if (Number(reservationTime) < 1030 || Number(reservationTime) > 2130) {
      next({
        status: 400,
        message: "Reservation cannot be before 10:30 a.m. or after 9:30 p.m."
      });
      return next();
    }
  }
  return next();
}

// Verifies reservation has people included
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
 * VALIDATION MIDDLEWARE FOR READ
 */

// Checks if reservationId exists
async function reservationIdExists(req, res, next) {
  // const { data: { reservation_id } = {} } = req.body; 
  const { reservation_id } = req.params; 
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation; 
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID: ${reservation_id} does not exist.`
  });
}


/**
 * Validation Middleware for UpdateReservationStatus
 */


function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatuses = ["booked", "seated", "finished", "cancelled"];

  // If request method is post and status exists and is not "booked" return 400
  if (req.method === "POST" && status && status !== "booked") {
    next({
      status: 400,
      message: `New reservation cannot have status of ${status}.`,
    });
  }

  // If request method is PUT and status exists but is not included in validStatuses, return 400
  if (req.method === "PUT" && status && !validStatuses.includes(status)) {
    next({
      status: 400,
      message: `A reservation cannot be updated if it has a status of ${status}.`,
    });
  }

  return next();
}

function statusIsNotFinished(req, res, next) {
  const { reservation } = res.locals;
  if (reservation && reservation.status !== "booked") {
    next({
      status: 400,
      message: `A ${reservation.status} reservation cannot be updated or cancelled.`,
    });
  }

  return next();
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
 * Read handler for reservations
 */

function read(req, res) {
  res.json({ data: res.locals.reservation })
}

/**
 * Update reservation status handler
 */

async function updateReservationStatus(req, res, next) {
  const { reservation } = res.locals;
  const newStatus = req.body.data.status;  
  const newReservation = {
    ...reservation,
    status: newStatus,
  };
  const data = await service.update(newReservation);
  res.json({ data });
}

async function updateReservation(req, res, next) {
  const updatedReservation = req.body.data;
  const data = await service.update(updatedReservation);
  res.json({ data });
}

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  console.log("inside list function");
  const { date, mobile_number } = req.query;
  if (date) {
    const data = await service.listReservationsByDate(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.search(mobile_number);
    res.json({ data })
  }
}

module.exports = {
  create: [
    hasData, 
    hasValidStatus,
    hasFirstName, 
    hasLastName, 
    hasMobileNumber,
    hasReservationDate,
    reservationDateNotATuesday,
    reservationDateNotInPast,
    hasReservationTime,
    hasReservationTimeInAcceptableTimes,
    hasPeople, 
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(reservationIdExists), asyncErrorBoundary(read)],
  updateReservation: [
    asyncErrorBoundary(reservationIdExists),
    statusIsNotFinished,
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    reservationDateNotInPast,
    reservationDateNotATuesday,
    hasReservationTime,
    hasReservationTimeInAcceptableTimes,
    hasPeople,
    asyncErrorBoundary(updateReservation),
  ],
  updateReservationStatus: [asyncErrorBoundary(reservationIdExists), hasValidStatus, statusIsNotFinished, asyncErrorBoundary(updateReservationStatus)],
  list: [asyncErrorBoundary(list)],
};
