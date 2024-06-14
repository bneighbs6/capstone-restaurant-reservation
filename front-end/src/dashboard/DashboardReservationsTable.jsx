import React from "react";

function DashboardTable({ reservations, loadReservations }) {
    const rows = Array.isArray(reservations) && reservations.map((reservation, index) => {
      return (
        <tr key={reservation.reservation_id}>
          <td>{reservation.reservation_id}</td>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.people}</td>
        </tr>
      );
    });
  
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

export default DashboardTable