import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { setReservationStatus } from "../utils/api";
import { formatAsTime } from "../utils/date-time";


function DashboardReservationsTable({ reservations, loadDashboard }) {
  const location = useLocation(); 

  const [error, setError] = useState(null);

    const rows =
      Array.isArray(reservations) &&
      reservations.map((reservation, index) => {

        if (
          location.pathname === "/dashboard" &&
          (reservation.status === "finished" ||
            reservation.status === "cancelled")
        ) {
          return null;
        }

        return (
          <>
                <tr key={reservation.reservation_id}>
                  <th scope="row">{formatAsTime(reservation.reservation_time)}</th>
                  <td>{reservation.reservation_id}</td>
                  <td>{reservation.first_name}</td>
                  <td>{reservation.last_name}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>{reservation.people}</td>
                  <td data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}
                  </td>
                </tr>
            <div>
            <EditReservationButton
                    reservation_id={reservation.reservation_id}
                  />
            </div>
            <div>
            <CancelReservationButton reservation={reservation} />
            </div>
            <div>
              <SeatReservationButton
                reservation_id={reservation.reservation_id}
                status={reservation.status}
              />
            </div>
          </>
        );

        function SeatReservationButton({ reservation_id, status }) {
          if (status === "booked") {
            return (
              <a
                className="btn btn-primary"
                href={`/reservations/${reservation_id}/seat`}
                role="button"
              >
                Seat Reservation
              </a>
            );
          } else {
            return null;
          }
        }

        // onClick () => take you to /reservations/${reservation_id}/edit page
        function EditReservationButton({ reservation_id }) {
          return (
            <a
              className="btn btn-warning"
              href={`/reservations/${reservation_id}/edit`}
              role="button"
            >
              Edit Reservation
            </a>
          );
        }

        function CancelReservationButton({ reservation }) {
          return (
            <button
              type="button"
              className="btn btn-danger"
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={() =>
                handleCancelReservationButtonClick(reservation.reservation_id)
              }
            >
              Cancel Reservation
            </button>
          );
        }

        function handleCancelReservationButtonClick(reservation_id) {
          if (
            window.confirm(
              "Do you want to cancel this reservation? This cannot be undone."
            )
          ) {
            const abortController = new AbortController();
            setError(null);
            setReservationStatus(
              reservation_id,
              "cancelled",
              abortController.signal
            )
              .then(() => loadDashboard())
              .catch(setError);
            return () => abortController.abort();
          }
        }
      });

    if (reservations && !reservations.length) {
      return (
        <div className="alert alert-warning py-3" role="alert">
          No reservations found.
        </div>
      );
    }
  
    return (
      <>
        <ErrorAlert error={error} />
        <div class="table-responsive">
          <table className="table table-secondary table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Reservation Time</th>
                <th>Reservation ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Number of People</th>
                <th>Reservation Time</th>
                <th>Reservation Status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </>
    );
  }

export default DashboardReservationsTable;