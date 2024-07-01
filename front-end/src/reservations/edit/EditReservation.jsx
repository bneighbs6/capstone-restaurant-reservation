import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation, setReservationStatus } from "../../utils/api";
import ReservationForm from "../create/ReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";

function EditReservation({ loadDashboard }) {
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      });
    
      const [error, setError] = useState(null);
      const history = useHistory();
      const { reservation_id } = useParams();
    
      useEffect(() => {
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch(setError);
        return () => abortController.abort();
      }, [reservation_id]);
    
      function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        setError(null);
        updateReservation(reservation, abortController.signal)
          .then(() =>
            history.push(`/dashboard?date=${reservation.reservation_date}`)
          )
          .catch(setError);
        return () => abortController.abort();
      }

      return (
        <main>
          <h1>Edit Reservation {reservation_id}</h1>
          <ErrorAlert error={error} />
          <form onSubmit={submitHandler}>
            <ReservationForm
              reservation={reservation}
              setReservation={setReservation}
            />
            <CancelReservationButton
            reservation={reservation}
             />
          </form>
        </main>
      );
    }
    
    export default EditReservation;