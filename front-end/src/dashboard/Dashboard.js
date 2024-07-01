import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationsTable from "./DashboardReservationsTable";
import DashboardTablesTable from "./DashboardTablesTable";
import useQuery from "../utils/useQuery";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ today_date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const query = useQuery(); 
  const queryDate = query.get("date");
  const date = queryDate || today_date;

  // Load or reload dashboard any time date is updated.
  useEffect(loadDashboard, [date]);

function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for Date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DashboardReservationsTable reservations={reservations} loadDashboard={loadDashboard} />
      <DashboardTablesTable loadDashboard={loadDashboard} />
    </main>
  );
}

export default Dashboard;
