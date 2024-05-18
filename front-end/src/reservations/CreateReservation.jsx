import React from "react";
import { useHistory } from "react-router-dom";

function CreateReservation() {
    const history = useHistory();

    function cancelHandler() {
      history.goBack();
    }

    return (
        <form>
            <div className="form-group">
                <label for="firstName">First Name</label>
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
                <label for="lastName">Last Name</label>
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
                <label for="mobileNumber">Mobile Phone Number</label>
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
                <label for="reservationDate">Reservation Date</label>
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
                <label for="reservationTime">Reservation Time</label>
                <input 
                name="reservation_time" 
                type="text" 
                className="form-control" 
                require="true"
                id="reservationTime" 
                placeholder="Pick a Time"
                />
            </div>
            <div className="form-group">
                <label for="people">Number in Party</label>
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
                <button className="btn btn-success">Submit</button> 
                <button className="btn btn-danger" onClick={cancelHandler}>Cancel</button>
            </div>
        </form>
    )
}

export default CreateReservation;