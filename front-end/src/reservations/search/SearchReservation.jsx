import React, { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { listReservations } from "../../utils/api";
import DashboardReservationsTable from "../../dashboard/DashboardReservationsTable";

function SearchReservation() {

  // These will need to be changed using useState
  const [phoneNumber, setPhoneNumber] = useState({
    mobile_number: "",
  });
  const [foundReservation, setFoundReservation] = useState(null);
  const [error, setError] = useState(null);

    function findButtonHandler() {
        console.log("Find button clicked.")
        // Enter necessary code
        // Clicking on the "Find" button will submit a request to the server 
        // (e.g. GET /reservations?mobile_number=800-555-1212).
    }

    function changeHandler({ target: { name, value } }) {
      setPhoneN
    }


  return (
    <>
      <h4>Search Reservation by Phone Number</h4>
      <form>
      <div className="form-group">
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
          />
          <button className="btn btn-primary" onClick={findButtonHandler}>Find</button>
      </div>
      </form>
    </>
  );
}

export default SearchReservation;
