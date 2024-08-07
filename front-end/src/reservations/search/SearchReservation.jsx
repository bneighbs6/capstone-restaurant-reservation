import React, { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { listReservations } from "../../utils/api";
import DashboardReservationsTable from "../../dashboard/DashboardReservationsTable";

function SearchReservation() {
  // useState variables
  const [phoneNumber, setPhoneNumber] = useState({
    mobile_number: "",
  });
  const [foundReservation, setFoundReservation] = useState(null);
  const [error, setError] = useState(null);

  // function loadReservations() {
  //   const abortController = new AbortController();
  //   setError(null);
  //   listReservations(phoneNumber, abortController.signal)
  //     .then(setFoundReservation)
  //     .catch(setError);
  //   return () => abortController.abort();
  // }

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    listReservations(phoneNumber, abortController.signal)
      .then(setFoundReservation)
      .catch(setError);
    return () => abortController.abort();
  }

  function changeHandler({ target: { name, value } }) {
    setPhoneNumber(() => ({
      [name]: value,
    }));
  }

  return (
    <main>
      <ErrorAlert error={error} />
      <h4 className="m-3">Search Reservation by Phone Number</h4>
      <form onSubmit={submitHandler} className="">
        <div className="row m-3">
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={changeHandler}
            value={phoneNumber.mobile_number}
          />
          <button className="btn btn-primary my-3" type="submit">
            Find
          </button>
        </div>
      </form>
      {foundReservation ? (
        <div className="row">
          <h4>Matched Reservations:</h4>
          <DashboardReservationsTable
            reservations={foundReservation}
            setFoundReservation={setFoundReservation}
          />
        </div>
      ) : null}
    </main>
  );
}

export default SearchReservation;
