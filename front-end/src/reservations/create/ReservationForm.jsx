import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import { formatAsDate } from "../../utils/date-time";
import ErrorAlert from "../../layout/ErrorAlert";

function ReservationForm({ reservation, setReservation }) {
    const history = useHistory();

    // TODO: REMOVE IF CREATERESERVATION WORKS
    // const initialFormState = {
    //   first_name: "",
    //   last_name: "",
    //   mobile_number: "",
    //   reservation_date: "",
    //   reservation_time: "",
    //   people: ""
    // }

    // Setting our error to null 
    // const [error, setError] = useState(null);

    // TODO: REMOVE IF CREATERESERVATION WORKS
    // Setting reservation in a state of empty fields
    // const [reservation, setReservation] = useState({...initialFormState}); 

    // Go back to previous page if cancel is clicked
    function cancelHandler() {
      console.log("Cancel clicked. Handler worked.")
      history.goBack();
    }

    // Handles changes to the form
    function changeHandler({ target }) {
      let value = target.value; 
      if (target.name === "people") {
        value = Number(value);
      }
      setReservation({
        ...reservation,
        [target.name]: value,
      });
    };

    // Submits and saves form 
    // function submitHandler(e) {
    //     e.preventDefault(); 
    //     const abortController = new AbortController();
    //     setError(null);
    //     createReservation(reservation, abortController.signal)
    //     .then(() => 
    //       history.push(`/dashboard?date=${formatAsDate(reservation.reservation_date)}`)
    //     )
    //     .catch(setError);
    //     return () => abortController.abort(); 
    // }

    // console.log(reservation);

    return (
      <>
        <h2>Welcome to Periodic Tables</h2>
          <h3>Please Enter Reservation Information</h3>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              name="first_name"
              type="text"
              className="form-control"
              require="true"
              id="first_name"
              onChange={changeHandler}
              value={reservation.first_name}
              placeholder="Enter First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              name="last_name"
              type="text"
              className="form-control"
              require="true"
              id="last_name"
              onChange={changeHandler}
              value={reservation.last_name}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Phone Number</label>
            <input
              name="mobile_number"
              type="tel"
              className="form-control"
              require="true"
              id="mobile_number"
              onChange={changeHandler}
              value={reservation.mobile_number}
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              name="reservation_date"
              type="date"
              className="form-control"
              require="true"
              id="reservation_date"
              onChange={changeHandler}
              value={reservation.reservation_date}
              placeholder="Pick a Reservation Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              name="reservation_time"
              type="time"
              className="form-control"
              require="true"
              id="reservation_time"
              onChange={changeHandler}
              value={reservation.reservation_time}
              placeholder="Pick a Time"
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Number in Party</label>
            <input
              name="people"
              type="text"
              className="form-control"
              require="true"
              id="people"
              onChange={changeHandler}
              value={reservation.people}
              placeholder="Amount of People"
            />
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <button className="btn btn-danger" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
      </>
    );
}

export default ReservationForm;