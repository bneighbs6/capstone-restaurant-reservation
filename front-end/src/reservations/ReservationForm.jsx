import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationForm() {
    const history = useHistory();

    const initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: ""
    }

    // Setting reservation in a state of empty fields
    const [reservation, setReservation] = useState({...initialFormState});

    // Go back to previous page if cancel is clicked
    function cancelHandler() {
      history.goBack();
    }

    // Handles changes to the form
    function changeHandler({ target }) {
      // TODO: This change handler will handle the changes of any item in the form 
      const value = target.value; 
      setReservation({
        ...reservation,
        [target.name]: value,
      });
    };

    // Submits and saves form 
    function submitHandler(event) {
        event.preventDefault(); 
        // TODO: Add submit functionality
        // Needs to save reservation info to backend
        // Then push history to dashboard page for date of new reservation
        // Send back any errors
        setReservation({...initialFormState}); // Reset reservation
    }

    console.log("Current value of reservation is:", reservation);

    return (
      <>
        <h1>Welcome to Periodic Tables</h1>
        <form onSubmit={submitHandler}>
          <h3>Please Enter Reservation Information</h3>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              name="first_name"
              type="text"
              className="form-control"
              require="true"
              id="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              name="last_name"
              type="text"
              className="form-control"
              require="true"
              id="lastName"
              onChange={changeHandler}
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
              placeholder="Pick a Time"
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Number in Party</label>
            <input
              name="people"
              type="number"
              className="form-control"
              require="true"
              id="people"
              onChange={changeHandler}
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
        </form>
      </>
    );
}

export default ReservationForm;