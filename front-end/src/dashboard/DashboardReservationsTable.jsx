import React from "react";
import { useLocation } from "react-router-dom";
import { formatAsTime } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";


function DashboardReservationsTable({ reservations, loadReservations }) {
  const location = useLocation(); 

    const rows = Array.isArray(reservations) && reservations.map((reservation, index) => {
      if (location.pathname="/dashboard" && (reservation.status === "finished" || reservation.status === "cancelled")) {
        return null;
      }
      return (
        <tr key={reservation.reservation_id}>
          <td>{reservation.reservation_id}</td>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.people}</td>
          <SeatReservationButton 
          reservation_id={reservation.reservation_id}
          status={reservation.status}
          />
        </tr>
      );
    });

    function SeatReservationButton({ reservation_id }) {
        return (
          <a
          className="btn btn-primary"
          href={`/reservations/${reservation_id}/seat`}
          role="button"
          >
            Seat
          </a>
        );
    }
  
    return (
      <table className="col-md-6 col-lg-6">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Number of People</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

export default DashboardReservationsTable;