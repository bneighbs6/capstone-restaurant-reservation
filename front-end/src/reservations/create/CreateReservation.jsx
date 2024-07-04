import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";
import { createReservation } from "../../utils/api";
import { formatAsDate } from "../../utils/date-time";


function CreateReservation() {
    const history = useHistory(); 

    const initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: ""
    }

    // Setting our error to null 
    const [error, setError] = useState(null);

    // Setting reservation in a state of empty fields
    const [reservation, setReservation] = useState({...initialFormState}); 

        // Submits and saves form 
        function submitHandler(e) {
            e.preventDefault(); 
            const abortController = new AbortController();
            setError(null);
            createReservation(reservation, abortController.signal)
            .then(() => 
              history.push(`/dashboard?date=${formatAsDate(reservation.reservation_date)}`)
            )
            .catch(setError);
            return () => abortController.abort(); 
        }

        return (
            <main>
                <h1>Create Reservation</h1>
                <ErrorAlert error={error} />
                <form onSubmit={submitHandler}>
                    <ReservationForm 
                    reservation={reservation}
                    setReservation={setReservation}
                    />
                </form>
            </main>
        )
}

export default CreateReservation; 