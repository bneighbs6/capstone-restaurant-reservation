import React from "react";

function SearchReservation({ reservation }) {

    function findButtonHandler() {
        console.log("Find button clicked.")
        // Enter necessary code
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
