import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm() {
    const history = useHistory();

    function cancelHandler() {
      history.goBack(); 
    }

    function submitHandler() {
        history.push("/dashboard");
        console.log("Reservation created successfully.")
    }

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
              placeholder="Enter Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Phone Number</label>
            <input
              name="mobile_phone"
              type="tel"
              className="form-control"
              require="true"
              id="mobileNumber"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationDate">Reservation Date</label>
            <input
              name="reservation_date"
              type="date"
              className="form-control"
              require="true"
              id="reservationDate"
              placeholder="Pick a Reservation Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationTime">Reservation Time</label>
            <input
              name="reservation_time"
              type="time"
              className="form-control"
              require="true"
              id="reservationTime"
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