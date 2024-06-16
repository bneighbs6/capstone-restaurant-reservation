import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function DashboardTablesTable({ loadDashboard }) {
  const [tables, setTables] = useState([]);
  const [tableErrors, setTableErrors] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTableErrors(null);
    listTables(abortController.signal).then(setTables).catch(setTableErrors);
    return () => abortController.abort();
  }

  const tablesListItem = tables.map((table) => {
    let tableStatus = "Free";
    if (table.reservation_id) {
      tableStatus = "Occupied";
    }

    let occupant = null;
    if (tableStatus === "Occupied") {
      occupant = ` by Reservation ID: ${table.reservation_id}`;
    }

    return (
      <li className="list-group-item col" key={table.table_id}>
        <div>{table.table_name}</div>
        <p data-table-id-status={`${table.table_id}`} className="font-weight-bold">
          {tableStatus}
        </p>
        <p>
          {occupant}
        </p>
      </li>
    );
  });

  return (
    <>
      <ErrorAlert error={tableErrors} />
      <div>
        <h4>Tables</h4>
        <ul>{tablesListItem}</ul>
      </div>
    </>
  )

}

export default DashboardTablesTable;
